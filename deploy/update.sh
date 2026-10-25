#!/usr/bin/env bash
# Pull the latest code and rebuild/restart. Safe to run any time.
set -euo pipefail
cd /opt/tenfold
git pull --ff-only
cd deploy
docker compose up -d --build
docker image prune -f >/dev/null
echo "==> Done: https://tenfold.kz"
