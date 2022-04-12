## 기본 개념

### FE 상태관리

**상태**: **주어진 시간**에 대해 시스템을 나타내는 것으로 언제든지 변경될 수 있는 것 → 저장된 데이터!

React Query는 Server State를 관리하는 라이브러리

React 프로젝트에서 Server와 Client 사이 비동기 로직들을 손쉽게 다루게 해주는 도구



### Server-State과 Client-State의 구분

#### **Client State**

- Client에서 소유하며 온전히 제어가능함
- 초기값 설정이나 조작에 제약사항 없음
- 다른 사람들과 공유되지 않으며, Client 내에서 UI/UX 흐름이나 사용자 인터렉션에 따라 변할 수 있음
- 항상 Client 내에서 최신 상태로 관리됨
- ex) 리액트 컴포넌트의 state, 동기적으로 저장되는 redux store의 데이터

#### **Server State**

- Client에서 제어하거나 소유되지 않고, 원격의 공간에서 관리되고 유지됨
- Fetching/Updating에 비동기 API가 필요
- 다른 사람들과 공유되는 것으로, 사용자가 모르는 사이에 변경될 수 있음
- 신경쓰지 않는다면 잠재적으로 “out of date”가 될 가능성을 지님
- ex) 리액트 앱에서는 비동기 요청으로 받아올 수 있는, 백엔드 DB에 저장되어있는 데이터



### React Query

**fetching**, **caching**, **synchronizing** and **updating** server state in your React applications a breeze.

```jsx
// 기본 예제

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
    fetch('<https://api.github.com/repos/tannerlinsley/react-query>').then(
      (res) => res.json()
    )
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```



## Core Concept

### 1. Queries

→ Data Fetching을 위해 존재 (CRUD 중 Reading에만 사용)

```jsx
import { useQuery } from 'react-query';

function App() {
	const info = useQuery('todos', fetchTodoList, options);  // (Query Key, Query Function, Options)
}
```

- **Query Key**: React Query는 Query Key에 따라 query caching을 관리한다.

  - String 형태: 위 예제처럼 하나의 문자열로 키 관리
  - **Array 형태**: 키 값을 배열 형태로 관리하는 것으로, 페이지나 옵션같은 것을 관리할 때 사용 가능 (컨벤션을 위해서 사용하기도 함)

  → 선언형 방식으로 쿼리를 만들고, 변수명을 쿼리키로 사용하는 것도 방법!

- **Query Function**: Promise를 반환하는 함수 (데이터 resolve or Error를 throw하는 **fetch, axios** 등)

- **Options**: 객체형태의 옵션값들을 설정해줄 수 있다. (아래에 자세히 나옴)



#### useQuery 반환값

엄청 많으니 핵심 요소만 파악해보자

| 요소                                    | 설명                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| data                                    | 마지막으로 성공한 resolved된 데이터 (Response)               |
| error                                   | 에러가 발생했을 때 반환되는 객체                             |
| isFetching                              | Request가 in-flight 중일 때 true                             |
| status, isLoading, isSuccess, isLoading | 모두 현재 query의 상태                                       |
| refetch                                 | 해당 query refetch하는 함수 제공 (자동으로 해주지만, 새로고침 버튼이나 이벤트 발생했을 때 추가하고 싶을 때 사용) |
| remove                                  | 해당 query cache에서 지우는 함수 제공                        |



#### useQuery Options

```jsx
useQuery('fetchOrder', () => fetchOrder(orderNo), options);
```

설정해줄 수 있는 옵션들이 매우 많으니 핵심 요소만 파악해보자

| 요소                          | 설명                                         |
| ----------------------------- | -------------------------------------------- |
| onSuccess, onError, onSettled | 성공/실패/완료 시 실행할 Side Effect 정의    |
| enabled                       | 자동으로 query를 실행시킬지 말지 여부        |
| retry                         | query 동작 실패 시, 자동으로 retry 할지 여부 |
| select                        | 성공 시 가져온 data를 가공해서 전달          |
| keepPreviousData              | 새롭게 fetching 시 이전 데이터 유지 여부     |
| refetchInterval               | 주기적으로 refetch할지 결정하는 옵션         |

