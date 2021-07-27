# this

this는 실행 컨텍스트가 생성될 때 함께 결정된다.

→ 함수를 호출할 때 결정된다.

→ 어떤 방식으로 함수를 호출하느냐에 따라 값이 달라진다.



## 1. 전역 공간에서의 this

브라우저 환경: **전역 객체 window**

Node.js 환경: **global**



## 2. 메서드로 호출할 때 그 내부에서의 this

어떤 함수의 객체를 프로퍼티에 할당한다고 해서 그 자체로서 무조건 메소드가 되는 것이 아닌, **객체의 메서드로서** 호출한 경우에만 메서드로 동작, 그렇지 않으면 함수로 동작.

**함수**로서 호출 (함수를 변수에 담아 호출한 경우): **전역 객체 window**

**메서드**로서 호출 (객체의 프로퍼티에 할당해서 호출한 경우): **호출한 주체에 대한 정보**

```javascript
const func = function(x) {
	console.log(this, x);
};

//함수로서 호출
func(1);        // Window {...} 1

//메소드로서 호출
const obj = {
	method: func

};
obj.method(2);  // {method: f} 2
```



### 2.1 메서드의 내부 함수에서의 this 우회

1. this를 **변수**에 할당

```javascript
const obj = {
	outer: function() {
		const innerFunc1 = function() {
			console.log(this);
			};
		innerFunc1();
		
		let self = this;      // this를 self 변수에 상속받음
		const innerFunc2 = function() {
			console.log(self);
		};
		innerFunc2();
	}
};
obj.outer();
```

1. arrow function 사용

arrow function은 실행 컨텍스트를 생성할 때 **this 바인딩 과정을 생략**, 상위 스코프의 this를 그대로 활용 가능



## 3. 콜백 함수 호출 시 그 함수 내부에서의 this

콜백 함수의 제어권을 가지는 함수(메서드)가 콜백 함수에서의 this를 무엇으로 할지 정함

```javascript
// 전역 객체 window {...}
setTimeout(function() {console.log(this);}, 300);

// 앞서 지정한 Element
document.body.innerHTML += '<button id="a">클릭</button>';
document.bodyquerySelector('#a')
	.addEventListener('click', function(e) {
		console.log(this, e);
	});
```



## 4. 생성자 함수 내부에서의 this

어떤 함수가 생성자 함수로서 호출된 경우, **내부에서의 this**는 **새로 만들어진 인스턴스 자신**

new 명렁어와 함께 생성자 함수를 호출하면, 우선 생성자의 prototype 프로퍼티를 참조하는__proto__라는 프로퍼티가 있는 **객체(인스턴스)**를 만들고, **미리 준비된 공통 속성 및 개성을 해당 객체(this)에 부여**

```javascript
const Cat = function (name, age) {
	this.bark = '야옹';
	this.name = name;
	this.age = age;
};

const choco = new Cat('초코', 6);
const nabi = new Cat('나비', 4);
console.log(choco, nabi);

// Cat { bark: '야옹', name: '초코', age: 6}    //this: choco 인스턴스
// Cat { bark: '야옹', name: '나비', age: 4}    //this: nabi 인스턴스
```