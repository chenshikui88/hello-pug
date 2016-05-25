#!/bin/python
# coding: UTF-8

import sys

def proc(fs):
	out = fs + '.doc'
	ffd = open(fs)
	fout = open(out, 'w')
	num = 0
	elem = 0;

	for line in ffd.readlines():
		if line.find('201') == 0 and num > 0:
			if elem < 10: # add unit price
				fout.write('0')
			elem = 0
			fout.write('\n')
		#print line.strip('\n').replace(' ',"").strip('\n'),
		str = line.strip('\n').replace("　","").replace(" ","").replace(" ","")
		str = str.replace("座落：","").replace("房号：","").replace("建筑面积：","").replace("户型：","").replace("朝向：","").replace("楼层：","").replace("单价：",""),
		if len(str[0]) == 0:
			continue
		fout.write(''.join(str))
		fout.write(' ')
		elem+=1
		num+=1

	fout.write('\n')
	ffd.close()
	fout.close()

 
if __name__ == '__main__':
	for i in range(1, len(sys.argv)):
		proc(sys.argv[i])
