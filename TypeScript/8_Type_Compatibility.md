## 1. 타입 호환 (Type Compatibility)

타입스크립트 코드에서 특정 타입이 다른 타입에 잘 맞는지를 의미

- 내부적으로 존재하는 속성과 타입에 대한 정의들에 대해서 비교한다.
-  기본적으로 자바스크립트는 객체 리터럴이나 익명 함수 등을 사용하기 때문에 명시적으로 타입을 지정하는 것보다는 코드의 구조 관점에서 타입을 지정하는 것이 더 잘 어울린다. 



### 구조적 타이핑

구조적 타이핑(structural typing)이란 코드 구조 관점에서 타입이 서로 호환되는지의 여부를 판단하는 것

일반적으로 구조가 작은게 왼쪽에 와야하나, 함수를 비교할 때는 반대이다.

(함수의 파라미터는 작은게  왼쪽에 와야한다.)

#### 1.1 클래스

```typescript
// 구조적으로 작은게 왼쪽에 와야함

// class
interface Ironman {
  name: string;
}

class Avengers {
  name: string;
}

let i: Ironman;
i = new Avengers(); // OK, because of structural typing
```



#### 1.2 함수 호출

```ts
// function 호출
interface Avengers {
  name: string;
}

let hero: Avengers;
// 타입스크립트가 추론한 y의 타입은 { name: string; location: string; } 입니다.
let capt = { name: "Captain", location: "Pangyo" };
hero = capt;	//ok!

function assemble(a: Avengers) {
  console.log("어벤져스 모여라", a.name);
}

assemble(capt);	//ok!
```



#### 1.3 함수 비교

```tsx
// function 비교
const add = function(a: number) {
    // ...
}

const sum = function(a: number, b:number){	// sum 함수 구조 > add 함수 구조
    // ...
}

sum = add;	//ok
add = sum;	//error!
```



#### 1.4 제네릭

```ts
// Generic
// 내부값 x
interface Empty<T> {
    // ...
}
const empty1: Empty<string>;
const empty2: Empty<number>;
empty1 = empty2;	//ok
empty2 = empty1;	//ok

//내부값 o
interface NotEmpty<T> {
	data: T;
}
const notempty1: NotEmpty<string>;
const notempty2: NotEmpty<number>;
notempty1 = notempty2;	//error!
notempty2 = notempty1;	//error!
```

