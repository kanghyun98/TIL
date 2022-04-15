# 5주차 과제

## 요구 사항

이번 과제는 xv6 환경에서 `getnice`, `setnice`, `ps` 라는 System Call들을 구현하는 것이었다. 각각의 기능은 아래와 같다.

- `getnice(pid) ` : 인자로 받은 pid값에 해당하는 프로세스의 priority(우선순위) 값을 반환
- `setnice(pid, nice)` : 첫번째 인자로 받은 pid값에 해당하는 프로세스의 priority(우선순위) 값을 두번째 인자로 전달한 nice의 값으로 설정
- `ps` : 현재 시스템 내에 있는 프로세스들의 name, pid, state, priority, runtime 값 불러오기



## 수행 과정

과제를 수행하기 위해 업무를 user program 실행, system call 연결, process info 가져오기 3가지로 나눠 진행하였다.



### 1. User Program 실행

`ps`, `getnice`, `setnice가` xv6에서 실행될 수 있도록, `make` 명령어 실행 시 `ps.c`, `getnice.c`, `setnice.c`가 컴파일되게 만들어야한다.

방법은 간단하다. `Makefile`에서 "파일들을 탐색해서 컴파일해주는 명령어"가 있는 부분에 `ps`, `getnice`, `setnice`를 추가해주면 된다.

<img src="https://user-images.githubusercontent.com/70627979/161477823-5b0495d4-0458-4c80-880f-ae0be0e46964.png" alt="image" style="zoom:67%;" />

그러면 이제 `make qemu-nox` 명령어를 실행했을 때,  `ps`, `getnice`, `setnice` 파일들도 컴파일되어있는 것을 확인할 수 있다.



### 2. System Call

이번 단계는 조금 복잡한데, System Call이 실행되는 과정을 보면서,  `ps`, `getnice`, `setnice`를 위한 코드를 추가해보자.

