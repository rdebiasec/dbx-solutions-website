#!/usr/bin/env bash
# Background loop: wake agent every 45s to continue Intercom uploads until done.
set -euo pipefail
ROOT="/Users/ricardodebiase/Documents/dbx-solutions-website"
while true; do
  sleep 45
  PENDING=$(node "$ROOT/tools/intercom/next-upload-status.mjs" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const j=JSON.parse(d); console.log(j.pendingCount);});")
  if [ "$PENDING" = "0" ]; then
    echo 'AGENT_LOOP_TICK_INTERCOM_UPLOAD {"prompt":"Intercom upload queue empty. Report final upload-progress.json uploaded count and stop the upload loop.","done":true}'
    break
  fi
  echo "AGENT_LOOP_TICK_INTERCOM_UPLOAD {\"prompt\":\"Continue Intercom public article uploads. Browser viewId glass-browser-20e98077-6681-4fca-9c31-1f93b221354c. Run node tools/intercom/next-upload-status.mjs for next index. For each: browser_navigate new article URL, browser_cdp Runtime.evaluate tools/intercom/.expr-cache/NNN.expr (awaitPromise, returnByValue), verify fill.ok and publish.ok, node tools/intercom/upload-queue-advance.mjs N. Upload batch of 5 then report progress. Browser locked.\"}"
done
