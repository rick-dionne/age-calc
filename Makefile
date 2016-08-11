# Social Security insolvency calculator makefile
# Rick Dionne, July 2016

# sets deployment target
# must be writable directory path
TARGET=./static/

all: build

.phony: build clean

clean:
	rm -f ./*~
	rm -f dev/*~

build:
	mkdir -p $(TARGET)
	cp -f  dev/index.html $(TARGET)
	cp -f  dev/style.css  $(TARGET)
	cp -f  dev/calc.js    $(TARGET)
	cp -rf dev/img        $(TARGET)
