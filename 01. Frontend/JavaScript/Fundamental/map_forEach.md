# map()과 forEach()의 차이점

map()과 forEach() 둘 다 배열 내부 데이터를 순회하면서 다룰 수 있는 배열 메소드이다. 하지만 차이점이 분명히 존재하기 때문에 따로 분리가 되어있는 것인데, 어떤 점에서 다른지 한 번 알아보려고 한다.

우선 같은 배열과 콜백 함수를 두 배열 메소드에 적용시켰을 때 결과가 어떻게 나오는지 확인해보자.

### map

```js
const mapArr = [1, 2, 3, 4, 5];
const changedMapArr = mapArr.map((num) => num + 1 );

// changedMapArr: [2, 3, 4, 5, 6]
// mapArr: [1, 2, 3, 4, 5]
```



### forEach

```js
const forEachArr = [1, 2, 3, 4, 5];
const changedForEachArr = forEachArr.forEach((num) => num + 1);

// changedForEachArr: undefined
// forEachArr: [1, 2, 3, 4, 5]
```

위의 실행 결과를 보면 동일한 콜백 함수를 두 배열 메소드에 적용시켰는데, **`map()`의 결과는 정상적으로 동작**했고, **`forEach()`의 결과는 `undefined`**가 나오며 의도대로 작동하지 않았다.



forEach()를 사용해 map의 결과처럼 나오길 원한다면, 아래와 같이 해주면 된다.

```js
const Arr = [1, 2, 3, 4, 5];
const newArr = [];

Arr.forEach((num) => newArr.push(num + 1));

// newArr: [2, 3, 4, 5, 6]
```



### 결론

위의 실행 결과를 통해서 return값의 유무가 두 메소드의 차이라는 것을 알 수 있다. 

왜 return값이 다르게 나오는지를 알기 위해서는 **두 메소드의 목적**을 알아야하므로,  MDN에 나와있는 둘의 정의를 확인해보았다.

> **`map()`** 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.

> **`forEach()`** 메서드는 주어진 함수를 배열 요소 각각에 대해 실행합니다.



정의를 보니 두 메소드의 목적이 명확해졌다. 

간단하게 이야기하자면, 기존의 배열 요소를 가지고 새로운 배열을 만들고 싶은 거라면 `map()`을 사용하면 되고, 새로운 배열을 만드는 것이 아닌, 배열 요소를 이용해 다른 처리를 하고 싶다면 `forEach()`를 사용하면 될 듯 하다.



### 보너스

정의를 보기위해 MDN을 들어가니, 두 메소드의 콜백함수와 관련해 새로운 점을 알게 되었다.

그동안은 `arr.map(num => num + 1)` 이런 식으로 콜백 함수에 인자를 한 개만 줄 수 있는줄 알았는데, 무려 세 가지나 줄 수 있다는 것이다.

*map과 forEach 메소드 두 가지 모두 동일하다.



아래 코드를 통해 확인해보자.

```js
const arr = [2, 5, 8, 9, 11]
arr.map((currentValue, index, array) => console.log(currentValue, index, array))

// 실행 결과
// 2 0 [2, 5, 8, 9, 11]
// 5 1 [2, 5, 8, 9, 11]
// 8 2 [2, 5, 8, 9, 11]
// 9 3 [2, 5, 8, 9, 11]
// 11 4 [2, 5, 8, 9, 11]
```

코드를 보면 알 수 있듯이, 콜백함수에 인자로 줄 수 있는 것이 **현재 요소, 인덱스, map()을 호출한 배열** 이렇게 세 가지가 있다. (현재 요소는 필수 값이고, 나머지 두 개는 옵션이다.)

(이 부분은 언제 쓰일지는 잘 모르겠지만 재밌어서 정리해봤다ㅎ)



map과 forEach를 공부하면서, 두 메소드의 개념에 대해 명확하게 이해할 수 있었고, 다른 것들도 목적에 맞게 잘 이해하고 사용하는지 확인해봐야겠다는 생각이 들었다.



참고 자료

- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

