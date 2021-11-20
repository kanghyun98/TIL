# Class

## 1. 개념

자바스크립트는 프로토타입 기반 객체지향 언어다. 그리고 프로토타입 기반 객체지향 언어는 클래스가 필요 없는 객체지향 프로그래밍 언어다. 

그럼에도 ES6에서 클래스 문법이 도입된 이유는 자바나 C#과 같은 클래스 기반 객체지향 프로그래밍에 익숙한 프로그래머가 쉽게 사용할 수 있도록 클래스 기반 객체지향 프로그래밍 언어와 매우 유사한 새로운 객체 생성 메커니즘을 제시한다. 클래스는 함수이며 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 문법적 설탕이라고 볼 수 있다.

추가적으로 클래스가 생성자 함수보다 엄격하며 생성자 함수에서 제공하지 않는 기능도 제공한다.



## 2. 정의

**클래스는 인스턴스를 생성하기 위한 생성자 함수다.**

클래스 몸체에는 0개 이상의 메서드만 정의할 수 있다. 정의 가능한 메서드 종류는 **constructor(생성자)**, **프로토타입 메서드**, **정적 메서드**의 세 가지가 있다.

클래스와 생성자 함수의 정의 방식을 비교해 보면 아래와 같다.

```javascript
// 생성자 함수
var Person = (function() {
	// 생성자 함수
    function Person(name) {
        this.name = name;
    }
    
    // 프로토타입 메서드
    Person.prototype.sayHi = function() {
        console.log('Hi!' + this.name);
    }
    
    // 정적 메서드
    Person.sayHello = function() {
        console.log('Hello');
    }
    
    // 생성자 함수 반환
    return Person;
}())
```



```javascript
// 클래스
class Person {
    // 생성자
    constructor(name) {
        this.name = name;
    }
    
    // 프로토타입 메서드
    sayHi() {
        console.log('Hi!' + this.name);
    }
    
    // 정적 메서드
    static sayHello() {
        console.log('Hello');
    }
}
```



## 3. 클래스 호이스팅

클래스 선언문으로 정의된 클래스는 함수 선언문과 같이 소스코드 평가 과정, 즉 런타임 이전에 먼저 평가되어 함수 객체를 생성한다. 이때 클래스가 평가되어 생성된 함수 객체는 생성자 함수로서 호출할 수 있는 함수, 즉 constructor다.

클래스는 클래스 정의 이전에 참조할 수 없다.(let, const 키워드로 선언한 변수처럼 호이스팅된다.)



## 4. 인스턴스 생성

클래스는 생성자 함수이며, new 연산자와 함께 호출되어 인스턴스를 생성한다.



## 5. 메서드

클래스 몸체에는 0개 이상의 메서드만 정의할 수 있다. 정의 가능한 메서드 종류는 **constructor(생성자)**, **프로토타입 메서드**, **정적 메서드**의 세 가지가 있다.

#### 클래스에서 정의한 메서드의 특징

- function 키워드를 생략한 메서드 축약 표현 사용
- 메서드 정의할 때 콤마 필요x
- 암묵적으로 strict mode로 실행
- for ... in 문이나 Object.keys 메서드 등으로 열거할 수 없다. (프로퍼티 어트리뷰트 [[Enumerable]]의 값 false)
- 내부 메서드 [[Construct]]를 갖지 않는 non-constructor다. 따라서 new 연산자와 함께 호출x



### 5.1 constructor

constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드이다. consturctor라는 이름은 변경할 수 없다.

```js
class Person {
    constructor(name) {
        this.name = name;
    }
}
```

constructor는 메서드로 해석되는 것이 아니라, 클래스가 평가되어 생성한 함수 객체 코드의 일부가 된다. (프로토타입의 constructor와 관련x, -> 이는 생성자 함수를 가리킴)

생성자 함수와의 차이점

- constructor는 클래스 내에 최대 한 개만 존재

- 생략할 수 있다. (생략 시 빈 constructor가 암묵적으로 정의, 이로 인해 빈 객체 생성)

- 프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 **this**에 인스턴스 프로퍼티를 추가한다.

- 인스턴스 생성 시 클래스 **외부에서 인스턴스 프로퍼티의 초기값을 전달**하려면 다음과 같이 constructor에 매개변수를 선언하고 인스턴스를 생성할 때 초기값을 전달한다.

  ```js
  class Person {
      constructor(name, address) {
          this.name = name;
          this.age = age;
      }
  }
  
  const me = new Person('Lee', 24);
  ```

