# Fetch API

Fetch API를 이용하면 Request나 Response와 같은 HTTP의 파이프라인을 구성하는 요소를 조작하는 것이 가능하다. 그리고 fetch() 메서드를 이용해 비동기 네트워크 통신을 쉽게 기술할 수 있다.



## jQuery.ajax()와의 차이점

- fetch()로 반환되는 Promise 객체는 **HTTP error 상태를 reject하지 않음**. (HTTP Statue Code가 404, 500을 반환하더라도)

  → ok상태가 false인 resolve가 반한되며, 네트워크 장애나 요청이 완료되지 못한 상태에는 reject가 반환된다.

- fetch는 보통 **쿠키를 보내거나 받지 않음.** 사이트에서 세션을 유지 관리해야하는 경우 인증되지 않는 요청이 발생함. 쿠키를 전송하기 위해서는 credential init 옵션을 반드시 설정해야함.

- cross-site cookies를 받지 않는다. cross-site session을 설정할 수 없다.

- 

```jsx
fetch('<http://example.com/movies.json>')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
```

`fetch()` 함수는 Promise 객체인 Response를 반환하고, 이 Response 객체는 body, header, ok, status, url 등을 포함하고 있다.

그 중 `json()` 내장 함수가 있는데, 메서드 사용시 body 텍스트를 JSON 형식으로 바꾼 Promise를 반환해준다.



> Headers, Body는 무슨 역할을 하는 것일까?

https://developer.mozilla.org/ko/docs/Web/API/Fetch_API



(Backend가 아직 없는 프로젝트를  JSON 파일 형식으로 데이터를 저장하고 fetch()를 이용함으로써 Web API를 이용하는 것과 유사하게 진행할 수 있다.)

## 

참고 자료

- https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
- https://developer.mozilla.org/ko/docs/Web/API/Fetch_API
- https://velog.io/@eunjin/JavaScript-fetch-함수-쓰는-법-fetch-함수로-HTTP-요청하는-법
- https://velog.io/@prayme/Fetch-API