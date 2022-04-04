# 3주차 과제

## 과제1

운영체제 실습을 위한 xv6 환경을 Docker 위에서 셋팅하고, 첫번째 과제가 주어졌다.



xv6 셋팅이 되어있는 디렉토리에서 `make qemu-nox` 명령어를 실행시키면 xv6가 부팅되는데, 부팅될 때마다 이미지와 같이 학번과 이름이 출력되도록 만드는 것이다.

![image](https://user-images.githubusercontent.com/70627979/158997738-8a92d1e8-b47f-4c41-9ad0-2b19cf754efa.png)



힌트로 `main()` 함수를 찾으라고 하셨다. 바로 main() 함수를 찾기위해 xv6을 종료하고 파일들을 ls 명령어로 확인했는데, 도대체 몇개가 있는건지 가늠이 안된다..

하지만 하나씩 확인하라는 과제를 주셨을리는 없고, 위 이미지를 다시 확인해보니 `init:starting sh` 명령어가 보인다.

바로 해당 명령어가 실행된 파일을 찾았고, `user/init.c`  파일 안에서 찾을 수 있었다. 그리고 아래 코드를 추가해줌으로써 첫번째 과제는 쉽게 해결할 수 있었다.

```c
printf(1, "ID: 20170781\n");
printf(1, "Name: Kanghyun Lee\n");
```



<img width="512" alt="image" src="https://user-images.githubusercontent.com/70627979/159010282-05cc10f7-d56b-4773-9ea5-c2762fe94d09.png">

![image](https://user-images.githubusercontent.com/70627979/158999260-2a3af08d-30b6-443d-9c54-96e4710ff7bc.png)

끝!



## 과제2

gdb 이용하기!

199번째 줄에서 `np->size` 변수에 값이 할당되는데, 해당 코드 실행 직후 `np->size` 변수의 값이 무엇인지 출력하기

![image](https://user-images.githubusercontent.com/70627979/159192058-9599752d-602a-4032-97e3-b448c2f7e0f9.png)



### 실행 코드

gdb를 실행한 후에

```
$ b fork
$ c
$ n
...
199	  np->sz = curproc->sz;
$ display np->sz
```

![image](https://user-images.githubusercontent.com/70627979/159192482-5d5bbace-eef2-4188-a35f-74e5e7a9d3bd.png)



끝!