- constructor는 별도의 반환문을 갖지 않아야 한다. (new 연산자와 함께 클래스가 호출되면 생성자 함수와 동일하게 암묵적으로 this<인스턴스>를 반환하기 때문, 명시적으로 객체 반환 시 암묵적인 this 반환 무시됨)



### 5.2 프로토타입 메서드

생성자 함수를 통해 인스턴스를 생성할 경우 프로토타입 메서드를 생성하기 위해선 명시적으로 프로토타입에 메서드를 추가해야 했다. 하지만 클래스 몸체에서 정의한 메서드는 클래스의 prototype 프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 된다.

```js
// 생성자 함수
function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = function() {	// 프로토타입 메서드
    console.log(`Hi! ${this.name}`);
}

const me = new Person('Lee');
me.sayHi();	// Hi! Lee
```

```js
// 클래스
class Person {
    // 생성자
    constructor(name) {
        this.name = name;
    }
    
    // 프로토타입 메서드
    sayHi() {
        console.log(`Hi! ${this.name}`);
    }
}
```

메서드 내부에서 인스턴스 프로퍼티를 참조할 필요가 있다면 this를 사용, 없다면 this를 사용하지 않게 된다.

이처럼 클래스 몸체에 정의한 메서드는 **인스턴스의 프로토타입에 존재하는 프로토타입 메서드**가 된다.

### 5.3 정적 메서드

인스턴스를 생성하지 않아도 호출할 수 있는 메서드 

- 클래스에서는 메서드에 **static 키워드**를 붙이면 정적 메서드가 된다.
- 정적 메서드는 **클래스에 바인딩된 메서드**가 된다.

- 정적 메서드는 인스턴스로 호출할 수 없다.

- 클래스 또는 생성자 함수를 하나의 네임스페이스로 사용하여 정적 메서드를 모아 놓으면 이름 충돌 가능성을 줄여주고 관련 함수들을 구조화할 수 있는 효과가 있다.

  -> 정적 메서드는 애플리케이션 전역에서 사용할 유틸리티 함수를 전역 함수로 정의하지 않고 메서드로 구조화할 때 유용하다.



## 6. 클래스의 인스턴스 생성 과정

1. 인스턴스 생성과 this 바인딩
   - constructor 내부 코드 실행 전 빈 객체(인스턴스) 생성, 인스턴스는 this에 바인딩된다.
   - constructor 내부의 this는 클래스가 생성한 인스턴스 가리킴
2. 인스턴스 초기화
   - constructor 내부 코드 실행, this에 바인딩되어 있는 인스턴스를 초기화. (프로퍼티 추가, constructor가 인수로 받은 초기값으로 초기화)
   - constructor 생략 시 이 과정 생략
3. 인스턴스 반환
   - 인스턴스가 바인딩된 this가 암묵적으로 반환



## 7. 프로퍼티

### 7.1 인스턴스 프로퍼티

인스턴스 프로퍼티는 constructor 내부에서 정의

ES6의 클랫는 다른 객체 지향처럼 private, public, protected 키워드와 같은 접근 제한자를 지원하지 않는다. 따라서 인스턴스 프로퍼티는 언제나 public하다.



### 7.2 접근자 프로퍼티

접근자 프로퍼티는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티다.

```js
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    // getter 함수
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    
    // setter 함수
    set fullName() {
        [this.firstName, this.lastName] = name.split(' ');
    }
}

const me = new Person('Kanghyun', 'Lee');

me.fullName = 'Taehyun Lee';	// setter 함수
console.log(me);	// {firstName: 'Taehyun', lastName: 'Lee'}

console.log(me.fullName);	// Taehyun Lee, getter 함수
```

getter와 setter 이름은 인스턴스 프로퍼티처럼 사용

- getter: 인스턴스 프로퍼티에 접근할 때마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용

- setter: 인스턴스 프로퍼티에 값을 할당할 때마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용



### 7.3 클래스 필드 정의 제안

**클래스 필드**: 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어

Java와 달리 Javascript는 클래스 몸체에는 메서드만 선언할 수 있다. 따라서 클래스 몸체에 자바와 유사하게 클래스 필드를 선언하면 문법 에러가 발생한다.

```js
class Person {
    name = 'Lee';	// 클래스 필드 정의, Syntax Error
}
```



하지만 최신 브라우저 또는 최신 Node.js에서는 새로운 표준 사양인 "Class field declarations"를 지원하여 정상 작동한다.

```js
class Person{
    name: 'Lee';	// 클래스 필드에 문자열을 할당

	getName = function() {	// 클래스 필드에 함수를 할당
        return this.name;
    }
}
```

