# JS Design Patterns

- 1~6: 생성 패턴
- 7~10: 구조 패턴
- 11~13: 행위 패턴

<br>

## 1. 생성자 패턴

- 생성자(constructor): 객체가 생성된 뒤 초기화하는데 사용되는 메서드
- 클래스 특징
  - 새 객체를 초기화하는 `constructor()` 라는 메서드 포함
  - `new` 키워드로 생성자 호출 가능
  - 생성자 내부에서 사용된 `this` 키워드는 새로 생성된 해당 객체를 가리킴



## 2. 모듈 패턴

- 모듈 패턴은 전통적인 소프트웨어 엔지니어링 분야에서 클래스의 캡슐화를 위해 처음 고안됨

  → 객체 리터럴을 이용한 방식

- 이제는 객체, 함수, 클래스, 변수 등을 다른 파일에 쉽게 내보내고 가져올 수 있다.

<br>

### 1. 비공개

- 모듈 패턴은 클로저를 활용해 '비공개' 상태와 구성을 캡슐화한다.
- 전역 스코프로의 유출 방지 및 다른 인터페이스와의 충돌 예방

```javascript
// CounterModule.js
let counter = 0;

export function incrementCounter() {
  counter++;
}

export function resetCounter() {
  counter = 0;
}

export function getCounter() {
  return counter;
}

export default { incrementCounter, resetCounter, getCounter };
```

```javascript
import CounterModule from './CounterModule.js';

console.log(CounterModule.counter); // error

console.log(CounterModule.getCounter()); // now you can get counter
```

<br>

### 2. 모듈 패턴 변형

- 믹스인 가져오기 변형
- 내보내기 변형
  - 이름을 지정해주지 않고 전역 스코프로 변수를 내보낼 수 있다.

<br>

### 3. 장단점

장점

- 코드의 유지부수가 용이
- 캡슐화
- 전역 스코프 오염 방지



단점

- unit test에서 비공개 멤버는 제외됨

<br>

### 추가

모듈과 파일의 분리

- 공통점
  - 대부분의 프로그래밍 언어에서 모듈은 하나의 파일로 구성
  - 파일 단위로 코드를 분리하는 것이 모듈화를 실현하는 주요 방법 중 하나
- 차이점
  - 파일 분리: 코드 관리를 위해 물리적으로 파일을 나누는 것
  - 모듈: **기능적으로 관련된 코드의 집합**으로, 프로그램의 특정 기능이나 로직을 캡슐화하기 위한 논리적 단위

<br>

## 3. 노출 모듈 패턴

- 모든 함수와 변수를 비공개 스코프에 정의
- 공개하고 싶은 부분만 포인터를 통해 비공개 요소에 접근할 수 있게 해주는 익명 객체를 반환

```javascript
let privateVar = 'Rob Dodson';
const publicVar = 'Hey there!';

const privateFunction = () => {
  console.log(`Name:${privateVar}`);
};

const publicSetName = strName => {
  privateVar = strName;
};

const publicGetName = () => {
  privateFunction();
};

// 비공개 함수, 속성에 접근하는 공개 포인터
const myRevealingModule = {
  setName: publicSetName,
  greeting: publicVar,
  getName: publicGetName,
};

export default myRevealingModule;
```

```javascript
import myRevealingModule from './modules/myRevealingModule.mjs';
  
myRevealingModule.setName('Matt Gaunt');
```

<br>

### 장단점

장점

- 코드의 일관성이 유지됨
- 모듈의 마지막 부분에서 명시적으로 반환 객체를 구성하여, 퍼블릭 인터페이스를 명확하게 정의

단점

- private 메서드를 참조하는 public 메서드를 수정하기 어려움
  - private 메서드의 모든 세부사항을 이해해야함
  - private 메서드 파라미터가 변경되는 경우, public 메서드의 호출 방식도 바뀌어야 하므로 전체 모듈에 영향을 미침
