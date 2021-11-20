# 타입 별칭, 추론, 단언, 가드

## 1. 타입 별칭 (Type Aliases)

- 특정 타입이나 인터페이스를 참조할 수 있는 타입 변수를 의미

- 공용체 타입(Union)을 사용할 경우 유용

```ts
// string 타입을 사용할 때
const name: string = 'capt';

// 타입 별칭을 사용할 때
type MyName = string;
const name: MyName = 'capt';

// 공용체 타입
type StringOrNumber = string | number;

function addWithAlias(arg1: StringOrNumber, arg2: StringOrNumber) {
  return arg1.toString() + arg2.toString();
}
```



인터페이스에서도 사용 가능하다.

```typescript
// interface Person {
// 	 name: string;
// 	 age: number
// }

type Person = {
    name: string;
    age: number;
}

const seho: Person = {
    name: "세호",
    age: 30
}
```

#### 1.1 인터페이스와 타입 별칭의 차이점

- 인터페이스는 타입을 `interface` 라고만 제공하는 반면, 타입 별칭은 타입 안까지 구체적으로 보여줘 **가독성**이 올라간다.
- 타입 별칭은 **확장이 불가능**하다. -> 이러한 이유로 타입스크립트 공식 문서에서 타입 별칭보다  `interface`를 추천해줌.



## 2. 타입 추론(Type Inference)

### 2.1 타입 추론 기본

- TypeScript 는 타입을 명시적으로 선언하지 않아도 변수, 함수를 선언할 때 할당된 값을 바탕으로 어떤 타입으로 선언 되었는지 추론한다.
- 구문으로 변수 타입을 지정하지 않으면 TypeScript는 첫 번째 할당되는 타입을 기준으로 변수 타입을 추론한다.

- 변수, 속성, 인자의 기본 값, 함수의 반환 값 등을 설정할 때 타입 추론이 일어난다.



아래와 같이 따로 타입을 따로 지정하지 않아도 x는 number로 간주된다.

```ts
let x = 24;		//type: number
```

 

### 2.2 Best Common Type 추론 방식

타입은 보통 몇 개의 표현식(코드)을 바탕으로 타입을 추론하고, 표현식을 이용해 가장 근접한 타입을 추론하는데, 가장 근접한 타입을 **Best Common Type**라고 하고, 이를 Best Common Type 알고리즘으로 찾는다.



## 3. 타입 단언 (Type Assertion)

타입스크립트의 추론에 의해 타입이 지정되는 것이 아닌, 사용자가 정확하게 알고 있는 것에 정의해주는 것.

```ts
let a;	// a: any
a = 20;
a = 'a';
let b = a	// b: any -> 오잉 string이 아니네? 타입 단언이 필요함
let b = a as string;	// this is type assertion
```

```ts
// strict모드에서 null에 대한 타입 단언
abc = document.querySelector('.test');	// abc: null | Element
abc.appendChild(test2);		// object is possibly 'null'

abc!.appendChild(test2);	// !.를 붙여주어 null이 아니라는 것을 알려준다.
```



#### **DOM API** 조작 시에 많이 쓰인다.

```typescript
<div id="app">hello</div>

let div = document.querySelector("div")	// HTMLDivElement | null
div.innerText;	// error! (Object is possibly 'null')

let div = document.querySelector("div") as HTMLDivElement
div.innerText;	// ok

```

type assertion의 경우 위험한 점이 있어 사용 시 주의해야 한다.



## 4. 타입 가드 (Type Guard)

아래 예시를 먼저 봐보자.

```ts
interface Developer {
    name: string;
    skill: string;
}

interface Person {
    name: string;
    age: number;
}

function introduce(): Developer | Person {
    return {name: 'Alex', age: 24, skill: 'Iron Making'}
}

const alex = introduce();
console.log(alex.skill);	//error!
```

변수 `alex`의 skill을 보고 싶은데, 오류가 뜬다. union으로 타입을 정의했는데, 왜 그럴까?

자세히 들여다보면, `introduce()`의 실행 결과 값이 저장된 `alex` 의 타입이 `Developer | Person`으로 되어있는데, 유니온 타입의 경우 공통된 속성에만 접근할 수 있는 특징을 갖기 때문이다.

타입 가드 없이 `alex`의 `skill`과 `age` 에 접근하기 위해서는 if문과 타입 단언(as)를 사용해 복잡한 코드를 만들어야 한다. 

**타입 가드**를 사용하면 간단하게 접근할 수 있다.

```ts
const alex = introduce();

// 타입 가드x (단언 이용해서 구현)
if((alex as Developer).skill) {
    const skill = (alex as Developer).skill;
    console.log(skill);
}else if((alex as Person).age) {
    const age = (alex as Person).age;
    console.log(age);
}

// 타입 가드 정의
function isDeveloper(target: Developer | Person): target is Developer {
    return (target as Developer).skill !== undefined;
}	// 파라미터 target을 Developer로 단언하고, target.skill이 있으면 true, target은 Developer가 된다.

if (isDeveloper(alex)) {
    console.log(alex.skill);
} else {
    console.log(alex.age);
}
```

