BUILD = ./build
SRCS = $(wildcard ./src/*.c)
PROGS = $(patsubst %.c,%,$(SRCS))

CFLAGS = -W -Wall `sdl-config --cflags --libs`

all: $(PROGS)

%: %.c
	$(CC) $(CFLAGS)  -o  $(BUILD)/$(notdir $@) $<
clean:
	rm -f $(BUILD)/*
