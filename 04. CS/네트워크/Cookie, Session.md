# Cookie, Session

## Cookie

### 1. 쿠키란

https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies

용도

- 인증
- 개인화
- 방문자의 상태 체크

cookie를 이용하면, 사이트를 나갔다 들어와도 유지되어야 하는 정보를 컨트롤할 수 있다. (e.g. 다크모드, 언어 설정 등)



### 2. 쿠키 생성 방법

Set-Cookie 라는 이름의 header값을 응답하는 http 메시지에 아래 형식으로 넣어주면 된다.

```jsx
Set-Cookie: [cookie-name]=[cookie-value]
```

→ 개발자 도구 - Network - Headers - **Response Headers** 에서 확인가능



### 3. 쿠키 읽는 방법

`request.headers.cookie` 를 이용해서 읽을 수 있지만, 여러개의 쿠키를 하나의 문자열로 받아 처리하기 귀찮아지므로, 라이브러리를 사용하여 쉽게 받아올 수 있다.

`cookie` 라이브러리

```jsx
const cookies = cookie.parse(request.headers.cookie)
```



### 4. 쿠키 Life Cycle

https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Set-Cookie

- Session Cookie

  - 일반적으로 생성한 쿠키는 Session Cookie이다.
  - 웹브라우저를 껐다키면 없어진다.

- Permanent Cookie

  - 웹브라우저를 껐다켜도 남아있다.

  설정 방법

  - **Expires**: 만료일 지정
  - **Max-Age**: 만료기간 지정

  ```jsx
  'Set-Cookie': [
  	...
  	`[cookie-name]=[cookie-value]; Max-Age=${time}`
  	`[cookie-name]=[cookie-value]; Expires=${day} `
  ]
  ```

  - time: 초 단위로 작성 (e.g. 30일: 60*60*24*30)
  - day: 날짜 지정 (e.g. Wed, 21 Oct 2015 07:28:00 GMT)

  

### 5. Secure & HttpOnly

- **Secure** : https를 통해서 통신하는 경우에만 쿠키 전송하게 하는 설정

  ```jsx
  'Set-Cookie': [
  	...
  	`[cookie-name]=[cookie-value]; Secure`
  ]
  ```

→ http를 이용한 통신방법은 중간에 가로채기 쉬워 보안에 위협이 되기 때문에, 중요한 쿠키 정보의 경우 https 통신 방식에서만 전달될 수 있도록 설정한다.

- **HttpOnly** : 웹브라우저와 웹서버가 통신할 때만 쿠키 이용 가능하게 하는 설정

  ```jsx
  'Set-Cookie': [
  	...
  	`[cookie-name]=[cookie-value]; HttpOnly`
  ]
  ```

  → 브라우저 console 창에서 쿠키를 가져오는 등 외부에서 쿠키값에 접근할 수 있게하면 보안에 위협이 되므로 웹브라우저와 웹서버 통신 외에는 접근 못하도록 막아준다.



### 6. Path & Domain

- **Path**: 특정 페이지에서만 쿠키가 활성화되도록 설정

  ```jsx
  'Set-Cookie': [
  	...
  	`[cookie-name]=[cookie-value]; Path=${경로}`
  ]
  ```

  → 기본값이 / 으로 설정되어 있어서, Path를 지정해주지 않는다면 사이트의 모든 페이지에서 해당 쿠키가 활성화된다.

- **Domain**: 어떠한 서브 도메인에서도 쿠키가 활성화 되도록 한다.

  ```jsx
  'Set-Cookie': [
  	...
  	`[cookie-name]=[cookie-value]; Domain=${domain_name}`
  ]
  ```

  만약 domain_name을 `o2.org`로 설정한다면, `**.o2.org**`가 쿠키의 Domain 값으로 저장된다. 그러면 `test.o2.org`로 들어가도 해당 쿠키는 계속 활성화된다.



## Session

쿠키에 중요 정보를 그냥 넣어두면, 쿠키가 유출되거나 조작되었을 때 보안상 문제가 생긴다. 그래서 사용되는게 Session이다.

Session을 사용하면 쿠키에는 sessionid, 즉 식별자만 저장되기 때문에 쿠키에는 아무런 중요한 정보가 포함되지 않는다.



### express-session 라이브러리

Session을 직접 구현할 수도 있지만, `express-session` 라이브러리를 이용하여 쉽게 구현할 수 있다! (물론 `express` 환경에서만)

설치

```jsx
yarn add express-session
yarn add -D @types/express-session
```

간단한 사용 방법

```jsx
import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
	secret: 'asdf',
	resave: false,
	saveUninitialized: true
	})
)

app.get('/', function(req, res, next) {
	console.log(req.session); // node.js
	
	res.send(`Views: ${req.session.num}`);
});
```

app.use: 사용자 요청이 있을 때마다 내부 코드를 실행

session(): 세션 시작, 내부 객체의 값들에 따라서 동작



### option

- `secret`: 쿠키의 session ID 연결 (노출x)

- ```
  resave:false
  ```

   : session data 값이 바뀌기 전까지는 세션 저장소에 값 저장x

  - `true`: 값이 바뀌었건 안바뀌었건 계속 저장소에 저장

- `saveUninitialized:true` : 세션이 필요하기 전까지는 세션을 구동시키지 않는다.



### Session 객체

`req.session` 으로 접근 가능.

`res.send(req.session)`으로 세션에 대한 정보를 전달할 수 있다.

→ request 객체의 프로퍼티로 session 이라는 객체를 추가해줌



### Session 삭제

`request.session.destroy()`를 이용해 서버에 저장된 session을 삭제할 수 있다.

```jsx
router.get('/logout', function (request, response) {
	request.session.destroy(function(err) {
		response.redirect('/');
	});
});
```



### 절차

1. 사용자가 Session Id를 쿠키에 가지고 있는 상태에서 서버로 접속
2. Request Headers에 쿠키값으로 서버쪽에 Session Id 전달
3. Session Middleware가 해당 id값으로 Session-Store(MySQL 등)에서 id값에 대응되는 데이터를 읽음
4. 해당 데이터를 기반으로해서 request 객체의 session이라는 프로퍼티에 객체를 추가함
5. 이후 해당 데이터를 조작 및 변경할 수 있으며, request의 응답으로 해당 데이터의 일부를 전달해줄 수도 있다.