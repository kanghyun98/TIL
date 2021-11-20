# Number, Math, Date

## 1. Number

표준 빌트인 객체인 Number는 원시 타입인 숫자를 다룰 때 유용한 프로퍼티와 메서드를 제공한다.



### 1.1) Number 생성자 함수

new 연산자와 함께 Number 생성자 함수 호출하면 Number 인스턴스를 생성할 수 있다.



new 연산자를 사용하지 않고 Number 생성자 함수를 호출하면 **Number 인스턴스가 아닌 숫자를 반환**

```js
Number('0');		// 0
Number('-10.3');	// -10.3
```



### 1.2) Number 프로퍼티

- `Number.EPSILON`:  1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이 (부동소수점으로 인해 발생하는 오차 방지)
- `Number.MAX_VALUE`: 자바스크립트에서 표현할 수 있는 가장 큰 양수 값
- `Number.MIN_VALUE`: 자바스크립트에서 표현할 수 있는 가장 작은 양수 값
- `Number.MAX_SAFE_INTEGER`: 자바스크립트에서 안전하게 표현할 수 있는 가장 큰 정수값
- `Number.MIN_SAFE_INTEGER`: 자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정수값
- `Number.POSITIVE_INFINITY`: 양의 무한대 (= Infinity)
- `Number.NEGATIVE_INFINITY`: 음의 무한대 (= -Infinity)
- `Number.NaN`: Not a Number을 나타내는 숫자값 (= window.NaN)



### 1.3) Number 메서드

- `Number.isFinite()`: 정상적인 유한수인지 검사하여 불리언 값으로 반환
- `Number.isInteger()`: 정수인지 검사하여 불리언 값으로 반환(암묵적 타입 변환x)
- **`Number.isNan()`**: NaN인지 검사하여 불리언 값으로 반환
- `Number.isSafeInteger()`: 안전한 정수인지 검사하여 불리언 값으로 반환
- `Number.prototype.toExponential()`: 숫자를 지수 표기법으로 변환하여 문자열로 반환, 인수로 소수점 이하로 표현할 자릿수 전달
- `Number.prototype.toFixed()`: 숫자를 반올림하여 문자열로 반환
- `Number.prototype.toPrecision()`: 인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환
- **`Number.prototype.toString()`**: 숫자를 문자열로 변환하여 반환



## 2. Math

표준 빌트인 객체인 Math는 생성자 함수가 아니고, 수학적인 상수와 함수를 위한 정적 프로퍼티와 정적 메서드만 제공한다.

### 2.1) Math 프로퍼티

- `Math.PI`: 원주율 PI 값 반환



### 2.2) Math 메서드

- `Math.abs()`: 절대값 반환
- `Math.round()`: 소수점 이하를 반올림한 정수 반환
- `Math.ceil()`: 소수점 이하를 올림한 정수를 반환
- `Math.floor()`: 소수점 이하를 내림한 정수를 반환
- `Math.sqrt()`: 제곱근을 반환
- `Math.random()`: 0이상 1미만의 임의의 난수 반환
- `Math.pow()`: 첫 번째 인수를 밑, 두 번째 인수를 지수로 거듭제곱한 결과 반환
- `Math.max()`: 전달받은 인수들 중에서 가장 큰 수 반환, **배열을 인수 받은 경우 스프레드 문법 사용**
- `Math.min()`: 전달받은 인수들 중에서 가장 작은 수 반환



## 3. Date

표준 빌트인 객체인 Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수이다.



### 3.1) Date 생성자 함수

Date 생성자 함수로 생성한 **Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값**을 갖는다.

1970년 1월 1일 00:00:00 (UTC)을 기점으로 Date 객체가 나타내는 날짜와 시간까지의 밀리초를 나타낸다.

new Date()를 호출하는 방법

- `new Date()`: 인수 없이 호출하면 현재 날짜와 시간을 가지는 Date 객체 반환
- `new Date(milliseconds)`: 1970년 1월 1일 00:00:00 (UTC)을 기점으로 인수로 전달된 밀리초만큼 경과한 시점이 저장된 Date 객체 반환
- `new Date(dateString)`: 날짜와 시간을 나타내는 문자열을 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환 (`Date.parse()` 메서드에 의해 해석 가능한 형식)
- `new Date(year, month, date, hours, minutes, seconds, ms)`: 주어진 인수를 조합해 만들 수 있는 날짜가 저장된 객체가 반환(연, 월은 필수값)
  - `year`: 네 자리 숫자
  - `month`: 0(1월) ~ 11(12월) 사이의 정수
  - `date`: 1 ~ 31 사이의 정수
  - `hours`: 0 ~ 23 사이의 정수
  - `minutes`: 0 ~ 59 사이의 정수
  - `second`: 0 ~ 59 사이의 정수
  - `ms`: 0 ~ 999 사이의 정수



### 3.2) Date 메서드

- `Date.now()`: 1970년 1월 1일 00:00:00 (UTC)을 기점으로 **현재 시간**까지 경과한 **밀리초를 숫자로 반환**

- `Date.parse()`: 1970년 1월 1일 00:00:00 (UTC)을 기점으로 인수로 전달된 **지정 시간**(**문자열**)까지 **밀리초를 숫자로 반환**

- `Date.UTC()`: 1970년 1월 1일 00:00:00 (UTC)을 기점으로 인수로 전달된 **지정 시간**(**year, month, ...**)까지의 **밀리초를 숫자로 반환**



날짜 구성요소 얻기

- `Date.prototype.getFullYear()`: Date 객체의 연도를 나타내는 정수 반환
- `Date.prototype.getMonth()`: Date 객체의 월을 나타내는 정수 반환 (0 ~ 11)
- `Date.prototype.getDate()`: Date 객체의 일을 나타내는 정수 반환 (1~ 31)
- `Date.prototype.getDay()`: Date 객체의 요일을 나타내는 정수 반환 (일요일(0) ~ 토요일(6))
- `Date.prototype.getHours / getMinutes / getSeconds / getMilliseconds`: Date 객체의 시, 분, 초, 밀리초를 나타내는 정수 반환
- `Date.prototype.getTime()`: 주어진 일시와 1970년 1월 1일 00:00:00 (UTC) 사이의 간격(밀리초 단위)인 타임스탬프를 반환.



날짜 구성요소 설정하기

- `Date.prototype.setFullYear()`
- `Date.prototype.setMonth()`
- `Date.prototype.setDate()`
- `Date.prototype.setHours / setMinutes / setSeonds / setMilliseconds`
- `Date.prototype.setTime()`



날짜 구성요소 문자열로 반환

- `Date.prototype.toDateString()`: 문자열로 Date 객체의 날짜 반환

- `Date.prototype.toTimeString()`: 문자열로 Date 객체의 시간 반환

- `Date.prototype.toISOString()`: 문자열로 ISO 8601형식의 Date 객체의 날짜와 시간 반환

  