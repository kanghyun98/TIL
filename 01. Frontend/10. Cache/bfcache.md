# bfcache

## 1. bfcache란?

사용자가 다른 곳으로 이동할 때 **페이지의 전체 스냅샷(JavaScript 힙 포함)을 저장하는 메모리 내 캐시**이다. 전체 페이지를 메모리에 저장함으로써 이전 페이지로 돌아가고 싶을 때 브라우저에서 빠르고 쉽게 페이지를 복원할 수 있다.



## 2. bfcache가 필요한 이유

- 탐색 속도를 높일 수 있다.
- 리소스를 다시 다운로드할 필요가 없어 데이터 사용량을 줄일 수 있다.
- Chrome 사용 데이터에 따르면 데스크톱의 탐색 10개 중 1개, 모바일의 탐색 5개 중 1개가 뒤로 또는 앞으로 이동한다고한다.



## 3. 캐시의 동작 방식 (bfcache vs HTTP 캐시)

**bfcache에서 사용하는 "캐시"는 "[HTTP 캐시](https://web.dev/http-cache/)"와 다르다.** **bfcache**는 메모리에 있는 전체 페이지의 스냅샷(JavaScript 힙 포함)인 반면, **HTTP 캐시**는 이전에 작성된 요청에 대한 응답만 포함한다. 페이지 로딩에 필요한 모든 리소스를 HTTP 캐시에서 찾을 확률은 희박하므로, bfcache 복원을 사용하는 것이 상대적으로 빠르다.

하지만 페이지의 스냅샷을 메모리에 저장하다 보니, 진행중인 코드를 잘 보존하기 위해 어느정도 **복잡도가 추가**된다. 

예를 들어, 페이지가 bfcache에 있는 동안 `setTimeout()` 호출의 완료 시간이 완료되면, 브라우저는 일시정지 중인 타이머 혹은 해결되지 않은 프로미스(Promise, 본질적으로는 **자바스크립트의 태스크 대기열의 모든 보류 중인 태스크**) **실행을 일시정지**하고, **페이지가 bfcache에서 복원될 때 다시 작업을 재개**한다.

타이머나 프로미스 같은 경우에는 복원하는 리스크가 거의 없지만, 인덱싱된 DB 트랜잭션 작업에 필요한 일부 작업을 일시 중지하면 다른 탭에 이미 열려있던 같은 사이트에 영향을 줄 수 있는 것과 같이 문제가 생길 수 있다. 그래서 브라우저는 일반적으로 인덱싱된 DB 트랜잭션 실행 도중 페이지를 캐시 하거나, 다른 페이지에 영향을 줄 수 있는 API를 사용하지 않으려고 한다.



## 4. bfcache를 관찰하는 APIs

bfcache는 브라우저가 자동으로 수행하지만, **자신의 페이지를 최적화**하거나 그에 따라 메트릭이나 성능 측정을 조정하려면 개발자는 **캐싱이 언제 일어나는지** 알아야 한다.

