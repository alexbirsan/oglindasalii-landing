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

# Photos (quality 80): hero, and the photos at real weddings in the Design personalizat carousel (4:3)
# Hero: portrait photo cropped to the 4:3 frame around the plan on the easel
crop="185 1906 2916 2187"
make oglinda-salii-sevalet-lemn.jpg     80 600 900 1200
make oglinda-salii-rama-aurie.webp      80 600 900 1200
make oglinda-salii-suport-alb.webp      80 600 900

# Custom designs shown whole in the carousel (quality 85: thin lines and small text)
make sablon-roz-clasic.webp     85 300 495
make sablon-floral-auriu.webp   85 300 495
make sablon-rock.webp           85 500 700 900

# Custom-design carousel: one wedding's set, in the same style (landscape frame, 500/700/900 widths; crops match that frame)
# The plan detail is the design file itself (wider than the frame), shown whole on white
make oglinda-salii-hexagon-detaliu.jpg 85 500 700 900
make invitatie-personalizata.webp 80 500 700 900
crop="0 1745 3648 2580"
make nunta-masa-meniu.jpg         80 500 700 900
crop="0 0 2503 1770"
make numar-masa-nunta.jpg         80 500 700 900

# Editor templates (Șabloane), exported from the editor; the file name ends in the template's ID in the editor (quality 85).
# gold_smarald is also the sheet on the hero photo; gold_smarald and elegant_gold are the "Pe mese sau alfabetic" feature
make pe-mese-sablon-gold_smarald.jpg    85 450 650 900
make pe-mese-sablon-floral_embassy.jpg  85 450 650 900
make pe-mese-sablon-simple_elegant.jpg  85 450 650 900
make alfabetic-sablon-elegant_gold.jpg  85 300 540

# Tutorial clips (Cum funcționează): the YouTube thumbnail (i.ytimg.com/vi/<video ID>/maxresdefault.jpg), shown until the clip is played
make tutorial-proiect-nou.jpg 80 600 900 1280
make tutorial-mese.jpg        80 600 900 1280
make tutorial-font.jpg        80 600 900 1280
make tutorial-alfabetic.jpg   80 600 900 1280
make tutorial-imagine.jpg     80 600 900 1280

# Features: the TV mockup (cropped around the TV) and a plan with the couple's own logo (cropped to the logo and the date)
crop="1100 120 1130 640"
make tv-presentation.png 82 400
crop="1300 100 2200 790"
make propriu_logo.jpg    85 500
