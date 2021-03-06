# 함수 선언문과 함수 표현식

## 함수 선언문이란?

함수의 정의부만 존재하고, 별도의 할당 명령(변수 할당)이 없는 함수



함수 선언문은 반드시 함수명이 정의되어 있어야합니다.

```javascript
//함수 선언문
fuction a() { }   
a();
```



## 함수 표현식이란?

정의한 함수를 별도의 변수에 할당한 함수



함수명 정의 → 기명 함수 표현식

함수명 정의 X → 익명 함수 표현식

```
const b = function c() { }    // 기명 함수 표현식 (변수명: c, 함수명: d)
b();
c();      //error

const d = function() { }    // 익명 함수 표현식
d();
```



기명 함수식의 경우, 함수명(위 예제에서 c)은 오직 함수 내부에서만 접근 가능합니다.

외부에서 함수명으로 함수 호출이 불가능하기 때문에 잘 사용되지는 않습니다.



## 무엇을 사용하는게 좋을까요?

호이스팅에 차이가 있어, 안전성 측면에서 함수 표현식이 좋습니다.



#### 호이스팅에 어떤 차이가 있는데요?

함수 선언문: **전체 호이스팅**

함수 표현식: **선언부만 호이스팅**



함수 선언문의 경우 실행 컨텍스트가 생성될 때, 함수 전체가 호이스팅되어 함수 선언한 코드 윗 부분에서도 해당 함수를 사용할 수 있게 됩니다. 좋아보일 수 있지만, 오류 예방 차원에서 함수 표현식을 권장하곤 합니다.