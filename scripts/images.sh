#!/bin/sh
# Builds the responsive image sizes the pages use (srcset), from the originals in img/src/.
# Needs cwebp (brew install webp). Run from anywhere after adding or replacing an image:
#   sh scripts/images.sh
# Output: img/<name>-<width>.webp. A WebP original at its own width is copied, not re-compressed.
set -e
cd "$(dirname "$0")/.."

# make <original in img/src> <quality> <width>...
make() {
	src="img/src/$1"; q=$2; shift 2
	name="${src##*/}"; name="${name%.*}"
	own=$(sips -g pixelWidth "$src" | awk '/pixelWidth/ { print $2 }')
	for w in "$@"; do
		out="img/$name-$w.webp"
		case "$src" in
			*.webp) [ "$w" -ge "$own" ] && cp "$src" "$out" || cwebp -quiet -q "$q" -metadata none -resize "$w" 0 "$src" -o "$out" ;;
			*) cwebp -quiet -q "$q" -metadata none -resize "$w" 0 "$src" -o "$out" ;;
		esac
		echo "$out  $(( $(wc -c < "$out") / 1024 )) KB"
	done
}

# Photos (quality 80): hero, and the two "Așa arată la intrarea în sală" photos
make oglinda-salii-sevalet-gradina.jpeg 80 600 900 1195
make oglinda-salii-rama-aurie.webp      80 600 900 1200
make oglinda-salii-suport-alb.webp      80 600 800 1000

# Templates (quality 85: thin lines and small text)
make sablon-hexagon-auriu.webp  85 450 650 900
make sablon-botanic.webp        85 450 650 900
make sablon-miri-ilustrati.webp 85 450 650 900
make sablon-rock.webp           85 500 700 900
make sablon-roz-clasic.webp     85 300 495
make sablon-floral-auriu.webp   85 300 495
