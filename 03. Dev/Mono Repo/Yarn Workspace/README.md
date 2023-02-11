# Mono Repo with "Yarn Workspace"

Yarn Classic에서는 **Workspace**라는 기능을 통해 모노레포를 지원한다.

- 패키지 매니저만으로 모노레포를 구성하게 되면 모노레포 빌드 시스템 도구를 사용하여 나타나는 오버헤드를 줄일 수 있다.
- 하지만 프로젝트의 규모가 커짐에 따라 빌드 타임을 줄이기 위해 필요한 캐싱, 분산작업과 같은 구성이 어려워질 수 있다.

<br>

## 모노레포 의존성 관리 방법

<img src="https://user-images.githubusercontent.com/70627979/218269086-278321cc-a7aa-478a-978c-1f577acd1451.png" alt="image" style="zoom:70%;" />

<br>

## 용어

- project
  - = 저장소
  - 하나 이상의 worktree 포함
  - 최소 한 개의 workspace(즉, 루트 workspace) 존재
- workspace
  - = 모노레포 패키지
- worktree
  - 자식 workspace를 갖는 workspace

<br>

## 실습 과정

목표) common, web, mobile 세 프로젝트를 포괄하는 모노레포 생성하기

<br>

1. 모노레포를 생성할 폴더에서 `$ yarn init` 명령어 실행

2. `package.json`에서 workspace를 추가

   ```json
   // root의 package.json
   {
     "name": "mono-yarn",
     "version": "1.0.0",
     "license": "MIT",
     "private": true,
     "workspaces": [
       "projects/*"
     ]
   }
   ```

3. `projects` 폴더 내부에 `common`, `mobile`, `web` 폴더를 생성한 후, 각 폴더에 들어가 `$ yarn init` 실행하여 독립적인 `package.json` 생성

   (프로젝트의 name을 변경하여 보다 직관적으로 만들 수 있다.)

   ```json
   // 각 project의 package.json
   {
     "name": "mobile", // @hyun/mobile
     "version": "1.0.0",
     "license": "MIT"
   }
   ```

4. 루트 경로에서 `$ yarn` 실행

   → `node_modules` 디렉토리에 workspace들에 대한 **심볼릭 링크** 생성

   1. name: *common*, *mobile*, *web*

   <img src="https://user-images.githubusercontent.com/70627979/218268896-25595e59-9f2a-4cdc-bd75-f0c6247f8628.png" alt="image" />

   1. name: *@hyun/common*, *@hyun/mobile*, *@hyun/web*

   ![image](https://user-images.githubusercontent.com/70627979/218268946-05f67645-794c-44c6-9447-084879184f00.png)

5. workspace에 대한 명령 실행

   특정 workspace에 정의된 스크립트를 실행한다.

   ```bash
   $ yarn workspace <WORKSPACE_NAME> <COMMAND_NAME>
   ```

   이를 간단하게 실행하기 위해 루트 경로의 `package.json` 의 `scripts`에 workspace 명령어를 추가할 수 있다.

   ```json
   // root의 package.json
   "scripts": {
     "common": "yarn workspace @hyun/common",
     "mobile": "yarn workspace @hyun/mobile",
     "web": "yarn workspace @hyun/web"
   }
   ```

   - 이전) `$ yarn workspace @hyun/web <command>`
   - 이후) `$ yarn web <command>`

6. 의존성 추가

   ```bash
   // 루트 프로젝트
   yarn add <PACKAGE_NAME>
   
   // 특정 프로젝트에서
   yarn workspaces <WORKSPACE_NAME> add <PACKAGE_NAME>
   
   // workspace를 의존성으로 추가
   $ yarn workspace <WORKSPACE_NAME> add <TARGET_WORKSPACE_NAME>@1.0.0
   ```

   - 예제

     ```bash
     $ yarn web add @hyun/common@1.0.0
     
     // script 없이
     $ yarn workspace @hyun/web add @hyun/common@1.0.0
     ```

7. workspace 의존 관계 확인

   ```bash
   $ yarn workspaces info
   ```

   ![image](https://user-images.githubusercontent.com/70627979/218268977-3194cded-1759-4796-aee0-a071ef2b7816.png)

8. 모든 workspace에 대해 명령 실행

   ```bash
   $ yarn workspaces run <COMMAND>
   ```

<br>

### 테스트

위 실습 결과를 토대로 정상적으로 모노레포가 생성되고, common ← web/mobile 의 의존 관계를 따라 정상적으로 실행되는지 확인해보자.

<br>

우선 `projects/common` 디렉토리에 `index.js` 파일을 생성하고, 간단하게 ‘hello’를 출력하는 `hello` 라는 함수를 만들고 `export` 한다.

<img src="https://user-images.githubusercontent.com/70627979/218269024-730b59d1-60fa-4cc9-9c41-486c3013b230.png" alt="image" style="zoom:50%;" />

<br>

이제 `projects/web` 디렉토리에서 `test.js` 파일을 만들고, `hello` 함수를 `import` 한다.

<img src="https://user-images.githubusercontent.com/70627979/218269029-6229f2d4-003e-4c47-aa2b-e8db38a54aa6.png" alt="image" style="zoom:50%;" />

<br>

그리고 간단하게 `projects/web/package.json`에서 `test.js`를 실행시키는 명령어를 추가해주고 `$ yarn web start` 를 실행하면 정상적으로 hello가 출력되는 것을 확인할 수 있다.

```json
// package.json
{
  "name": "@hyun/web",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "start": "node test.js"
  },
  "dependencies": {
    "@hyun/common": "1.0.0"
  },
  "type": "module"
}
```

> `import`/`export`를 사용하려면 `package.json`에 `"type": "module”` 설정을 추가해야 한다.

<br>

## 참고 자료

- https://d2.naver.com/helloworld/7553804