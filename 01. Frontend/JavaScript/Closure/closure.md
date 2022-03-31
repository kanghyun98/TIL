# Closure

'코어 자바스크립트'의 CHAPTER 5 정리



## 클로저의 정의와 의미



### MDN의 Closure 정의

A closure is the combination of a function and the lexical environment within which that function was declared.

클로저는 함수와 그 함수가 선언될 당시의 `LexicalEnvironment`(그 중 `outerEnvironmentReference`)의 상호관계에 따른 현상



### 간단한 예제

```jsx
const outer = function () {
	let a = 1;
	const inner = function () {
		return ++a;
	}
	return inner;  // inner 함수 자체 반환
};
let outer2 = outer();
console.log(outer2());  // 2
console.log(outer2());  // 3
```

inner 함수의 실행 시점에는 outer 함수는 이미 실행이 종료된 상태인데 outer 함수의 `LexicalEnvironment` 에 어떻게 접근할 수 있을까?

→ **가비지 컬렉터는 어떤 값을 참조하는 변수가 하나라도 있다면 그 값은 수집 대상에 포함시키지 않음.**

이를 바탕으로 클로저를 재정의하면, **어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우, A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상이다.**



## 클로저와 메모리 관리

메모리 소모는 클로저의 본질적인 특성이다. 메모리 소모에 대한 관리법을 잘 파악해서 적용하면 문제 없다.

**참조 카운트를 0으로 만들면** GC(Garbage Collector)가 수거해가는데, 참조 카운트를 0으로 만드는 방법은 무엇이 있을까?

**→ 식별자에 참조형이 아닌 기본형 데이터(보통 null이나 undefined)를 할당하면 된다.**



### 간단한 예제

```jsx
(function () {
	let a = 0;
	let intervalID = null;
	let inner = function () {
		if (++a >= 10) { 
			clearInterval(intervalID);
			inner = null;   // inner 식별자의 함수 참조를 끊음
		}
		console.log(a);
	};
	intervalID = setInterval(inner, 1000);
})();
```



## 클로저 활용 사례

### 1. 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때

```jsx
//대표적인 콜백 함수 중 하나인 EventListener()
const fruits = ['apple', 'banana', 'peach'];
//...

fruit.forEach( (fruit) => {  
	//...
	$li.addEventListener('click', () => {
		alert('your choice is' + fruit)   // fruit: 외부 데이터
	});
	//...
});
```



### 2. 접근 권한 제어 (정보 은닉)

**정보 은닉은 어떤 모듈의 내부 로직에 대해 외부로의 노출을 최소화해서 모듈간의 결합도를 낮추고 유연성을 높이고자** 하는 현대 프로그래밍 언어의 중요한 개념 중 하나이다. 접근 권한에는 public, private, protected의 세 종류가 있다.

클로저를 이용하여 함수 차원에서 public한 값과 private한 값을 구분하는 것이 가능하다.

위 예제를 다시 가져와서 보면,

```jsx
const outer = function () {
	let a = 1;
	const inner = function () {
		return ++a;
	}
	return inner;  // inner 함수 자체 반환
};
let outer2 = outer();
outer2.a = 3;           // 작동 x
console.log(outer2());  // 2
console.log(outer2());  // 3
```

외부 공간에 노출돼 있는 outer라는 변수를 통해 outer 함수를 실행할 수는 있지만, **outer 함수 내부에는 어떠한 개입도 불가능하다**. 외부에서는 오직 return한 정보에만 접근 가능.

**외부에 제공하고자 하는 정보들을 모아서 return하고, 내부에서만 사용할 정보는 return하지 않는 것으로 접근 권한 제어가 가능한 것이다.**



### 3. 부분 적용 함수

n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억시켰다가, 나중에 (n-m)개의 인자를 넘기면 비로소 원래 함수의 실행 결과를 얻을 수 있게끔 하는 함수



### 4. 커링 함수

여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 것.