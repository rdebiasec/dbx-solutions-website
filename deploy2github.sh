#!/usr/bin/env bash
set -euo pipefail

########################################
# CONFIG
########################################
GITHUB_USER="rdebiasec"
REPO_NAME="dbx-solutions-website"
PRIVATE=false              # true or false
DEFAULT_BRANCH="main"      # main or master, etc.

########################################
# UTIL FUNCTIONS
########################################

log() {
  echo "[INFO  $(date '+%H:%M:%S')] $*"
}

warn() {
  echo "[WARN  $(date '+%H:%M:%S')] $*" >&2
}

err() {
  echo "[ERROR $(date '+%H:%M:%S')] $*" >&2
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    err "Required command '$1' is not installed or not in PATH."
    exit 1
  fi
}

get_pat() {
  # Prefer env var GITHUB_PAT, fall back to secure prompt
  if [[ -n "${GITHUB_PAT:-}" ]]; then
    PAT="$GITHUB_PAT"
    log "Using PAT from GITHUB_PAT environment variable."
  else
    read -r -s -p "Enter your GitHub PAT (will not be echoed): " PAT
    echo
  fi

  if [[ -z "$PAT" ]]; then
    err "GitHub PAT cannot be empty."
    exit 1
  fi
}

########################################
# PRECHECKS
########################################

require_cmd git
require_cmd curl

log "Starting deployment for repo '$REPO_NAME' under user '$GITHUB_USER'."

get_pat

########################################
# CHECK IF GITHUB REPO ALREADY EXISTS
########################################

log "Checking if GitHub repository already exists..."

REPO_CHECK_STATUS=$(
  curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $PAT" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME"
)

if [[ "$REPO_CHECK_STATUS" == "200" ]]; then
  log "GitHub repo '$GITHUB_USER/$REPO_NAME' already exists. Skipping creation."
elif [[ "$REPO_CHECK_STATUS" == "404" ]]; then
  log "GitHub repo does not exist. Creating it now..."

  CREATE_STATUS=$(
    curl -s -o /tmp/github_repo_create_$$.json -w "%{http_code}" \
      -H "Authorization: token $PAT" \
      -H "Accept: application/vnd.github+json" \
      https://api.github.com/user/repos \
      -d "{\"name\": \"$REPO_NAME\", \"private\": $PRIVATE}"
  )

  if [[ "$CREATE_STATUS" != "201" ]]; then
    err "Failed to create GitHub repository. HTTP status: $CREATE_STATUS"
    warn "Response body:"
    cat "/tmp/github_repo_create_$$.json" >&2 || true
    rm -f "/tmp/github_repo_create_$$.json"
    exit 1
  fi

  log "GitHub repository '$GITHUB_USER/$REPO_NAME' created successfully."
  rm -f "/tmp/github_repo_create_$$.json"
else
  err "Unexpected HTTP status when checking repo: $REPO_CHECK_STATUS"
  exit 1
fi

########################################
# INITIALIZE / UPDATE LOCAL GIT REPO
########################################

if [[ -d .git ]]; then
  log "Existing Git repository detected in current directory."
else
  log "No .git directory found. Initializing new Git repository..."
  git init
fi

# Ensure branch name
log "Setting default branch to '$DEFAULT_BRANCH'..."
git symbolic-ref HEAD "refs/heads/$DEFAULT_BRANCH" 2>/dev/null || git branch -M "$DEFAULT_BRANCH"

# Stage files
log "Staging files..."
git add .

# Commit if there’s anything to commit
if git diff --cached --quiet; then
  log "No changes to commit (index is clean)."
else
  log "Creating commit..."
  git commit -m "Initial deployment"
fi

########################################
# CONFIGURE REMOTE (WITHOUT STORING PAT)
########################################

REMOTE_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"

if git remote get-url origin >/dev/null 2>&1; then
  CURRENT_REMOTE=$(git remote get-url origin)
  if [[ "$CURRENT_REMOTE" != "$REMOTE_URL" ]]; then
    warn "An existing 'origin' remote points to a different URL:"
    warn "  Current: $CURRENT_REMOTE"
    warn "  Expected: $REMOTE_URL"
    err "Refusing to overwrite existing origin. Fix it manually:"
    echo "  git remote set-url origin $REMOTE_URL"
    exit 1
  else
    log "'origin' remote already set correctly."
  fi
else
  log "Setting 'origin' remote to $REMOTE_URL"
  git remote add origin "$REMOTE_URL"
fi

########################################
# PUSH USING PAT IN THE PUSH URL ONLY
########################################

log "Pushing branch '$DEFAULT_BRANCH' to GitHub..."

# Use PAT only in the push URL so it is NOT saved in git config
PUSH_URL="https://$PAT@github.com/$GITHUB_USER/$REPO_NAME.git"

# First push may need -u to set upstream
if git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
  # Upstream exists
  git push "$PUSH_URL" "$DEFAULT_BRANCH"
else
  git push -u "$PUSH_URL" "$DEFAULT_BRANCH"
fi

log "✅ Deployment complete!"
log "Repository: https://github.com/$GITHUB_USER/$REPO_NAME"

# Best-effort cleanup of temp files (if any)
rm -f /tmp/github_repo_create_$$.json 2>/dev/null || true
