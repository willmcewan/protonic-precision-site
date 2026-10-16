#!/bin/zsh
# Copies the chosen fal shots from ../Social/fal/out into src/assets/img/photos as web-sized WebP.
# Each line: <source png> <site name> [crop]. Long edge 1800px; crop is an ImageMagick -gravity/-crop pair.
set -e
SRC="${0:A:h}/../../Social/fal/out"; OUT="${0:A:h}/../src/assets/img/photos"; mkdir -p "$OUT"
while read -r src name crop; do
  [[ -z $src || $src == \#* ]] && continue
  args=("$SRC/$src.png")
  [[ -n $crop ]] && args+=(-gravity South -crop "$crop" +repage)
  magick "${args[@]}" -resize '1800x1800>' -strip -quality 80 "$OUT/$name.webp"
  echo "$name.webp $(magick identify -format '%wx%h' "$OUT/$name.webp")"
done <<'LIST'
F01-tailgate-plinking-1 plinker-tailgate
P02-plinker-float-1     plinker-float
M05-water-1             plinker-water
T08-dock-sbr-1          sidearm-dock
P05-sidearm-pistol-1    sidearm-bench
M04-knolling-1          sidearm-kit
F02-elk-ridge-1         adapt-ridge
T01-surf-insertion-2    adapt-surf
P03-biggame-slate-1     adapt-slate
F04-frost-blind-1       adapt-blind
T03-boat-night-1        safari-boat
F05-desert-prone-2      safari-desert
P04-crossover-configs-1 safari-lengths
P01-lineup-1            lineup
B01-brothers-bench-1    bench 100%x58%
B02-dealer-counter-1    dealer-counter
B03a-red-1              atom-red
B03b-grey-1             atom-grey
B03c-black-1            atom-black
M03-exploded-1          exploded
M01-bore-crosshair-1    bore
M02-threads-1           threads
LIST
