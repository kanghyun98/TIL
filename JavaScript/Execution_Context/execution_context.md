# 실행 컨텍스트

'코어 자바스크립트'의 CHAPTER 2 정리

자바스크립트는 **실행 컨텍스트가 활성화**되는 시점에 **선언된 변수를 위로 끌어올리고(hoisting)**, **외부 환경 정보를 구성**하고, **this 값을 설정**하는 등의 동작을 수행하기 때문에 중요 핵심 개념이다.



## 0. 요약 (다 읽기는 귀찮을 때를 위해)

### 실행 컨텍스트

실행할 코드에 제공할 환경 정보들을 모아놓은 객체입니다. 실행 컨텍스트는 전역 공간에서 자동으로 생성되는 전역 컨텍스트와 eval 및 함수 실행에 의한 컨텍스트 등이 있다. 실행 컨텍스트 객체는 활성화되는 시점에 `VariableEnvironment`, `LexicalEnvironment`, `ThisBinding`의 세 가지 정보를 수집한다.

매개변수명, 변수의 식별자, 선언한 함수의 함수명 등을 수집하는 `environmentRecord`와 바로 직전 컨텍스트의 `LexicalEnvironment`정보를 참조하는 `outerEnvironmentReference` 로 구성돼 있다.



### 호이스팅

코드 해석을 좀 더 쉽게 하기 위해 `environmentRecord` 의 수집 과정을 추상화하는 개념으로, 변수 선언과 값 할당이 동시에 이뤄진 문장은 '선언부'만을 호이스팅하고, 할당 과정은 원래 자리에 남아있게 되는데, 여기서 함수 선언문과 함수 표현식의 차이가 발생한다.



### 스코프

변수의 유효범위를 말한다. `outerEnvironmentReference` 는 해당 함수가 선언된 위치의 `LexicalEnvironment`를 참조한다. 코드 상에서 어떤 변수에 접근하려고 하면 현재 컨텍스트의 `LexicalEnvironment` 를 탐색해서 발견되면 그 값을 반환, 발견하지 못하면 다시 `outerEnvironmentReference` 에 담긴 `LexicalEnvironment` 을 탐색하는 과정을 거친다. 전역 컨텍스트의 `LexicalEnvironment` 까지 탐색해도 해당 변수를 찾지 못할 경우 undefined를 반환한다.



## 1. 실행 컨텍스트란?

### 1.1 정의

실행할 코드에 제공할 **환경 정보**들을 모아놓은 **객체**



### 1.2 동작 방식

**동일한 환경**에 있는 코드들을 실행할 때 필요한 **환경 정보들을 모아 컨텍스트를 구성**, 이를 **콜 스택**에 쌓아올렸다가, **가장 위에 쌓여있는 컨텍스트와 관련 있는 코드들을 실행**하는 식으로 전체 코드의 환경과 순서를 보장한다.



### 1.3 실행 컨텍스트 구성 방법

함수 실행, 블록{ }



### 1.4 간단한 예제

```jsx
// ------------------ (1)
let a = 1;
function outer() {
	function inner() {
		console.log(a);  // undefined (hoisting때문에)
		var a = 3;
	}
	inner();  // ------- (2)
	console.log(a); // 1
}
outer();  // --------- (3)
console.log(a);    // 1
```



### 실행 순서

코드 실행 (1), 전역 컨텍스트를 콜 스택에 담음 → outer 함수 호출 (3), outer 실행 컨텍스트를 생성한 후 콜 스택에 담음 → 전역 컨텍스트와 관련된 코드 실행 일시정지, outer 함수 내부 코드 순차로 실행 → (2)에서 inner 함수 호출, inner 실행 컨텍스트 콜스택에 담음 → outer 일시중지, inner 순차적으로 실행

inner 함수 내부에서 a에 3할당 → inner 함수 실행 종료, inner 실행 컨텍스트 제거 → (2) 다음 줄부터 이어서 실행, a 변수의 값 출력 → outer 함수 실행 종료, outer 실행 컨텍스트 제거 → (3) 다음 줄부터 이어서 실행, a 변수의 값 출력 → 전역 컨텍스트 제거

순서가 복잡해보이지만, 바깥에서 안쪽으로 생성, 안쪽에서 바깥쪽으로 실행된다고 이해하면 쉽게 이해가 될겁니다!



### 1.5 실행 컨텍스트 객체에 저장되는 정보

- `VariableEnvironment`

  현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보. 선언 시점의 `LexicalEnvironment`의 스냅샷

- `LexicalEnvironment`

  처음에는 `VariableEnvironment`와 같지만 변경 사항이 실시간으로 반영됨.

- `ThisBinding`

  this 식별자가 바라봐야할 대상 객체

  위 세 가지를 더 자세히 들여다봅시다!

  

## 2. VariableEnvironment

담기는 내용은 `LexicalEnvironment`와 같지만 최초 실행 시의 스냅샷을 유지한다는 점에서 다름.

실행 컨텍스트를 생성할 때, `VariableEnvironment` 에 정보를 먼저 담은 다음, 복사해서 `LexicalEnvironment` 을 만들고, 이후에는 `LexicalEnvironment` 를 주로 활용.

`VariableEnvironment` 와 `LexicalEnvironment` 의 내부는 `environmentRecord` 와 `outerEnvironmentReference`로 구성돼 있음.



## 3. LexicalEnvironment

컨텍스트를 구성하는 환경 정보들을 모아놓은 것으로, "현재 컨텍스트 내부에는 a, b, c와 같은 식별자들이 있고 그 외부 정보는  d를 참조하도록 구성돼 있다."와 비슷한 방식으로 이해하면 된다.



### 3.1 environmentRecord와 호이스팅

`environmentRecord` 에는 현재 컨텍스트 관련된 코드의 식별자 정보들이 순서대로 저장됨.

(함수에 지정된 매개변수 식별자, 선언된 함수 그 자체, 변수 식별자 등)

변수 정보를 수집하는 과정이 모두 끝나도 아직 실행 컨텍스트가 관여할 코드들은 실행되기 전의 상태이다. 그렇기 때문에 **코드가 실행되기 전**임에도 불구하고 자바스크립트 엔진은 이미 해당 환경에 속한 코드의 변수명들을 모두 알고 있게 되는 셈이다.

여기서 **호이스팅** 개념이 등장하는데, 변수 정보를 수집하는 과정을 더욱 이해하기 쉬운 방법으로 대체한 가상의 개념이다.



### 3.2 스코프, 스코프 체인, outerEnvironmentReference

#### **스코프**

: 식별자에 대한 유효 범위

안→바깥 접근은 yes, 바깥→안 접근은 no



#### **스코프 체인**

**:** '식별자의 유효범위'를 안에서부터 바깥으로 차례로 검색해나가는 것

이를 가능하게 하는 것이 `LexicalEnvironment` 의 두 번째 수집자료인 `outerEnvironmentReference` 이다.

*`**outerEnvironmentReference` 는 현재 호출된 함수가 선언될 당시의 `LexicalEnvironment` 를 참조한다.**

여러 스코프에서 동일한 식별자를 선언한 경우, **무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능** (1.4 예제 결과를 보면 알 수 있다.)

이를 활용하면 변수 은닉화(variable shadowing)이 가능한데, 예를 들어 inner 함수 내부에서 a 변수를 선언했기 때문에 전역 공간에서 선언한 동일한 이름의 a 변수에는 접근할 수 없는 것과 같다.