- 함수를 클래스 필드에 할당할 수 있다.
- 이 함수는 프로토타입 메서드가 아닌 인스턴스 메서드가 된다. (모든 클래스 필드는 인스턴스 프로퍼티가 되기 때문)



### 7.4 private 필드 정의 제안

ES6의 클래스도 생성자 함수와 마찬가지로 private, public, protected 키워드와 같은 접근 제한자를 지원하지 않는다. 따라서 인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다. (언제나 public)

하지만 2021년 private 필드를 정의할 수 있는 새로운 표준 사양이 제안되어 있다.

- private 필드의 선두에는 #을 붙여준다. (private 필드를 참조할 때도 #을 붙여주어야 한다.)

- private 필드는 반드시 클래스 몸체에 정의 (constructor에 정의시 에러 발생)

  ```js
  class Person {
      // private 필드 정의
      #name = '';
      
      constructor(name) {
          // private 필드 참조
        	this.#name = name;
      }
  }
  
  const me = new Person('Lee');
  console.log(me.#name);	// Error, prviate 필드는 외부에서 참조 불가능
  ```

타입스크립트는 public, private, protected를 모두 지원한다.



### 7.5 static 필드 정의 제안

클래스에서 static 키워드를 사용하여 정적 메서드를 정의할 수 있다. 하지만 static 키워드를 사용해 정적 필드를 정의할 수 없었다.

static public/private 필드를 정의할 수 있는 새로운 표준 사양이 제안되었다.

```js
class MyMath {
    static PI = 22/7; 	// static public 필드 정의
	static #num = 10;	// static private 필드 정의
    static increment() {
        return ++MyMath.#num;	// static 메서드
    }
}
```



## 8. 상속에 의한 클래스 확장

### 8.1 클래스 상속과 생성자 함수 상속

상속에 의한 클래스 확장은 프로토타입 기반 상속과는 다른 개념이다.

- 프로토타입 기반 상속: 프로토타입 체인을 통해 다른 객체의 자산을 상속받는 개념
- **상속에 의한 클래스 확장: 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의**



클래스는 상속을 통해 기존 클래스를 확장할 수 있는 문법(extends 키워드)이 기본적으로 제공되지만 생성자 함수는 그렇지 않다.

```js
class Animal {
    constructor(age, weight) {
        this.age = age;
        this.weight = weight;
    }
    
    eat() { return 'eat'; }
    move() { return 'move'; }
}

// 상속을 통해 Animal 클래스를 확장한 Bird 클래스
class Bird extends Animal {
    fly() { return 'fly'; }
}

const bird = new Bird(1, 5);

console.log(bird);	// Bird {age: 1, weight: 5}
console.log(bird instanceof Bird);		// true
console.log(bird instanceof Animal);	// true

console.log(bird.eat());	// eat
console.log(bird.fly());	// fly
```



### 8.2 extends 키워드

상속을 통해 클래스를 확장하려면 extends 키워드를 사용하여 상속받을 클래스를 정의한다.

상속을 통해 확장된 클래스를 **서브클래스**(subclass, 자식 클래스)라 부르고, 서브클래스에게 상속된 클래스를 **수퍼클래스**(superclass, 부모 클래스)라 부른다.

**extends 키워드**의 역할은 수퍼클래스와 서브클래스 간의 상속 관계를 설정하는 것이다. 클래스도 프로토타입을 통해 상속 관계를 구현한다.

수퍼클래스와 서브클래스는 **인스턴스의 프로토타입 체인** 뿐만 아니라 **클래스 간의 프로토타입 체인**도 생성한다. 이를 통해 **프로토타입 메서드, 정적 메서드 모두 상속이 가능**하다.



### 8.3 동적 상속

extends 키워드는 클래스 뿐만 아니라 생성자 함수를 상속받아 클래스를 확장할 수도 있다. (extends 키워드 앞에는 반드시 클래스가 와야함)

```js
// 생성자 함수
function Base(a) {
    this.a = a;
}

// 생성자 함수를 상속받는 서브클래스
class Derived extends Base {}
```

extends 키워드 다음에는 클래스 뿐만 아니라, [[Construct]] 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있다. 이를 통해 동적으로 상속받은 대상을 결정할 수 있다.



### 8.4 서브클래스의 constructor

**클래스에서 constructor를 생략**하면 클래스에 다음과 같이 비어있는 constructor가 암묵적으로 정의된다.

```js
constructor() {}
```



**서브클래스에서 constructor를 생략**하면 클래스에 다음과 같은 constructor가 암묵적으로 정의된다. args는 new 연산자와 함께 클래스를 호출할 때 전달한 인수의 리스트이다.

```js
constructor(...args) {super(...args);}
```



