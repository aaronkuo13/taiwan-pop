#!/bin/bash
# Post-merge PRD reminder hook
# Triggers after any Bash tool use and checks if it was a gh pr merge command

INPUT=$(cat)
CMD=$(echo "$INPUT" | python3 -c "
import json, sys
try:
    d = json.load(sys.stdin)
    print(d.get('tool_input', {}).get('command', ''))
except:
    print('')
" 2>/dev/null)

if echo "$CMD" | grep -qE "gh pr merge"; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ PR merged — 規則 3 觸發"
  echo "⚠️  請立即更新 PROJECT_SPEC.md，確保 PRD 為最新狀態"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi
