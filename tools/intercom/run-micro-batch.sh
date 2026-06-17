#!/bin/bash
set -euo pipefail
ROOT="/Users/ricardodebiase/Documents/dbx-solutions-website"
LOG="/tmp/micro-upload-41-45.log"
PROGRESS="$ROOT/tools/intercom/upload-progress.json"
URL='https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false'
VIEW='glass-browser-20e98077-6681-4fca-9c31-1f93b221354c'

log() { echo "[$(date -Iseconds)] $*" | tee -a "$LOG"; }

is_uploaded() {
  node -e "const p=require('$PROGRESS'); process.exit(p.uploaded.includes($1)?0:1)"
}

agent_mcp() {
  local tool="$1" args="$2" timeout="${3:-120}"
  cursor agent --print --force --workspace "$ROOT" "Execute ONE CallMcpTool only.
server: cursor-ide-browser
toolName: $tool
arguments: $args
Return only JSON: result.result.value if present, else full result." 2>&1
}

run_index() {
  local n="$1"
  local jsonl="/tmp/micro-upload-$n/steps.jsonl"
  local total steps last raw rec

  if is_uploaded "$n"; then
    log "SKIP index $n (already uploaded)"
    echo "{\"index\":$n,\"ok\":true,\"skipped\":true}"
    return 0
  fi

  total=$(wc -l < "$jsonl" | tr -d ' ')
  log "START index $n steps=$total"

  agent_mcp browser_navigate "{\"url\":\"$URL\",\"viewId\":\"$VIEW\"}" 90 >/dev/null || true

  last='{}'
  for ((s=0; s<total; s++)); do
    steps=$(node "$ROOT/tools/intercom/get-micro-step.mjs" "$n" "$s")
    out=$(agent_mcp browser_cdp "$steps" 120)
    last=$(echo "$out" | node -e "
      const fs=require('fs');
      const t=fs.readFileSync(0,'utf8');
      for (let i=t.lastIndexOf('{'); i>=0; i=t.lastIndexOf('{',i-1)) {
        try { const p=JSON.parse(t.slice(i)); console.log(JSON.stringify(p.result?.value??p.result??p.value??p)); process.exit(0); } catch(e){}
      }
      console.log('{}');
    ")
    if (( s % 25 == 0 )) || (( s == total - 1 )); then
      log "index $n step $((s+1))/$total"
    fi
  done

  raw=$(node -e "console.log(JSON.stringify({result:{value:JSON.parse(process.argv[1])}}))" "$last")
  rec=$(node "$ROOT/tools/intercom/record-upload-result.mjs" "$n" "$raw")
  log "DONE index $n: $rec"
  echo "$rec"
}

: > "$LOG"
for n in 41 42 43 44 45; do
  run_index "$n" || log "FAIL index $n"
done

node -e "const p=require('$PROGRESS'); console.log(JSON.stringify({uploadedCount:p.uploaded.length,uploaded:p.uploaded.filter(i=>i>=41&&i<=45)}))"
