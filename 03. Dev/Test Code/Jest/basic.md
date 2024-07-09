- Test Runner: 테스트 실행 후 결과 생성
- Assertion: 테스트 비교를 통한 테스트 로직

→ Jest를 쓰면 두 가지를 구분하지 않고 한 번에 진행할 수 있다.



## Getting Started

1. jest 설치

   ```jsx
   $ yarn add --global jest // 전역 설치
   $ yarn add --dev jest
   
   // npm
   $ npm install --save-dev jest
   ```

2. jest config 파일 생성

   ```jsx
   $ jest --init
   
   // 이후 설정들을 원하는대로 정해주면 된다.
   ```

3. sum.js 파일 만들기

   ```jsx
   // src/sum.js
   function sum(a, b) {
     return a + b;
   }
   
   module.exports = sum;
   ```

4. sum.test.js 파일 만들기

   ```jsx
   // test/sum.test.js
   const sum = require('../src/sum.js');
   
   test('adds 1 + 2 to equal 3', () => {
     expect(sum(1, 2)).toBe(3);
   });
   ```

5. 테스트 실행

   ```jsx
   $ yarn test
   
   // npm
   $ npm run test
   ```

   coverage를 확인하면, 작성한 코드들에 대해 얼마만큼 테스트 코드가 존재하는지 확인할 수 있다.

   → 해당 기능을 끄고 싶다면, `jest.config.js` 파일에서 `collectCoverage` 옵션을 끄면 된다.

6. 테스트 자동화

   ```jsx
   // package.json 
   // 👉 작업한 파일들만 테스트 (git을 사용해야한다!)
   // -> git을 기준으로 변경된 파일들에 대해서만 진행된다
   {
   	...
   	"scripts": {
       "test": "jest --watch"
     },
   	...
   }
   
   // 👉 전체 파일 테스트
   {
   	...
   	"scripts": {
       "test": "jest --watchAll"
     },
   	...
   }
   ```