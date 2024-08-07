## 1. Test에 관하여

### 1.1. Testing

: 소프트웨어 테스트는 개발자가 의도한대로 코드가 동작하는지 확인 → 함수, UI, 성능 등

<br>

### 1.2. 테스트 피라미드

Unit Test → Integration Test → E2E Test(end-to-end)

- **Unit Test**: 단위 테스트 (함수, 모듈, 클래스)
- **Integration Test**: 통합 테스트 (상호작용하는 모듈들, 클래스들)
- **E2E Test**: UI 테스트, 사용자 테스트

<br>

### 1.3. TDD

: Test-driven development (테스트 주도 개발)

→ 개발하기 전에 테스트 코드를 먼저 작성

<br>

## 2. 좋은 테스트 원칙

### 2.1. 테스트의 비밀

1. 한번 작성된 테스트 코드는 영원히 유지보수 해야 한다.
2. 내부 구현 사항을 테스트 X
3. 재사용성을 높이기 (테스트 유틸리티)
4. 배포용 코드와 철저히 분리
5. 테스트 코드를 통한 문서화

<br>

### 2.2. 좋은 테스트의 구조

1. Given : 준비 과정을 재사용
2. When : 의도적으로 실패하기
3. Then : 가장 마지막에

<br>

### 2.3. 좋은 테스트의 원칙

**FIRST**

- Fast: 느린 것에 대한 의존성 낮추기 (파일, 데이터베이스, 네트워크 x → Mock, Stub)
- Isolated: 최소한의 유닛으로 검증하기 (독립적, 집중적)
- Repeatable: 실행할 떄마다 동일한 결과를 유지 (환경에 영향을 받지 않도록 작성 ex. 다른 테스트 코드 , 불안정한 외부 환경(네트워크) 등)
- Self-Validating: 스스로 결과를 검증하기, 자동화를 통한 검증 단계(CI/CD)
- Timely: 시기적절하게 테스트 코드 작성, 사용자에게 배포되기 전에 테스트 코드 작성

<br>

### 2.4. 테스트 범위

**Right-BICEP**

- Boundary conditions: 모든 코너 케이스에 대해 테스트 하기 (잘못된 포맷의 인풋, null, 특수문자, 잘못된 이메일, 작은 숫자, 큰 숫자, 중복, 순서가 맞지 않음 등과 같은 모든 케이스에 대하여 테스트)
- Inverse relationship: 역관계를 적용해서 결과값을 확인 (일관성을 유지, ex. 덧셈 → 뺄셈, 추가 → 제거)
- Cross-check: 다른 수단을 이용해서 결과값이 맞는지 확인
- Error conditions: 에러 처리를 제대로 하는지 확인
- Performance characteristics: 성능 확인은 테스트를 통해 정확한 수치로 확인 (성능 개선의 척도와 확인도 데이터를 통해 확인)

<br>

### 2.5. 테스트 조건

**CORRECT**

- Conformance: 특정 포맷을 준수 (전화번호, 이메일, 아이디, 파일 확장자)
- Ordering: 순서 조건 확인하기 (순서가 중요한 경우)
- Range: 숫자의 범위 (제한된 범위 벗어난 경우 처리)
- Reference: 외부 의존성 유무, 특정한 조건의 유무 (~일 때, ~가 되어 있을 때, 어떤 특정한 상황/상태 일 때 동작 테스트)
- Existence: 값이 존재하지 않을 때 처리
- Cardinality: 0-1-N 법칙에 따라 검증 (하나도 없을 때, 하나만 있을 때, 여러개 있을 때)
- Time: 상대, 절대, 동시의 일들 (순서가 맞지 않은 경우, 소비한 시간, 지역 시간)