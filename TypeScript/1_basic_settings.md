# 개발 환경 Setting

그냥 타입스크립트 파일을 실행시키면, 브라우저가 이를 인식하지 못한다. 그렇기 때문에 자바스크립트 파일로 변환하기 위해 **컴파일**해야한다.



### 기본 설치 

```
// cmd에서
$ npm init -y
$ npm install -g typescript
```



### 타입스크립트 설정파일 생성

tsconfig.json 파일을 추가

```
$ tsc -init //자동 생성
```



```json
//tsconfig.json

{    
  "compilerOptions": {
      "allowJs": true,
      "checkJs": true,
      "target": "es5",
      "module": "commonjs",
      "esModuleInterop": true,
      "sourceMap": true,
      "strict": true,
      "noImplicitAny": true,
      // "outDir": "./dist"
  },
  "include": [“**/*”]
}

```



- **allowJS**: 자바스크립트 파일을 타입스크립트에서 사용할 수 있게 해줌.
- **checkJS**: @ts-check와 같은 효과
- **target**: 컴파일된 코드가 어떤 **환경**에서 실행될 지 정의. 예를 들어서 화살표 함수를 사용하고 target 을 es5 로 한다면 일반 function 키워드를 사용하는 함수로 변환. 하지만 이를 es6 로 설정한다면 화살표 함수를 그대로 유지.
- **module**: 컴파일된 코드가 어떤 **모듈 시스템**을 사용할지 정의합니다. 예를 들어서 이 값을 common 으로 하면 `export default Sample` 을 하게 됐을 때 컴파일 된 코드에서는 `exports.default = helloWorld` 로 변환해주지만 이 값을 es2015 로 하면 `export default Sample` 을 그대로 유지하게 됩니다.  [(모듈 참고 자료)](https://ko.javascript.info/modules-intro)
- **esModuleInterop**: commonjs 모듈 형태로 이루어진 파일을 es2015 모듈 형태로 불러올 수 있게 해줌 [(참고)](https://stackoverflow.com/questions/56238356/understanding-esmoduleinterop-in-tsconfig-file)
- **strict**: 모든 타입 체킹 옵션을 활성화한다는 것을 의미
- **sourceMap**: 어떤 파일들이 컴파일 과정에 포함되는지 TypeScript에게 알려주는 역할
- **outDir**: 컴파일된 파일들이 저장되는 경로를 지정
- **noImplicitAny**: any라도 넣어야한다.
- **include**: 어떤 폴더를 대상으로 타입스크립트를 컴파일 시킬건지
- **strict:** 더 강하게 점검. true 시, strict관련 옵션 다 활성화된다.

- `paths` 옵션은 상대경로가 아닌 **절대경로를 사용하기 위해 경로를 매핑해주는 옵션** (baseUrl 작성 필요) -> 사용하기 위해 webpack config 추가

### 컴파일

#### 실행

```typescript
$ tsc // ts파일에 있는 index.ts를 컴파일해서 index.js, index.js.map을 만듦
$ node dist/index  //index 파일 실행
```



#### 간편한 실행

`yarn start (or npm start)`를 이용할 때 자동으로 `tsc` 가 먼저 실행되게 하기 위해, `package.json` 파일에 아래를 추가해주면 된다.

```
"scripts": {
    "start": "node index.js",
    "prestart": "tsc"
  },
```



#### 결과 빠르게 확인 하는 방법 (더 간편한 실행)

```
$ npm add tsc-watch --dev
```



`package.json`의 `scripts` 안의 내용을 아래와 같이 변경한다.

```
"scripts": {
    "start": "tsc-watch --onSuccess \" node dist/index.js \" "
  }
```



이런 것들을 자동화하는게, **웹팩**이라는 번들러이다. 나중에 공부하자



참고 자료

- https://react.vlpt.us/using-typescript/01-practice.html
- https://nomadcoders.co/typescript-for-beginners/lectures/1647

