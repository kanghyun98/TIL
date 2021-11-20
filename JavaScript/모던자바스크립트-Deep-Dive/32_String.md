# String

표준 빌트인 객체인 String은 원시 타입인 문자열을 다룰 때 유용한 프로퍼티와 메서드를 제공한다.



## 1. String 생성자 함수

`String` 생성자 함수의 인수로 문자열을 전달하면서 new 연산자와 함께 호출하면, 인수로 전달받은 문자열을 할당한 String 래퍼 객체를 생성한다.

String 래퍼 객체는 배열과 마찬가지로 `length` 프로퍼티와 인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티 키로, 각 문자를 프로퍼티 값으로 갖는 **유사 배열 객체**이면서 **이터러블(iterable)**이다.

```js
const strObj = new String('test');
console.log(strObj);	// String {0: "t", 1: "e", 2: "s", 3: "t", length: 4}
```



**문자열은 원시 값이므로 변경할 수 없다.** (바꾸려 해도 에러 발생X)

```
strObj[0] = 'T';
console.log(strObj);	// 'test'
```



new 연산자를 사용하지 않고 `String` 생성자 함수를 호출하면 String 인스턴스가 아닌 **문자열을 반환**한다. 이를 사용하여 명시적으로 타입을 변환하기도 한다.

```js
String(1);		// '1'
String(true);	// 'true'
String(NaN);	// 'NaN'
String(null);	// 'null'
```



## 2. length 프로퍼티

`length` 프로퍼티는 문자열의 문자 개수를 반환

```js
'test'.length;	// 4
```



## 3. String 메서드

String 객체에는 String 래퍼 객체를 직접 변경하는 메서드는 존재하지 않는다. **언제나 새로운 문자열을 반환**한다.

문자열은 변경 불가능한(immutable) 원시 값이기 때문에 String 래퍼 객체도 **읽기 전용 객체**로 제공된다.

사용 빈도가 높은 String 메서드

- `String.prototype.indexOf` : 인수로 전달받은 문자열을 검색하여 첫 번째 인덱스를 반환, 실패 시 -1 반환
- `String.prototype.search` : 인수로 전달받은 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열의 인덱스를 반환, 실패 시 -1 반환

- `String.prototpye.includes` : 인수로 전달받은 문자열이 포함되어 있는지 확인하여 true / false로 반환
- `String.prototype.startsWith/endsWith` : 인수로 전달받은 문자열로 시작/끝나는지 확인하여 true/false로 반환
- `String.prototype.charAt` : 인수로 전달받은 인덱스에 위치한 문자를 검색하여 반환
- `String.prototype.substring`: 첫 번째 인수로 전달받은 인덱스에 위치하는 문자부터 두 번째 인수로 전달받은 인덱스에 위치하는 문자의 바로 이전 문자까지의 부분 문자열을 반환
  - 두 번째 인수 생략 시 첫 번째 인수로 전달한 인덱스에 위치하는 문자부터 끝까지 반환
  - 첫 번째 인수 > 두 번째 인수인 경우 두 인수는 교환
  - 인수 < 0 or NaN인 경우 0으로 취급
  - 인수 > 문자열의 길이인 경우, 인수는 문자열의 길이로 취급된다.

- `String.prototype.slice` : substring 메서드와 동일하게 동작 (but 음수인 인수 전달 가능)
  - 음수인 인수 전달 시, 문자열의 가장 뒤에서부터 시작하여 문자열을 잘라내어 반환

- `String.prototype.toUpperCase/toLowerCase` : 대상 문자열을 모두 대문자/소문자로 변경한 문자열을 반환

- `String.prototype.trim` : 공백 문자가 있을 경우, 이를 제거한 문자열을 반환
  - `String.prototype.trimStart/trimEnd` 를 사용해 앞/뒤 공백을 제거한 문자열 반환 가능

- `String.prototype.repeat` : 대상 문자열을 인수로 전달받은 정수만큼 반복해 연결한 새로운 문자열을 반환

- `String.prototype.replace` : 첫 번째 인수로 전달받은 문자열(or 정규표현식)을 검색하여 두 번쨰 인수로 전달한 문자열로 치환한 문자열을 반환 (1개만)

  - `String.prototype.replaceAll` 을 이용해 전부 치환한 문자열 반환 가능

  - `$&` 는 검색된 문자열을 의미

    ```js
    const str = 'Hello World';
    
    str.replace('World', 'beautiful $&');	// 'Hello beautiful World'
    ```

  - 두 번째 인수로 **치환 함수**를 전달 가능

    : 첫 번째 인수로 전달한 문자열(or 정규표현식)에 매치한 결과를 두 번째 인수로 전달한 치환 함수의 인수로 전달, 치환 함수가 반환한 결과와 매치 결과를 반환

- `String.prototype.split ` : 인수로 전달한 문자열(or 정규표현식)을 검색하여 문자열을 구분한 후 분리된 각 문자열로 이루어진 배열을 반환

  - 빈 문자열 전달 시, 각 문자를 모두 분리
  - 인수를 생략 시, 대상 문자열 전체를 단일 요소로 하는 배열 반환
  - 두 번째 인수로 배열의 길이 지정 가능