1. user 디렉토리의 `ps.c`, `getnice.c`, `setnice.c`  각각의 파일에서 `user.h`의 `ps()`, `getnice()`, `setnice()` 함수를 호출한다.

   ![image](https://user-images.githubusercontent.com/70627979/161478653-0ae29e68-1005-42dc-8265-582a5d848202.png)

   ![image](https://user-images.githubusercontent.com/70627979/161478662-64d45b17-c8bb-4418-87cc-06c329de8e2e.png)

   ![image](https://user-images.githubusercontent.com/70627979/161478667-994b2c63-5039-4dc7-8c26-87b0834658ea.png)

   

   2. `user.h`에서는 헤더에 해당 System Call의 프로토타입을 정의해주어야 한다.

      <img src="https://user-images.githubusercontent.com/70627979/163186515-0860128e-e988-42de-9907-acbca1e2c401.png" alt="image" style="zoom:80%;" />

   3. 그러면 `usys.S`의 `SYSCALL`이라는 매크로를 타고 들어가게된다.
      → 여기 안에 trap instruction이 있으며, trap이 발생한다
   
      <img src="https://user-images.githubusercontent.com/70627979/161479139-68030582-3ae8-40f1-ba96-6026e1e63151.png" alt="image" style="zoom:67%;" />

      

   4. `usys.S`에서 매크로로 `trap`을 날리면 `verctors.S`로 넘어오게 되는데, trap number에 따라서 올바른 `vector`로 jump를 시켜준다.

   5. jump를 타고 가면, `trap.c` 의 아래 코드에서 intialize된 vector table 숫자에 따라서, 올바른 trap number를 가지고 하단의 `trap()`으로 넘어오게 된다.

      (trap 부분은 따로 추가해줄건 없다)

      <img src="https://user-images.githubusercontent.com/70627979/161479231-7d35880e-893e-4b33-a90a-318bf3425e41.png" alt="image" style="zoom:67%;" />

      그리고 System Call을 호출했기 때문에, `usys.S`에서 trap number를 `trapno`(39번째 줄)에 `T_SYSCALL`이라는 번호를 넣어서 `trap`을 만들어준다.

      결론적으로 `syscall()` (43번째 줄)이 실행된다.

      

   6. `syscall()` 함수는 `syscall.c` 에 구현이 되어있으며, `eax` 레지스터에 넣어두었던 sys-call number를 보고 해당하는 `syscalls[num]()` 를 불러준다. (여기도 따로 추가해줄 것 없음!)

      ![image](https://user-images.githubusercontent.com/70627979/161479406-775b134a-d820-441e-a2b4-f7827d9de514.png)

      `syscalls`라는 함수 포인터 배열에 내가 추가하고 싶은 System Call을 추가해주면 된다.

      추가해주는 방법은,

      6.1) `syscall.h`에서 새로운 System Call의 number를 추가해주고

      <img src="https://user-images.githubusercontent.com/70627979/161479522-3ecbc5c6-d834-4bdd-9f10-aed7710ce07f.png" alt="image" style="zoom:67%;" />

      6.2) 다시 `syscall.c`로 돌아와, `sys_ps`, `sys_getnice`, `sys_setnice`를 `extern` 하고 함수 포인터 배열에 추가해준다.

      <img src="https://user-images.githubusercontent.com/70627979/161479529-dc75da3f-e917-4803-8139-a094510d2890.png" alt="image" style="zoom:67%;" />

      

   7.  `sys_ps`, `sys_getnice`, `sys_setnice`는 어디든 구현될 수 있지만, 일반적으로 프로세스와 관련된 system call들은 `sysproc.c`에  구현된다.

      <img width="548" alt="image" src="https://user-images.githubusercontent.com/70627979/161479743-93278062-094b-4e70-8103-099186df1c0e.png">

      

   8. 최종적으로  `ps()`, `getnice()`, `setnice()`  함수를 어디에 구현할지 결정해서 진행하면 되는데, 보통 system call들이 모두 구현되어 있는 `proc.c`에 구현해주면 된다.

      (코드를 다 짜고 캡쳐해서 함수가 모두 구현이 되어있는데, 각 함수의 구현 부분은 Process Info 가져오는 부분을 보면 이해할 수 있다.)

      <img src="https://user-images.githubusercontent.com/70627979/161480227-b05ba6fd-8c2b-4e51-ab40-cd646c6130ca.png" alt="image" style="zoom:67%;" />

      끝인줄 알았지만, 이렇게 실행하면 `sysproc.c` 파일을 컴파일할 때  함수가 정의가 안되어있다고 오류가 발생한다. 분명히  `ps()`, `getnice()`, `setnice()` 를 `proc.c`에 정의해주었고, vim에서 타고 들어가는데도 문제가 없는데도 말이다.. 

      오랜 탐색의 끝에 함수를 추가로 프로토타입으로 정의해주는 부분이 필요하다는 것을 알게되었다. (구글링해도 안나와서 파일들 뒤적뒤적거리다가 찾았다..)

      ![image](https://user-images.githubusercontent.com/70627979/161480287-3f2f4c7d-f6d1-4ea4-81ed-c3f55e34054f.png)



### 3. process info 가져오기

현재 실행중인 프로세스 정보 얻어오는 부분

```c
int getnice(int pid)
{
    struct proc *p;

    for(p = ptable.proc; p < &ptable.proc[NPROC]; p++){
      // add your code
    }

    return -1;
}
```



proc 구조

```c
struct proc {
  uint sz;                     // Size of process memory (bytes)
  pde_t* pgdir;                // Page table
  char *kstack;                // Bottom of kernel stack for this process
  enum procstate state;        // Process state
  int pid;                     // Process ID
  struct proc *parent;         // Parent process
  struct trapframe *tf;        // Trap frame for current syscall
  struct context *context;     // swtch() here to run process
  void *chan;                  // If non-zero, sleeping on chan
  int killed;                  // If non-zero, have been killed
  struct file *ofile[NOFILE];  // Open files
  struct inode *cwd;           // Current directory
  char name[16];               // Process name (debugging)
  int priority;                // Process priority 
	int runtime;								 // Count running ticks 
};
```





## 테스트

`setnice`와 `getnice`는 `test_nice.c` 파일을 실행시켜 모두 OK가 나오면 과제 성공이고, `ps`는 xv6에서 실행시켜 성공적으로 결과가 뜨면 된다.

(user 디렉토리에 `test_nice.c` 파일이 있는데, 이 파일도 `Makefile`에 추가해주어 컴파일되게 만들면, xv6에서 실행시켜 테스트할 수 있다.)

<img width="416" alt="image" src="https://user-images.githubusercontent.com/70627979/161482055-ebf4af60-5db5-4337-8ff8-ae6bb0229cb1.png">



### 결과

아래와 같이 테스트가 성공적으로 끝났다.

![image](https://user-images.githubusercontent.com/70627979/161481939-828637cc-b80c-42d4-894e-b9e7cec13bef.png)



## 겪었던 문제

### 문제점

처음에 1번, 6번 test에 실패가 떴었다.

테스트 내용을 살펴보니 1번 테스트는 xv6 실행 시 `pid` 값이 1번인 프로세스의 `priority` 값이 5로 초기화되어야 성공할 수 있었고, 6번 테스트는 `fork()`를 하는데, 자식 프로세스의 `priority`값이 부모 프로세스의 `priority`값을 상속받게 만들어야했다.



### 해결 과정

아래와 같이 `init.c` 파일에 `setnice(1, 5)`를 추가해주어 1번 테스트를 통과하였고,

![image](https://user-images.githubusercontent.com/70627979/161482272-b6f67859-ae29-408d-b970-d590204c7a14.png)

`proc.c` 파일의 `fork()` 구현 부분에 현재 실행되는 부모의 `pid`값으로 `getnice()`를 사용해 `priority`를 가져오고, 이 값을 `setnice`를 이용해 자식의 `pid`에 할당해주는 코드를 추가해주면 된다.

```c
setnice(pid, getnice(curproc->pid));
```

