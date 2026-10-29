#!/bin/sh
# Builds the responsive image sizes the pages use (srcset), from the originals in img/src/.
# Needs cwebp (brew install webp). Run from anywhere after adding or replacing an image:
#   sh scripts/images.sh
# Output: img/<name>-<width>.webp. A WebP original at its own width is copied, not re-compressed.
# Set crop="x y width height" (in original pixels) before a make line to crop first; it applies to that line only.
set -e
cd "$(dirname "$0")/.."

# make <original in img/src> <quality> <width>...
make() {
	src="img/src/$1"; q=$2; shift 2
	name="${src##*/}"; name="${name%.*}"
	own=$(sips -g pixelWidth "$src" | awk '/pixelWidth/ { print $2 }')
	for w in "$@"; do
		out="img/$name-$w.webp"
		if [ -n "$crop" ]; then cwebp -quiet -q "$q" -metadata none -crop $crop -resize "$w" 0 "$src" -o "$out"
		else case "$src" in
			*.webp) [ "$w" -ge "$own" ] && cp "$src" "$out" || cwebp -quiet -q "$q" -metadata none -resize "$w" 0 "$src" -o "$out" ;;
			*) cwebp -quiet -q "$q" -metadata none -resize "$w" 0 "$src" -o "$out" ;;
		esac; fi
		echo "$out  $(( $(wc -c < "$out") / 1024 )) KB"
	done
	crop=
}

# Photos (quality 80): hero, and the two "Așa arată la intrarea în sală" photos
# Hero: portrait photo cropped to the 4:3 frame around the plan on the easel
crop="0 1450 3078 2308"
make oglinda-salii-sevalet-lemn.jpg     80 600 900 1200
make oglinda-salii-rama-aurie.webp      80 600 900 1200
make oglinda-salii-suport-alb.webp      80 600 800 1000

# Templates (quality 85: thin lines and small text)
make sablon-hexagon-auriu.webp  85 450 650 900
make sablon-botanic.webp        85 450 650 900
make sablon-miri-ilustrati.webp 85 450 650 900
make sablon-rock.webp           85 500 700 900
make sablon-roz-clasic.webp     85 300 495
make sablon-floral-auriu.webp   85 300 495

# Custom-design carousel photos (shown in the same landscape frame as Rock, so the same widths; crops match that frame)
make invitatie-personalizata.webp 80 500 700 900
crop="0 1745 3648 2580"
make nunta-masa-meniu.jpg         80 500 700 900
crop="0 0 2503 1770"
make numar-masa-nunta.jpg         80 500 700 900
