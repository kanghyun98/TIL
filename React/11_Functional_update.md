# 함수형 업데이트

deps에 변수가 들어가있어 전체가 계속 업데이트 되는 경우 성능이 떨어질 수 있는데, 이런 경우, 함수형 업데이트를 통해 최적화시킬 수 있다.

```
setData(prevData => prevData + 1)
```



```jsx
const [users, setUsers] = useState( ... )

const onToggle = useCallback(id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  },
  [users]
);
```



> **`setUsers` 에 등록하는 콜백함수의 파라미터에서 최신 `users` 를 참조 할 수 있기 때문에 `deps` 에 `users` 를 넣지 않아도 된다.**

```
const [users, setUsers] = useState( ... )

const onToggle = useCallback(id => {
    setUsers(users =>
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);
```



