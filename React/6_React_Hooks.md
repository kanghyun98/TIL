# React Hook

기존의 함수형 컴퍼넌트에서 state와 라이프사이클 메소드를 사용할 수 있게 만들어진 것.



## 목적

- functional programming
- class의 라이프사이클 메소드 코드의 중복 해결
- this 필요x
- class를 어려워하는 사람들



## 1. useState

```jsx
const [ 실제 state 값, state 업데이트 함수] = useState(초기값)
```

`state`, `setState` 대체



**클래스**는 한 번 만들어지면 멤버 변수들(render()가 아닌 것들)은 딱 한 번만 만들어짐.

대신, state가 변경 or props가 업데이트 될 때 render함수만 계속 반복해서 호출되는 것이다.



**함수**는 컴포넌트가 변경이 되면 코드블럭 전체가 반복해서 호출된다.

 이 state는 컴포넌트가 다시 렌더링 되어도 그대로 유지된다.

useState(초기값)가 초기화되지 않는 이유는 react가 알아서 자동으로 기억하기 때문이다.



## 2. useRef

```jsx
const 변수명 = useRef()

//선택하고 싶은 DOM에 ref값으로 설정, .current값이 원하는 DOM을 가리킴
```

`React.createRef` 대체

`React.createRef`를 함수형 컴퍼넌트에서 사용시 매번 호출할 때마다 새로운 레퍼런스를 만들게 된다.

useRef를 이용함으로써 한 번만 만들어 메모리에 저장 후, 재사용.



특정 DOM을 선택해야 하는 상황에 쓰임.



### useRef의 추가 기능

컴포넌트 안에서 조회 및 수정할 수 있는 변수 관리

이를 이용해 **id**, **외부 라이브러리를 이용한 인스턴스**, **scroll 위치** 등의 값을 관리할 수 있다.



 ex) useRef를 이용해 **새 항목에 사용할 고유 id** 관리

```
 const nextId = useRef(4);
 const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...

    nextId.current += 1;
  };
```



## 3. useEffect

마운트/언마운트/업데이트 시 할 작업 설정

`componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 를 결합한 것

→ 컴포넌트가 마운트 되었을 때, 언마운트되었을 때, 업데이트 될 때마다 호출된다.



첫번째 파라미터: **함수**

두번째 파라미터: **의존값이 들어있는 배열 (deps)** -> 비우면 컴포넌트가 처음 나타날때만 함수 실행

반환된 함수: **cleanup 함수**



#### 마운트 시에 하는 작업들

- `props` 로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 (REST API 등)
- 라이브러리 사용 (D3, Video.js 등...)
- setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

#### 언마운트 시에 하는 작업들

- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거



#### deps 에 특정 값 넣기

deps 에 특정 값을 넣게 된다면, 컴포넌트가 처음 마운트 될 때에도 호출이 되고, 지정한 값이 바뀔 때에도 호출이 됩니다. 그리고, deps 안에 특정 값이 있다면 언마운트시에도 호출이되고, 값이 바뀌기 직전에도 호출이 됩니다.

**`useEffect` 안에서 사용하는 상태나, props 가 있다면, `useEffect` 의 `deps` 에 넣어주어야한다.**



## 4. useCallBack

`useCallback` 은 props로 전달해주는 함수가 immutable한 함수인 경우 or 일부 값이 변경될 때만 업데이트 되야하는 경우 성능 최적화를 위해 사용된다.

함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭, `deps` 배열안에 포함시켜야 된다. (props 로 받아온 함수도 마찬가지)



### useCallback vs useMemo

- useCallback: Returns a [memoized](https://en.wikipedia.org/wiki/Memoization) callback.

- useMemo: Returns a [memoized](https://en.wikipedia.org/wiki/Memoization) value.

##### `useCallback(fn, deps)` = `useMemo(() => fn, deps)`



# 규칙

- 최상위(at the top level)에서만 Hook을 호출해야 한다. 반복문, 조건문, 중첩된 함수 내에서 Hook을 실행x
- React 함수 컴포넌트 내에서만 Hook을 호출해야 한다. 일반 Javascript 함수에서는 Hook을 호출x