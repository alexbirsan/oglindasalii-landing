#!/bin/sh
# Lists images nothing uses: files in img/ that no page, stylesheet, script or the manifest references,
# and originals in img/src/ whose resized versions (img/<name>-<width>.webp) are all unused.
# Run before every commit, from anywhere:
#   sh scripts/unused-images.sh           list only
#   sh scripts/unused-images.sh --delete  list and delete (also remove the original's line from scripts/images.sh)
set -e
cd "$(dirname "$0")/.."

refs=$(cat *.html css/*.css js/*.js site.webmanifest 2>/dev/null)
found=0
unused() {
	found=1
	if [ "$1" = "--delete" ]; then rm "$2"; echo "deleted  $2"; else echo "unused   $2"; fi
}
for f in img/* img/src/*; do
	[ -f "$f" ] || continue
	case "$f" in */.DS_Store) continue ;; esac
	name="${f##*/}"
	case "$f" in
		img/src/*) printf '%s' "$refs" | grep -qF "img/${name%.*}-" && continue ;;
		*) printf '%s' "$refs" | grep -qF "$name" && continue ;;
	esac
	unused "$1" "$f"
done
[ "$found" = 1 ] || echo "No unused images."
[ "$found" = 1 ] && [ "$1" != "--delete" ] && echo "Run with --delete to remove them." || true
