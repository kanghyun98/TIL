# Object를 이용한 State

이전까지는 state의 데이터를 **배열**을 이용해 관리했다.

배열을 이용한 경우, state의 데이터를 추가, 수정, 삭제하는데 `map()` 함수가 자주 사용된다. 

아래는 `map()`을 이용해 구현한 `handleUpdate()` 함수이다.

```jsx
// Array

const [data, setData] = useState([]);
...

const handleUpdate = (newData) => {
  const updatedData = data.map(item => {
      if(newData.id === item.id) {
          return newData;
      }
      return item;
  })
  setData(updatedData);
};
```

map 함수를 자세히 들여다보면, 배열 전체를 돌면서 id값이 같은 데이터를 찾는데 해당 데이터를 찾아도 무조건 배열의 끝까지 순환하게 된다. 이는 데이터의 용량이 커질수록 성능이 떨어지게 되는 주요 원인이다. : **O(n)**



그래서 사용하는 방법이 **Object**이다. Object key를 이용해 해당 데이터를 직접 가리킬 수 있다면 매번 배열 전체를 순환할 필요가 없어지게 되고, 바로 데이터에 접근할 수 있게된다. O(1)

object를 사용하기 위해서는 state를 배열처럼 사용했던 부분들을 모두 수정해주고, Object.keys()를 사용해 구현하면 된다.

(혹시 배열을 꼭 써야하는 상황이라면 find()를 이용해 해당 데이터를 찾으면 종료되게 만들 수 있다.)



위 배열을 이용해 구현했던 handleUpdate() 함수를 object를 이용해 재구현하면 아래와 같다.

```jsx
// Object

const [data, setData] = useState({});
...

const handleUpdate = (newData) => {
  const updatedData = {...data};
  updatedData[newData.id] = newData;
  setData(updatedData);
};
```

