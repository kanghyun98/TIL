# 배열 항목 관리

## 1. 추가

### 1)  spread 연산자

```jsx
  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]);

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };
```



### 2) concat 함수

```jsx
  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };
```



## 2. 제거

onRemove "id 가 __인 객체를 삭제해라"

```jsx
  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id));
    
      // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
  };
```



## 3. 수정

1.추가 와 유사하다.

```jsx
const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };
```