**super()**는 수퍼클래스의 constructor를 호출하여 인스턴스를 생성한다.



### 8.5 super 키워드

super 키워드는 함수처럼 호출할 수도 있고, this와 같이 식별자처럼 참조할 수 있는 특수한 키워드이다.

- super를 **호출**: 수퍼클래스의 **constructor**를 호출한다.
- super를 **참조**: 수퍼클래스의 **메서드**를 호출할 수 있다.



#### super 호출

: 수퍼클래스의 constructor를 호출

수퍼클래스에서 추가한 프로퍼티와 서브클래스에서 추가한 프로퍼티를 갖는 인스턴스를 생성한다면 서브클래스의 constructor를 생략할 수 없다. 이때 new 연산자와 함께 서브클래스를 호출하면서 전달한 인수 중에서 수퍼클래스의 constructor에 전달할 필요가 있는 인수는 서브 클래스의 constructor에서 호출하는 super를 통해 전달한다.

- 서브클래스에서 constructor를 생략하지 않은 경우, 서브클래스의 constructor에서는 반드시 super를 호출
- 서브클래스의 constructor에서 **super를 호출하기 전에는 this를 참조할 수 없다**.
- super는 반드시 서브클래스의 constructor에서만 호출.

```js
// 수퍼클래스
class Base{
    constructor(a, b) {
        this.a = a;
        this.b = b;
    } 
}

// 서브클래스
class Derived extends Base {
    constructor(a, b, c) {
        super(a, b);	// 수퍼클래스의 constructor에 전달!
        this.c = c;
    }
}

const derived = new Derived(1, 2, 3);
console.log(derived);	// Derived {a: 1, b: 2, c: 3}
```



#### super 참조

: 수퍼클래스의 메서드를 호출

```js
// 수퍼클래스
class Base {
    constructor(name) {
        this.name = name;
    }
    
    sayHi() {
        return `Hi, ${this.name}`;
    }
}

// 서브클래스
class Derived extends Base {
    sayHi() {
        return `${super.sayHi()}. how are you doing?`;
    }
}
```

super는 자신을 참조하고 있는 메서드(Derived의 sayHi)가 바인딩되어 있는 객체(Derived.prototype)의 프로토타입(Base.prototype)을 가리킨다. 따라서 super.sayHi는 Base.prototype.sayHi를 가리킨다.



서브클래스의 정적 메서드 내에서 super.sayHi는 수퍼클래스의 정적 메서드 sayHi를 가리킨다.

```js
// 수퍼클래스
class Base {   
    static sayHi()  {
        return `Hi!`;
    }
}

// 서브클래스
class Derived extends Base {
    static sayHi() {
        return `${super.sayHi()}. how are you doing?`;
    }
}
```



### 8.6 상속 클래스의 인스턴스 생성 과정

1. 서브클래스의 super 호출
2. 수퍼클래스의 인스턴스 생성과 this 바인딩
3. 수퍼클래스의 인스턴스 초기화
4. 서브클래스의 constructor로의 복귀와 this 바인딩
5. 서브클래스의 인스턴스 초기화
6. 인스턴스 반환



### 8.7 표준 빌트인 생성자 함수 확장

extends 키워드 다음에는 클래스 뿐만 아니라, [[Construct]] 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있다. 그러므로 String, Number, Array 같은 표준 빌트인 객체도 extends 키워드를 사용하여 확장할 수 있다.

```js
// Array 생성자 함수를 상속받아 확장한 MyArray
class MyArray extends Array {
    // 중복 요소 제거 후 반환
    uniq() {
        return this.filter((v, i, self) => self.indexOf(v) === i)
    }
    
    // 평균
    average() {
        return this.reduce((pre, cur) => pre + cur, 0) / this.length;
    }
}

const myArray = new MyArray(1, 1, 2, 3);

console.log(myArray);	// MyArray(4) [1, 1, 2, 3]

console.log(myArray.uniq());	// MyArray(3) [1, 2, 3]
console.log(myArray.average());	// 1.75
```

 주의할 점은 Array.prototype의 메서드 중에서 map, filter와 같이 새로운 배열을 반환하는 메서드가 **MyArray 클래스의 인스턴스를 반환**한다는 것이다.

만약 새로운 배열을 반환하는 메서드가 MyArray 클래스의 인스턴스를 반환하지 않고 Array의 인스턴스를 반환하면 MyArray 클래스의 메서드와 메서드 체이닝이 불가능하다.

```js
console.log(myArray.filter(v => v % 2) instanceof MyArray);	// true

// 메서드 체이닝
console.log(myArray.filter(v => v % 2).uniq().avaerage());	// 2
```

