# CSR, SSR이란 무엇일까?

동적인 웹 브라우저의 동작 방식을 보면, HTML을 이용해 뼈대를 세우고 JS로 동작할 수 있게 해준다. 이들을 렌더링하는 방식에 따라 CSR, SSR로 나뉘게 된다.

## CSR (Client Side Rendering)

뼈대만 서버에서 받아오고, Client 측에서 동적으로 DOM을 그리는 것을 바로 CSR이라고 한다.

CSR 동작 방식은 아래와 같다.

`index.html`을 서버에서 수신 -> `app.js`을 서버에서 수신 -> client에서 동적으로 HTML 생성 -> 추가로 필요한 데이터는 서버에 요청

```javascript
// 서버에서 받아온 index.html
<body>
    <div id="root"></div>
	<script src="app.js"></script>
<body>
```



### 특징

- HTML이 비어있어 처음 접속 시, 빈 화면이 보인다.
- 자바스크립트에는 어플리케이션 로직과 프레임워크, 라이브러리 소스코드가 모두 포함되어있어 다운로드에 많은 시간이 소요된다.
- index.html에 뼈대만 있어, SEO(Search Engine Optimization)에 취약함 
- 초기 진입 속도가 느리지만, 그 이후에는 필요한 데이터만 업데이트하면 되므로 서버에 부담을 덜 준다.
- SPA 기반으로 하는 라이브러리인 React가 CSR에 특화되어 있음.



## SSR (Server Side Rendering)

동적 DOM을 그리는 곳이 Client가 아닌, Server가 된다면 이는 SSR이라고 할 수 있다. 정확히는 HTML, CSS, JS를 만들어내는 로직을 서버에 올리고, 서버에서 이를 실행시켜 완성된 DOM을 만들고 이 DOM과 동적으로 제어할 수 있는 JS 파일을 Client(브라우저)에 보내주는 것이다.



### 특징

- 첫 페이지 로딩 속도가 빠르다.
- SEO에 좋다.
- 페이지 이동 및 요청 생성 시, 전체적인 웹사이트를 다시 서버에서 받아오기 때문에 전체 리렌더링된다.
- 서버 과부하에 걸리기 쉬움
- 페이지 로딩 시, 화면은 보이지만 클릭이 안되는 경우가 생김



## TTV와 TTI 측면

TTV(Time To View), TTI(Time To Interact) 측면에서 보면

#### **CSR**

Index 파일 로딩(View **x**, Interact **x**) -> JS수신(View **o**, Interact **o**) : JS 파일을 분할해서 첫 화면이 빠르게 나올 수 있게 해야함.

#### **SSR**

만들어진 Index 파일 로딩(View **o**, Interact **x**) ->  JS수신(View **o**, Interact **o**) : TTV와 TTI 간 공백을 줄여야함.



## 어떤 상황에 SSR, CSR을 사용할까?

SEO가 필요한 부분(블로그 등)이 있는 경우에는 SSR을 사용하고, 그렇지 않은 경우에는 CSR을 사용할 수 있다.

로그인이 필요한 페이지의 경우 SEO가 접근이 불가능하므로 CSR을 사용할 수 있다.



## SSG (Static Site Generation)

### React + Gatsby

CSR에 특화된 React를 Gatsby라는 라이브버리와 함께 사용한다면, 정적으로 웹페이지를 미리 생성해서 서버에 배포해놓을 수 있다. 자바스크립트 파일을 함께 저장해서 동적으로 페이지를 구성할 수 있다.



### React + NEXT.js

Next.js 라이브러리를 사용하여 첫 페이지는 SSR과 같이 완성된 HTML 파일을 받아와 SEO를 높이고, 나머지는 CSR 방식을 이용해 서버 과부하 문제를 해결할 수 있다.



참고 자료

- https://tech.weperson.com/wedev/frontend/csr-ssr-spa-mpa-pwa/#ssr-server-side-rendering
- https://www.youtube.com/watch?v=iZ9csAfU5Os