bfcache를 관찰하는 데 사용되는 주요 이벤트는 [페이지 전환 이벤트](https://developer.mozilla.org/en-US/docs/Web/API/PageTransitionEvent)(`pageshow`와 `pagehide`)로, bfcache가 현재 사용 중인 거의 모든 브라우저에서 지원되고 있다.

새로운 [페이지 라이프사이클](https://developers.google.com/web/updates/2018/07/page-lifecycle-api) 이벤트(`freeze` 와 `resume`)는 페이지가 bfcache에 들어가고 나갈 때뿐만 아니라, 다른 상황에서도 수행된다. 예를 들어, CPU 사용량을 최소화하기 위해 백그라운드 탭이 동결된 경우가 있다.



### 4.1. bfcache에서 페이지가 복원될 때 관찰

`pageshow` 이벤트는 `load` 이벤트 직후에 발생하며, 페이지가 처음 로드되거나 bfcache에서 페이지가 복원될 때마다 실행된다. `pageshow` 이벤트는 페이지가 bfcache에서 복원된 경우 `true`인 [`persisted`](https://developer.mozilla.org/en-US/docs/Web/API/PageTransitionEvent/persisted) 속성을 가지고 있다. (그렇지 않은 경우에는 `false`). `persisted` 속성을 사용해서 일반 페이지 로드와, bfcache 복원을 구분할 수 있다.

```jsx
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    console.log('bfcache로 복원된 페이지');
  } else {
    console.log('일반적으로 로드된 페이지');
  }
});
```

페이지 라이프사이클 API를 지원하는 브라우저에서는, bfcache에서 페이지가 복원될 때 `resume` 이벤트도 실행되지만(`pageshow` 이벤트 직전에), 사용자가 백그라운드에 정지되어있던 탭을 다시 방문할 때도 실행된다. 페이지 상태가 동결된 후 복원하려면(bfcache에 저장된 페이지 포함) `resume` 이벤트를 사용할 수 있지만, 사이트의 bfcache 적중률을 측정하려면 `pageshow` 이벤트를 사용해야 한다. 어떤 경우에는 둘 다 사용해야 할 수도 있다.



### 4.2. 페이지가 bfcache에 들어갈 때 관찰

`pagehide` 이벤트는 `pageshow` 이벤트의 반대되는 이벤트다. `pagehide` 이벤트는 페이지가 정상적으로 언로드(unload) 되거나 브라우저가 페이지를 bfcache에 저장하려고 할 때 발생한다.

`pagehide` 이벤트에도 `persisted` 속성이 있다. 그 값이 `false`라면 페이지는 bfcache에 들어가지 않는다. 하지만, `persisted` 속성이 `true`라고 해서 페이지가 항상 캐시되는 것은 아니다. 브라우저는 페이지를 캐시하려고 시도하지만, 페이지를 캐시할 수 없게 만드는 요인이 있을 수 있다는 뜻이다.

```jsx
window.addEventListener('pagehide', (event) => {
  if (event.persisted === true) {
    console.log('현재 페이지는 아마 bfcache에 들어감');
  } else {
    console.log('현재 페이지는 정상적으로 언로드되고 제거됨');
  }
});
```

`freeze`이벤트는 `pagehide`이벤트 직후에 발생한다(`persisted`가 `true`라면). 하지만, 마찬가지로 브라우저가 캐시에 저장 *하려고 시도* 한다는 뜻이다.



## 5. bfcache에 맞게 페이지 최적화

모든 페이지가 bfcache에 저장되는 것은 아니며, 페이지가 bfcache에 저장되더라도 그 페이지가 무한히 메모리에 남아있지 않는다. 캐시 적중률을 극대화하기 위해 어떤 페이지를 bfcache에 적합(혹은 부적합)하게 만들어야 하는지 알아야 한다.

위 내용에 대한 구체적인 것들은 이 [게시물](https://web.dev/bfcache/#bfcache-4)에서 확인할 수 있으며, 요약하면 다음과 같다.

- `unload` 이벤트 대신 `pagehide` 이벤트 사용
- `window.opener` 참조 대신 `window.postMessage()`를 사용
- 사용자가 다른 곳으로 이동하기 전에 항상 열려 있는 연결 닫기
- bfcache 복원 후에 오래되거나 민감한 데이터 업데이트



## 6. 페이지가 캐시 가능한지 테스트

Chrome의 DevTools에서 [Application → Back-forward Cache]에 들어가 테스트를 진행할 수 있고, 테스트에 성공하면 "Restored from back-forward cache" 라고 뜬다.

현재 Chrome에서는 페이지를 bfcache에 최대 3분 동안 유지할 수 있으며, 페이지에서 벗어나 뒤로가기 버튼을 클릭한 후 `pageshow` 이벤트의 `persisted` 속성이 `true`인지 확인하는 테스트([puppeteer](https://github.com/puppeteer/puppeteer)나 [WebDriver](https://www.w3.org/TR/webdriver/) 같은 도구를 이용하는 테스트)를 하기 위해서는 충분한 시간이 필요하다.



> 참고자료
>
> - https://web.dev/bfcache/