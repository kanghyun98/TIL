// Test that fork fails gracefully.
// Tiny executable so that the limit can be filling the proc table.

#include "types.h"
#include "stat.h"
#include "user.h"

#define N  1000

void
print(int fd, const char *s, ...)
{
  write(fd, s, strlen(s));
}

void
forktest(void)
{
  int n, pid;

  print(1, "fork test\n");

  for(n=0; n<N; n++){
    pid = fork();
    if(pid < 0)
      break;
    if(pid == 0)
      exit();
  }

  if(n == N){
    print(1, "fork claimed to work N times!\n", N);
    exit();
  }

  for(; n > 0; n--){
    if(wait() < 0){
      print(1, "wait stopped early\n");
      exit();
    }
  }

  if(wait() != -1){
    print(1, "wait got too many\n");
    exit();
  }

  print(1, "fork test OK\n");
}

int
main(void)
{
  forktest();
  exit();
}
