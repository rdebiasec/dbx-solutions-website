#!/usr/bin/env bash
# Agent helper: emit upload steps as JSONL for indices START..END
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
START="${1:-2}"
END="${2:-83}"
node "$ROOT/mcp-upload-loop.mjs" "$START" "$END"
