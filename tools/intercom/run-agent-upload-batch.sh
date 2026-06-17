#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

VIEW_ID="glass-browser-20e98077-6681-4fca-9c31-1f93b221354c"
URL="https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false"
START="${1:-4}"
END="${2:-83}"
LOG="tools/intercom/upload-batch-${START}-${END}.log"

cursor agent --print --force --workspace "$ROOT" "$(cat <<EOF
Upload Intercom public articles indices ${START} through ${END} inclusive.

Browser viewId: ${VIEW_ID}
New article URL: ${URL}
Browser is already locked on viewId.

For EACH index N from ${START} to ${END}:
1. Skip if N already in tools/intercom/upload-progress.json uploaded array
2. browser_navigate to new article URL (viewId ${VIEW_ID})
3. browser_cdp Runtime.evaluate with expression from tools/intercom/.expr-cache/NNN.expr (zero-padded N, awaitPromise true, returnByValue true)
4. Verify result.fill.ok and result.publish.ok; on success run: node tools/intercom/upload-queue-advance.mjs N
5. On failure log index+error and continue

When done return JSON: {publishedThisRun, failures, finalUploadedCount}
EOF
)" 2>&1 | tee "$LOG"
