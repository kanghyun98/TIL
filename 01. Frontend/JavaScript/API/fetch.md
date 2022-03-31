# Fetch API

Fetch API를 이용하면 Request나 Response와 같은 HTTP의 파이프라인을 구성하는 요소를 조작하는 것이 가능하다. 그리고 fetch() 메서드를 이용해 비동기 네트워크 통신을 쉽게 기술할 수 있다.



## jQuery.ajax()와의 차이점

- fetch()로 반환되는 Promise 객체는 **HTTP error 상태를 reject하지 않음**. (HTTP Statue Code가 404, 500을 반환하더라도)

  → ok상태가 false인 resolve가 반한되며, 네트워크 장애나 요청이 완료되지 못한 상태에는 reject가 반환된다.

- fetch는 보통 **쿠키를 보내거나 받지 않음.** 사이트에서 세션을 유지 관리해야하는 경우 인증되지 않는 요청이 발생함. 쿠키를 전송하기 위해서는 credential init 옵션을 반드시 설정해야함.

- cross-site cookies를 받지 않는다. cross-site session을 설정할 수 없다.



## 사용법

`fetch()` 함수는 첫번째 인자로 URL, 두번째 인자로 옵션 객체를 받고, Promise 타입의 객체를 반환한다. 반환된 객체는, API 호출이 성공했을 경우에는 응답(response) 객체를 resolve하고, 실패했을 경우에는 예외(error) 객체를 reject한다.


```jsx
fetch(url, options)
  .then(response => response.json())
  .then(myJson => console.log(JSON.stringify(myJson));
);
```



### 1. GET

fetch()는 기본적으로 **GET 방식**으로 작동한다.

- 옵션(options) 객체에는 HTTP 방식(method), HTTP 요청 헤더(headers), HTTP 요청 전문(body) 등을 설정

- `fetch()` 함수는 Promise 객체인 Response를 반환하고, 이 Response 객체는 body, header, ok, status, url 등을 포함하고 있다.

  그 중 `json()` 내장 함수가 있는데, 메서드 사용시 body 텍스트를 JSON 형식으로 바꾼 Promise를 반환해준다.

status: 200

### 2. POST

`method` 옵션을 `POST`로 지정해주고, `headers` 옵션을 통해 JSON 포멧을 사용한다고 알려줘야 하며, 요청 전문을 JSON 포멧으로 직렬화화여 가장 중요한 `body` 옵션에 설정

```jsx
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Test",
    body: "I am testing!",
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

status: 201

### 3. PUT, DELETE

PUT은 method 옵션만 PUT 설정한느 것 외에는 POST 방식과 흡사하다.

DELETE는 보낼 데이터가 없으므로  headers와 body 옵션이 필요없다.

```jsx
fetch(url, {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```



### 모듈로 빼서 사용

```jsx
async function post(host, path, body, headers = {}) {
  const url = `https://${host}/${path}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

//사용
post("jsonplaceholder.typicode.com", "posts", {
  title: "Test",
  body: "I am testing!",
  userId: 1,
})
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```



> Headers, Body는 무슨 역할을 하는 것일까?

https://developer.mozilla.org/ko/docs/Web/API/Fetch_API



(Backend가 아직 없는 프로젝트를  JSON 파일 형식으로 데이터를 저장하고 fetch()를 이용함으로써 Web API를 이용하는 것과 유사하게 진행할 수 있다.)

## 

참고 자료

- https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
- https://developer.mozilla.org/ko/docs/Web/API/Fetch_API
- https://velog.io/@eunjin/JavaScript-fetch-함수-쓰는-법-fetch-함수로-HTTP-요청하는-법
- https://velog.io/@prayme/Fetch-API