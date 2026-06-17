#!/usr/bin/env node
/** Write agent-action-result.json for queue runner. */
import fs from 'fs';
const result = JSON.parse(process.argv[2] || '{}');
fs.writeFileSync('/tmp/agent-action-result.json', JSON.stringify(result));
const action = fs.existsSync('/tmp/agent-action.json')
  ? JSON.parse(fs.readFileSync('/tmp/agent-action.json', 'utf8'))
  : null;
console.log(JSON.stringify({ written: true, index: action?.index, step: action?.step || action?.label }));
