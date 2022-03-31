# System Call 정리

## Processes and memory

### - fork() 

: process 복제

- fork 이후에 parent, child에 동일한 코드가 적용이 된다.
- parent) `pid > 0` , child) `pid == 0`

![img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ff8c4073-5d48-4524-9217-a2218f316873/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220331T065058Z&X-Amz-Expires=86400&X-Amz-Signature=640188fcb05a66fcd3c079018ed1e5b0f1d4866077e81da4c2ffb638042eec63&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)



### - execve(”경로", arg)

: child process에서 다른 프로그램을 호출해서 실행

![Untitled.png (1373×601)](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f444713a-4aa1-451e-b86e-c10bd60679fc/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220331T065352Z&X-Amz-Expires=86400&X-Amz-Signature=a697c9960aa67144f411b27a1e76c74ea8576fdee5df12fa96468415ff1de4f1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)



### - shell

![Untitled.png (1451×714)](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8d81ebbb-c5b9-4979-af95-0764be683964/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220331T065425Z&X-Amz-Expires=86400&X-Amz-Signature=364c7149e840cbbdc270e734280fde797d0170a9643dfb6e5ee83b80e72bc860&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)



## I/O and File descriptors

- File descriptor
  - 프로세스가 read, write 가능한 kernel object를 나타내는 정수
  - 연결 가능한 것: file, pipes, and devices
- 대표적인 file descriptors: Stdin, Stdout, Stderr

### - Cat

: 파일 내용 출력

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7854c79b-cdef-4a77-b68b-d325952ae93d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220331T065628Z&X-Amz-Expires=86400&X-Amz-Signature=57971f100d5ab2ee6621795cb19ca798e2f1c399c882670aad45d9ded5901b05&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="img" style="zoom:67%;" />

![Untitled.png (1456×650)](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4493e26a-1dc1-49d8-88e7-c20ffbcf4d0d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220331T065639Z&X-Amz-Expires=86400&X-Amz-Signature=2d1038e9fb5ce901eff7adf6fafd6337fc1eb8615b3b5490b2e11293bef54117&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)



## Pipes

**IPC(Inter Process Communication)**: 두 개 애플리케이션 간에 통신할 수 있게 만듦

### - Pipes

: 작은 kernel buffer

- 두 개의 file descriptors로 이루어져있음
- 좌측 프로세스의 출력값을 우측 프로세스의 입력값으로 연결.

![Untitled.png (1057×561)](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/fe522ccf-bac4-4245-869e-fa3db18d674c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220331T065701Z&X-Amz-Expires=86400&X-Amz-Signature=b7c1142e73c2745c3a08ac507e9702065f3968a91776c516e675dc90bda37a24&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

