# include <stdio.h>
# include <unistd.h>
# include <sys/wait.h>

int main() {
  int pid = fork();

  if (pid > 0) {
    printf("parent: child=%d\n", pid);
    pid = wait(NULL);
    printf("child %d is done\n", (int) getpid());
  } else if (pid == 0) {
    printf("child: exiting\n");
  } else {
    printf("fork error\n");
  }
  return 0;
}