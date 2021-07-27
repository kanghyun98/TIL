# DOM 이벤트

`addEventListener()` 를 활용해 이것저것 만들어봤었는데, 이 이벤트에 대한 더 깊은 이해가 더 좋은 성능과 나은 UX와 연결된다고 생각해 더 깊게 공부해보고자 한다.



## Bubble / Capture

html>body>div 순으로 tag 요소가 존재한다고 가정하자.

div 요소에 `addEventListener()` 를 사용하여 click 이벤트를 추가하고 div부분을 click 했는데 html, body에 있던 event까지 모두가 실행되었다. 왜그럴까?

이처럼 div를 클릭했을 때 부모 요소들의 이벤트까지 모두 발생하는 현상을 Bubble / Capture 라고 한다.



### Bubble과 Capture의 차이는 무엇일까?

'**이벤트가 발생하는 순서**'이다.

Bubble은 **propagate down**(div→body→html), Capture는 **propagate up**(html → body → div)

이를 이용해서 event를 미세하게 컨트롤하고, 다양한 기능들을 만들어낼 수 있으니 기억하자.



### Bubble과 Capture 변환 방법

**기본값: Bubble**

이벤트를 추가하는 함수의 argument를 보면, `addEventListener(type, listener, [, option(useCapture)])`로 되어있다.

세번째 argument에 true 값을 주면, 그 요소는 Capture를 사용하게 된다.



## DOM 이벤트 객체 메소드

- `e.stopPropagation()` : 내 이후로는 propagation 정지. (이전꺼는 진행)
- `e.preventDefault()` : 기본으로 실행되는 default logic 막기
- 

### 이벤트 객체 프로퍼티

- `e.target`, `e.currentTarget`

→`e.target`을 이용해 이벤트리스너를 줄일 수 있다.

Focus event, Form event에 대해서는 더 공부하자

event type인 focus, blur에 대해 알아두자.



참고 자료

- https://www.youtube.com/watch?v=7gKtNC3b_S8&t=1s