#include <stdio.h>
#include <unistd.h>  

int main() {
  int p[2];
  char* argv[2];

  argv[0] = "wc";
  argv[1] = 0;

  pipe(p);

  if(fork() == 0) {
    close(0);
    dup(p[0]);
    close(p[0]);
    close(p[1]);
    execve("/usr/bin/wc", argv, NULL);
  } else {
    close(p[0]);
    write(p[1], "hello world\n", 12);
    close(p[1]);
  }
}