#!/usr/bin/env bash
# One-time setup on a fresh Ubuntu 22.04/24.04 VPS. Run as root:
#   curl -fsSL https://raw.githubusercontent.com/shakenbissenkulov-jpg/tenfold/main/deploy/setup.sh | bash
set -euo pipefail

REPO=https://github.com/shakenbissenkulov-jpg/tenfold.git
DIR=/opt/tenfold

echo "==> Swap (the build needs ~2 GB of memory)"
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Docker"
if ! command -v docker >/dev/null; then
  curl -fsSL https://get.docker.com | sh
fi

echo "==> Firewall: SSH, HTTP, HTTPS"
if command -v ufw >/dev/null; then
  ufw allow OpenSSH && ufw allow 80/tcp && ufw allow 443/tcp && ufw allow 443/udp && ufw --force enable
fi

echo "==> Code"
if [ -d "$DIR/.git" ]; then git -C "$DIR" pull --ff-only; else git clone "$REPO" "$DIR"; fi

if [ ! -f "$DIR/deploy/.env" ]; then
  cp "$DIR/deploy/.env.example" "$DIR/deploy/.env"
  chmod 600 "$DIR/deploy/.env"
  echo
  echo "!! Fill in $DIR/deploy/.env (RESEND_API_KEY etc.):  nano $DIR/deploy/.env"
  echo "!! Then run:  bash $DIR/deploy/update.sh"
  exit 0
fi

bash "$DIR/deploy/update.sh"
