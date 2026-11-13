#!/usr/bin/env bash
# Run on the deployment host from a clean, reviewed Git checkout.
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "Refusing to publish tracked, uncommitted changes." >&2
  exit 1
fi
revision=$(git rev-parse HEAD)
export PUBLIC_SITE_URL=https://www.cardpress.diy
export PUBLIC_INDEXABLE=true
export ASTRO_TELEMETRY_DISABLED=1
npm ci --no-audit --no-fund
npm run check
npm run build
npm run verify
node scripts/verify-production.mjs

site_root=/var/www/cardpress
release=$(mktemp -d "$site_root/releases/${revision:0:12}.XXXXXXXX")
cp -a dist/. "$release/"
find "$release" -type d -exec chmod 755 {} +
find "$release" -type f -exec chmod 644 {} +
previous=$(readlink "$site_root/current" || true)
# Both symlinks live on the same filesystem; rename switches releases atomically.
ln -s "$release" "$site_root/current.next"
mv -Tf "$site_root/current.next" "$site_root/current"
printf 'Published %s\nRelease: %s\nPrevious: %s\n' "$revision" "$release" "$previous"
