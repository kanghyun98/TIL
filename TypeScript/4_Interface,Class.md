# 1. 인터페이스

객체가 구현해야 하는 속성과 메서드를 정의해 사용자 타입을 만드는 방법

- 객체의 스펙(속성, 속성의 타입)
- 함수의 파라미터
- 함수의 스펙(파라미터, 반환 타입 등)
- 배열과 객체를 접근하는 방식
- 클래스



## 1.1 맛보기

```tsx
interface person {
  name: string;
  age: number;
}

function logPerson(obj: person) {
  console.log(obj.name, obj.age);
}

let you = {name: "Alex", age: 24};
logPerson(you);
```



## 1.2 옵션 속성

정의되어 있는 속성을 모두 사용할 필요가 없다. 옵션 속성은 `?`를 이용하면 된다.

```tsx
interface optionalPerson {
    name: string;
    age?: number;
}

function personName(my: optionalPerson) {
    console.log(my.name);
};

let myName = {name: "Alex"};
personName(myName);
```



## 1.3 읽기 전용 속성

처음 생성할 때만 값을 할당, 그 이후에 변경 불가능한 속성. `readonly` 이용

```tsx
interface Person {
  readonly name: string;
}

let Alex: Person = {
  name: 'Alex'
};
Alex.name = 'Tom'; // error!
```



## 1.4 함수 타입

함수의 타입을 정의할 때 사용 가능

```tsx
//함수의 인자의 타입과 반환 값의 타입 지정
interface login {
  (username: string, password: string): boolean;
}

let loginUser: login;
loginUser = function(id: string, pw: string) {
  console.log('로그인 했습니다');
  return true;
}
```



## 1.5 인덱싱 & 딕셔너리 패턴

```javascript
// 인덱싱
interface StringArray {
  [index: number]: string;
}

let arr: StringArray;
arr[0] = 'hi';
arr[1] = 10;	//error!

// 딕셔너리 패턴
interface StringRegexDictionary {
  [key: string]: RegExp
}

var obj: StringRegexDictionary = {
  sth: /abc/,
  cssFile: /\.css$/,
  jsFile: /\.css$/,
}
```



## 1.6 인터페이스 확장

```tsx
interface Person {
  name: string;
  age: number; // 옵셔널 선택자 ? 동일하게 적용 가능
}

interface Developer extends Person {
  language: string;
}

const joo: Developer = { name: 'Alex', age: 24, language: 'ts' };
```



# 2. 클래스

```typescript
class Person {
  private name: string;   // class 안에서만
  public age: number;     // class 밖에서도
  readonly log: string;   // 읽기 전용

  constructor(myName: string, myAge: number) {
    this.name = myName;
    this.age = myAge;
  }
}
const capt = new Person("Steve", 100);
```

