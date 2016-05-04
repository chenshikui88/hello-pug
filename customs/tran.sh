!/bin/sh

cat pagelist.txt | awk '{print "\047"$1"\047"",";}'

