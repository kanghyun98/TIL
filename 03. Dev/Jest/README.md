## 테스트

소프트웨어 테스트는 개발자가 의도한대로 코드가 동작하는지 확인하는 것 (함수, UI, 성능 등)



### 1. 테스트 시점

개발하면서 테스트 진행



### 2. 테스트 피라미드

Unit Test → Integration Test → E2E Test(end-to-end)

- Unit Test: 단위 테스트 (함수, 모듈, 클래스)
- Integration Test: 통합 테스트 (상호작용하는 모듈들, 클래스들)
- E2E Test: UI 테스트, 사용자 테스트



### 3. TDD

: Test-driven development (테스트 주도 개발)

→ 개발하기 전에 테스트 코드를 먼저 작성



### 4. Jest

- **Test Runner**: 테스트 실행 후 결과 생성
- **Assertion**: 테스트 비교를 통한 테스트 로직

→ `Jest`를 쓰면 두 가지를 구분하지 않고 한 번에 진행할 수 있다.



## 참고 자료

- https://jestjs.io