반환값과 옵션들에 대해 더 알아보고 싶다면 [공식문서](https://react-query.tanstack.com/reference/useQuery)를 참고하자.



#### 관리 방법

컴포넌트에 넣어주는 방법도 있는데, 관리가 힘드니 queries 파일을 따로 빼서 도메인 별로 묶어서 관리하는 방법도 가능하다..!



#### query가 여러 개인 경우

query가 여러개인 경우에도 알아서 잘 동작한다!

하지만 렌더링이 거듭되는 사이사이에 계속 쿼리가 수행되어야하면 쿼리를 수행하는 로직이 hook룰에 위배될 수 있는데, 이때 `useQueries` 를 사용하면 된다.



#### 상황별 해결 방법

1. 마운트 시에는 데이터가 패치되지 않고, 버튼을 클릭했을 때 데이터를 패치 받아오는 방법

   → enabled를 false로 두고 이벤트 핸들러에서 refetch()로 메뉴얼하게 패치

   → 위 방법이 안된다면, enabled 옵션에 해당하는 상태를 useState로 컴포넌트 내에 두고, 이벤트 핸들러에서 상태 값을 변경하여 enabled를 조건부로 만족시켜 패치

2. useQuery로 불러온 server state를 Redux와 같은 전역 상태 관리 라이브러리에서 참조(dispatch)하는 방법

   → onSuccess에서 dispatch해주면 좋을 것 같다. (사실 dependency가 생기지 않는게 베스트..!)



### Mutations

→ Data Fetching을 위해 존재 (CRUD 중 Create/Update/Delete에 모두 사용)

useQuery보다 심플하게 Promise 반환 함수만 있어도 된다!

(devtools를 사용하길 원하면 Query Key 넣어줘야함)

```jsx
const mutation = useMutation(newTodo => {
	return axios.post('/todos', newTodo);
});
```



#### useMutation 반환값

useQuery랑 비슷(오히려 더 적다)

(data, error, status, isLoading, isSuccess, isLoading은 동일)

| 요소        | 설명                             |
| ----------- | -------------------------------- |
| mutate      | mutation을 실행하는 함수         |
| mutateAsync | mutate와 비슷하나 Promise를 반환 |
| reset       | mutation 내부 상태 clean         |

**mutation은 query와 다르게 자동으로 실행되지 않는다!**



#### useMutation 옵션

나머지는 다 useQuery랑 비슷

| 요소     | 설명                                                         |
| -------- | ------------------------------------------------------------ |
| onMutate | 본격적인 Mutation 동작 전에 먼저 동작하는 함수, Optimistic update 적용할 때 유용 |

- Optimistic update: 요청이 성공할 것이라고 보고, UI에 반영하는 방식 (실패 시 rollback 가능)



### Query Invalidation

→ queryClient를 통해 invalidate 메소드 호출하여, 해당 키를 가진 query는 stale 취급되고, 현재 rendering되고 있는 query들은 백그라운드에서 refetch 된다.

```jsx
// Invalidate every query in the cache
queryClient.invalidateQueries();

// Invalidate every query with a key
queryClient.invalidateQueries('todos');
```



#### 예시

```jsx
function Example() {
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation(
    (newTodo) => axios.post('/api/data', { text: newTodo }),
    {
      onMutate: async (newTodo: string) => {
        // ...
        const previousTodos = queryClient.getQueryData < Todos > 'todos';

        if (previousTodos) {
          queryClient.setQueryData <
            Todos >
            ('todos',
            {
              // ...
            });
        }
        // ...
      },
      // ...
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );
  // ...
}
```

→ Create, Update, Delete와 같이 Mutation 요청 시 서버에 값이 변하므로 React Query에 들고 있는 Server State는 낡은(stale) 데이터가 된다. 이때 QueryClient에서 제공하는 `invalidation` 메서드들을 사용한다면 해당 Key를 들고 있는 Query들이 refetch가 발생하게 할 수 있다.



## Cache, Synchronization

### Cache

react-query는 RFC 5861의 “stale-while-revalidate” 아이디어를 차용했다.

→ Latency 숨기는게 가능해짐

- stale-while-revalidate: 백그라운드에서 stale response를 revalidate하는 동안 캐시가 가진 stale response를 반환

ex) 1시간 마다 광고 바뀔 수 있도록



#### 적용 방법

: 옵션에서 설정해주면 된다!

- **cacheTime**: 메모리에 얼마만큼 있을건지 (default: 5min)
- **staleTime**: 얼마의 시간이 흐른 후에 데이터를 stale 취급할건지 (default: 0)
- **refetchOnMount/refetchOnWindowFocuis/refetchOnReconnect**: true면 Mount/window focus/reconnect 시점에 data가 stale이라고 판단되면 모두 refetch (default: true)

→ staleTime을 한 10초로 짧게 줘서, SSR할 때 서버에서 미리 패치된 상태를 넘겨줄 때 클라이언트에서 바로 또 fetching하지 않게 만들 수 있다.



#### 상태 흐름

![image](<https://user-images.githubusercontent.com/70627979/162922535-e934e3cf-66fa-4aa1-9127-166577002036.png>)



#### 추가 설정 안했을 경우

- Quries에서 cached data는 언제나 stale 취급
- 각 시점에서 data가 stale이라면 항상 refetch 발생
- inActive Query들은 5분 뒤 GC에 의해 처리
- Query 실패 시, 3번까지 retry 발생



### 전역상태처럼 관리되는 데이터

Server State들을 전역상태처럼 관리하는 방법

→ QueryClient 내부적으로 Context를 사용한다.

![image](<https://user-images.githubusercontent.com/70627979/162924393-8fdcb39f-72e8-401e-92d3-c7cfb8c553f9.png>)



## 문제점

- Component가 상대적으로 비대해짐 (→ Component 설계/분리에 대한 고민 필요)
- 난이도 높아진 프로젝트 설계 (→ Component 유착 최소화 및 사용처 파악 필요)





참고 자료

- [공식 문서](https://react-query.tanstack.com/overview)
- [React Query와 상태관리 :: 2월 우아한테크세미나](https://youtu.be/MArE6Hy371c)