## React.memo

컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화



React.PureComponent를 대체

→ Component의 state, props에 변화가 없다면 render함수 부르지 않음.



virtual DOM을 통해 React에서 실제 변경되는 위치에 대한 값만 변경해주는데, 문제는 lifecycle 함수가 있을 경우이다. useEffect와 같은 lifecycle함수가 무거운 것을 다룬다면, component가 변경될 때마다 계속 업데이트되어 성능에 문제가 되기 때문에 memo를 이용해 실제 필요한 경우에만 업데이트 되도록 다루는 것이다. 

→ 이 뿐만 아니라, virtual DOM 자체도 업데이트 되지 않도록 방지할 수 있다.



Shallow Comparison을 기반으로 하기 때문에, 개발할 때 주의해야할 요소이다.

→ 동일한 ref를 참조하는 경우 업데이트가 되지 않는데, 오브젝트 깊숙한 곳의 데이터를 변경 시 ref는 변경되지 않는 것을 알고 있어야 한다.



**렌더링 최적화 하지 않을 컴포넌트에 React.memo 를 사용하는것은, 불필요한 props 비교만 하는 것이기 때문에 실제로 렌더링을 방지할수있는 상황이 있는 경우에만 사용**



### 방법

```jsx
export default React.memo(CreateUser);
```



React Hook의 useMemo, useCallback과 유사한 기능?