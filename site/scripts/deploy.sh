#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

: "${GITHUB_OWNER:=rdebiasec}"
: "${GITHUB_REPO:=dbx-solutions-website}"
TARGET_BRANCH="gh-pages"
BUILD_DIR="$ROOT_DIR/dist"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required but not found in PATH." >&2
  exit 1
fi

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$REPO_ROOT" ]]; then
  echo "This script must run inside a git repository. Initialize the repo first." >&2
  exit 1
fi

if [[ -z "${GH_TOKEN:-}" ]]; then
  echo "GH_TOKEN is not set. Source your .env file first (e.g., 'source .env')." >&2
  exit 1
fi

echo "Building static bundle…"
npm run build:gh-pages

if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Build directory '$BUILD_DIR' not found." >&2
  exit 1
fi

git -C "$REPO_ROOT" fetch origin "$TARGET_BRANCH" || true
if ! git -C "$REPO_ROOT" show-ref --verify --quiet "refs/heads/$TARGET_BRANCH"; then
  if git -C "$REPO_ROOT" show-ref --verify --quiet "refs/remotes/origin/$TARGET_BRANCH"; then
    git -C "$REPO_ROOT" branch "$TARGET_BRANCH" "origin/$TARGET_BRANCH"
  else
    git -C "$REPO_ROOT" checkout --orphan "$TARGET_BRANCH"
    git -C "$REPO_ROOT" reset --hard
    git -C "$REPO_ROOT" checkout - >/dev/null
  fi
fi

WORKTREE_DIR="$(mktemp -d -t gh-pages-worktree-XXXXXX)"
cleanup() {
  git -C "$REPO_ROOT" worktree remove -f "$WORKTREE_DIR" >/dev/null 2>&1 || true
  rm -rf "$WORKTREE_DIR"
}
trap cleanup EXIT

git -C "$REPO_ROOT" worktree add "$WORKTREE_DIR" "$TARGET_BRANCH" >/dev/null

rsync -av --delete --exclude '.git' "$BUILD_DIR"/ "$WORKTREE_DIR"/

pushd "$WORKTREE_DIR" >/dev/null
if git status --short | grep -q .; then
  git add -A
  git commit -m "Deploy $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  REPO_URL="https://${GH_TOKEN}@github.com/${GITHUB_OWNER}/${GITHUB_REPO}.git"
  git push "$REPO_URL" "$TARGET_BRANCH"
  echo "Deployed ${GITHUB_OWNER}/${GITHUB_REPO} to ${TARGET_BRANCH}."
else
  echo "No changes to deploy."
fi
popd >/dev/null

