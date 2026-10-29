#!/bin/sh
# Lists files in img/ that no page, stylesheet, script or the manifest references.
# The originals in img/src/ are never touched. Run from anywhere:
#   sh scripts/unused-images.sh           list only
#   sh scripts/unused-images.sh --delete  list and delete
set -e
cd "$(dirname "$0")/.."

refs=$(cat *.html css/*.css js/*.js site.webmanifest 2>/dev/null)
found=0
for f in img/*; do
	[ -f "$f" ] || continue
	case "$f" in */.DS_Store) continue ;; esac
	name="${f##*/}"
	printf '%s' "$refs" | grep -qF "$name" && continue
	found=1
	if [ "$1" = "--delete" ]; then rm "$f"; echo "deleted  $f"; else echo "unused   $f"; fi
done
[ "$found" = 1 ] || echo "No unused images."
[ "$found" = 1 ] && [ "$1" != "--delete" ] && echo "Run with --delete to remove them." || true
