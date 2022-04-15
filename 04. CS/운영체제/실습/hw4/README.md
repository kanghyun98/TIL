# 7주차 과제

## 요구 사항

이번 과제는 xv6 환경에서 priority scheduler를 구현하는 것이었다.

- priority가 낮은 값이 먼저 수행되어야하며, 동일한 우선순위면 랜덤하게 처리
- fork() 시
  - if (parent's priority >= 15)  then, child's priority = parent's / 2
  - else if (parent's priority < 15)  then, child's priority = parent's + 1
- scheduler 작동 시점을 프로세스가 새로 시작되거나 종료되었을 때만으로 변경 (timer interrupt 무시)



## 수행 과정

과제를 수행하기 위해 위 3개의 조건으로 업무를 나눠 진행하였다.



### 1. priority가 낮은 값이 먼저 수행

기존 xv6는 RR(Round Robin) 방식으로 구현되어있다. 그래서 priority와 상관없이 timer interrupt가 발생할 때마다 다음 process를 실행한다. 이 부분이 구현되어 있는 곳이 `proc.c` 파일의 `scheduler()` 함수이다.

현재 실행중인 process table을 돌면서 `state`가 `RUNNABLE`이면서 `priority`가 가장 높은 process를 `highProc`으로 설정하고, 해당 프로세스로 스위치한다.

<img src="https://user-images.githubusercontent.com/70627979/163576671-250c3f09-0ab5-4171-8ceb-b00f9cf44138.png" alt="image" style="zoom:80%;" />



### 2. fork() 수정

이전 과제 때도 건드렸던 `fork` system call이다.

`parentPriority`를 지난번에 구현한 `getnice()`로 가져오고, 조건에 맞게 `childPriority` 값을 할당한다. 그리고 `fork()`로 만들어진 child process에 priority값을 넣어주기 위해 지난번에 구현한 `setnice()`를 사용한다. 마지막으로 `yield()` system call로 기존에 실행중인 process를 중단하고, 우선순위를 기반으로 다음 프로세스를 실행시킨다.

<img src="https://user-images.githubusercontent.com/70627979/163577068-f86d69ed-7276-41bf-a273-c1f97dfe59ba.png" alt="image" style="zoom:80%;" />



### 3. timer interrupt 무시

RR에서 timer interrupt를 올리는 곳이 trap.c에 구현되어 있다. 해당 코드를 삭제(난 혹시 몰라 주석으로 처리했다)하여 timer interrupt가 올라오지 않게 만들었다.

<img src="https://user-images.githubusercontent.com/70627979/163577819-5c1e4e58-0810-47e1-acd9-4436dfa6c9f6.png" alt="image" style="zoom:80%;" />





## 테스트

아래 그림과 같이 process가 실행되는 코드로, p1이 parent process이며, `fork()`로 p2가 생성, 다시 또 한번 `fork()`로 p3가 생성된다. p1의 초기 priority값이 20으로 설정되기 때문에, p1은 priority 값이 10, p2는 priority값이 11이 되어 p2→p3→p1 순으로 실행되어야 한다.

<img width="707" alt="image" src="https://user-images.githubusercontent.com/70627979/163577959-6e9eab8a-d48a-46a8-ac48-dd361913c1ef.png" style="zoom:67%;" >

<img src="https://user-images.githubusercontent.com/70627979/163577781-6df2eb1a-a6b7-49a9-9e33-d589c4e4a4ff.png" alt="image" style="zoom:80%;" />



### 결과

아래와 같이 테스트가 성공적으로 실행되었다.

<img src="https://user-images.githubusercontent.com/70627979/163578208-96ebfd97-f3af-49f2-b357-539fd9914f96.png" alt="image" style="zoom: 33%;" />



## 겪었던 문제

### 문제점

처음에 코드를 짜고 테스트를 실행했을 때, 우선순위 기반 프로세스 실행이 정상적으로 동작하지 않았고, p2→p3→p1 순으로 실행되어야할 프로세스가 p1→p2→p3 순으로 실행되었다.



### 해결 과정

우선 `fork()`가 실행되었을 때 child priority의 값이 정상적으로 생성되는지 확인해보았고, 문제가 없었다.

그 다음 의심해봤던게 `scheduler()`가 `fork()` 시에 정상적으로 호출되는지였다. 그래서 `scheduler()`에   `cprintf`를 찍어줘서 테스트 실행 시 언제 호출되는지 확인하였다.

<img src="https://user-images.githubusercontent.com/70627979/163579419-d1a65659-b0e9-45bb-8801-2be824c02d91.png" alt="image" style="zoom:33%;" />

<img src="https://user-images.githubusercontent.com/70627979/163579461-28ae5fe1-acae-407d-95df-adaaf0741cdc.png" alt="image" style="zoom:33%;" />

→ 테스트 결과를 확인해보니 처음에만 프린트가 안찍히는걸로 봐서, 처음 `fork()` 시 `scheduler()`가 실행되지 않는 것을 확인할 수 있었다.



그래서 `fork()` 구현부를 하나씩 뜯어보았고, 아래 코드에서 문제점을 찾을 수 있었다. 바로 기존 프로세스를 중단시키는 `yield()`  system call이 없다는 것이다. 그래서 계속 `fork()`가 실행되어도 `scheduler()`가 호출되지 않고, 프로세스가 종료되었을 때만 `scheduler()`가 호출되어서 parent process가 먼저 실행되었던 것이었다.

##### 변경 전 fork 코드

<img src="https://user-images.githubusercontent.com/70627979/163579712-71ffa38f-0b4f-4587-8fa9-82c26250e815.png" alt="image" style="zoom:80%;" />

##### 변경 후 fork 코드

<img src="https://user-images.githubusercontent.com/70627979/163577068-f86d69ed-7276-41bf-a273-c1f97dfe59ba.png" alt="image" style="zoom:80%;" />