#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>  
#include <unistd.h>  
#define MAXLEN 256

void cat();

int main(int argc, char *argv[]) {
  int fd, i;

  if (argc <= 1) {
    cat(0);
    exit(1);
  }

  for (i = 1; i < argc; i++) {
    if ((fd = open(argv[i], 0)) < 0) {
      printf("cat: cannot open %s\n", argv[i]);
      exit(1);
    }

    cat(fd);
    close(fd);
  }

  exit(1);
}

void cat(int fd) {
  int n;
  char buf[MAXLEN];

  while((n = read(fd, buf, sizeof(buf))) > 0) {
    if (write(1, buf, n) != n) {
      printf("cat: write error \n");
      return;
    }
  } 

  if (n > 0) {
    printf("cat: read error\n");
    return;
  }
}

