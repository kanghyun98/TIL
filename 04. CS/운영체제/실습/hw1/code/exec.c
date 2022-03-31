#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
  char *argv[] = {"/bin/ls", NULL};

  int pid = fork();

  if (pid > 0) {
    printf("parent: child=%d\n", pid);
    pid = wait(NULL);
    printf("child %d is done\n", pid);
  } else if (pid == 0) {
    printf("child: exiting\n");
    execve(argv[0], argv, NULL);  // ls 실행
  } else {
    printf("fork error\n");
  }
  return 0;
}