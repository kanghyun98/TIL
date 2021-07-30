# Axios

API 호출 라이브러리



axios는 fetch 대체재

차이점:

- 이전 브라우저 버전과 호환
- JSON 변환 필요 x
- 가독성 up



### 설치

```
$ yarn add axios
```

axios를 이용해 GET, POST, PUT, DELETE 등의 메서드로 API 요청을 보낼 수 있다. 



### 사용

```
import axios from 'axios';
```



#### 1. GET

데이터 조회

```
axios.get(API 주소);
```



#### 2. POST

데이터 등록

```
axios.post(URI, {
  data
});
```



### useState 와 useEffect 로 데이터 로딩하기

`useState` 를 사용하여 요청 상태를 관리하고, `useEffect` 를 사용하여 컴포넌트가 렌더링되는 시점에 요청을 시작하는 작업



요청에 대한 상태를 관리 할 때에는 다음과 같이 총 3가지 상태를 관리

1. 요청의 결과
2. 로딩 상태
3. 에러

```jsx
const [users, setUsers] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setUsers(null);
          
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
          
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );
          
        setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
```



- `useEffect` 에 첫번째 파라미터로 등록하는 함수에는 `async` 를 사용 할 수 없기 때문에 함수 내부에서 `async` 를 사용하는 새로운 함수를 선언