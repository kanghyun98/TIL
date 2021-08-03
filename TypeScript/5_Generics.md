# 제네릭(Generics)

**제네릭이란 타입을 마치 함수의 파라미터처럼 사용하는 것**

**비동기** 코드에서 자주 쓰인다.

## 1 기본

### 1.1 왜 필요할까?

- 모든 타입의 객체를 다루면서 **객체 타입 무결성**을 유지하는 방법

- **재사용성**이 높은 컴포넌트를 만들 때 자주 활용되는 특징. (**여러 가지 타입**에서 동작하는 컴포넌트에서 유용함)

-> 기존 타입 정의 방식을 제네릭처럼 사용하기 위해서는 **함수를 중복선언**하거나, **유니온 타입**을 이용해야 한다. 

(가독성과 코드의 양이 늘어나고, 유니온 타입의 경우 return값도 유니온 특성을 갖게되어 제네릭을 사용하는 것이 좋다.)



### 1.2 사용법

함수를 정의할 때 `<T>` 를 붙이고, 파라미터나 리턴값에 타입을 `T` 로 줌으로써 사용할 수 있다.

함수를 사용할 때 `<T>` 위치에 원하는 타입의 종류를 할당함으로써 모든  `T`  가 해당 타입으로 적용된다.

```typescript
function getText<T>(text: T): T {
  return text;
}

getText<string>('hi');
getText<number>(10);
getText<boolean>(true);
```



## 2. 인터페이스에 제네릭 선언

일반 제네릭 선언과 유사하다.

```typescript
interface Developer<T> {
  name: string;
  age: T;
}
const tony: Developer<number> = { name: 'tony', age: 100 };
```



## 3. 제네릭 타입 제한

### 3.1 구체적인 타입으로 제한

아래와 같은 경우 오류가 뜨게된다.

```typescript
function logText<T>(text: T): T {
  console.log(text.length); // Error: T doesn't have .length
  return text;
}
```

오류가 뜨는 이유는 text에 어떤 타입이 올지 모르기 때문에, `.length` 라는 특정 타입에서 사용 가능한 메소드를 사용할 수 없는 것이다.



이러한 문제는 **제네릭에 타입을 주어** 해결할 수 있다.

```ts
function logText<T>(text: T[]): T[] {
  console.log(text.length); // 제네릭 타입이 배열이기 때문에 `length`를 허용합니다.
  return text;
}
```

물론 위와 같은 경우 배열을 인자로 받아야하는 조건이 생기지만, `.length`를 사용할 수 있게 되었다.



### 3.2 정의된 타입으로 제한

`extends` 를 이용해 제네릭을 사용하면 위와 같이 `.length` 를 사용할 수 있다.

```ts
interface LengthType {
	length: number;
}

function logTextLength<T extends LengthType>(text: T): T {
	text.length;
	return text;
}

logTextLength('asdf');	//string
logTextLength({ length: 10 });	//object
logTextLength(10);		// error!
```



### 3.3 `keyof`로 제한

`extends`와 `keyof`를 사용해 함수의 파라미터(인자)가 정의된 값들로만 주어질 수 있다.

```ts
function getProperty<T, O extends keyof T>(obj: T, key: O) {
  return obj[key];  
}
let obj = { a: 1, b: 2, c: 3 };

getProperty(obj, "a"); // okay
getProperty(obj, "z"); // error: "z"는 "a", "b", "c" 속성에 해당하지 않는다.
```



## 4. 비동기

### 4.1 Promise 반환

- 비동기적으로 구현되어서 타입 추론이 되지 않는다.

- Promise 자체 타입이 제네릭을 받게끔 구현이 되어있다.

Promise를 통해 return되는 값의 타입을 정의해주고, 이를 Promise의 제네릭 값에 추가해준다.

```ts
function fetchItems(): Promise<string[]> {
	let items: string[] = ['a', 'b', 'c'];
	return new Promise(function (resolve) {
	resolve(items);
	});
}
```

