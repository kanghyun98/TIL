- A배열 원소 중 B배열에 포함되어 있는 개수 파악

  ```js
  let minCount = A.filter((v) => B.includes(v)).length;
  ```

- 소수 인지 확인하기

  ```js
  const isPrime = (num) => {
    if (num === 2) return true;
    if (num === 1) return false;

    let result = true;
    const targetNum = Math.ceil(Math.sqrt(num));

    for (let n = 2; n < targetNum; n++) {
      if (num % n === 0) {
        result = false;
        break;
      }
    }

    return result;
  };
  ```

- n 이하의 소수 구하기 (에라토스테네스의 체)

  ```js
  function solution(n) {
    const arr = Array(n + 1).fill(1); // idx와 실제 값 동일
    arr[0] = arr[1] = 0;
  
    for (let i = 2; i <= n; i++) {
      if (arr[i]) {
        let k = 2;
        while (k * i <= n) {
          arr[k * i] = 0;
          k++;
        }
      }
    }
  
    return arr.filter((num) => num).length;
  }
  
  ```

  

- 정렬 했을 때 각각의 배열 요소가 몇번째에 오는지 반환

  ```js
  // 내림차순
  const sortedArr = [...arr].sort((a, b) => b - a);
  const result = [];
  
  sortedArr.forEach((target) => {
    const idx = arr.findIndex((num) => num === target);
    arr[idx] = -1; // 중복 방지
    result.push(idx + 1);
  });
  ```

- 배열의 값이 몇 번씩 나오는지 파악

  - 인덱스가 중요한 경우 (배열 반환)

    ```js
    const eachStageUserCount = Array(N).fill(0);

    stages.forEach((num) => {
      eachStageUserCount[num - 1] += 1;
    });
    ```

  - 객체 반환

    ```js
    const values = ['a', 'b', 'c', 'c', 'd', 'b'];
    
    const count = values.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});
    ```

- 약수

  - 약수의 개수 파악

    ```js
    const getDivisorsCount = (num) => {
      let count = 0;
      for (let i = 1; i <= Math.sqrt(num); i++) {
        if (i ** 2 === num) count += 1;
        else if (num % i === 0) count += 2;
      }

      return count;
    };
    ```

  - 약수의 개수가 홀,짝 파악 ()

    ```js
    Number.isInteger(Math.sqrt(i)) ? '홀수' : '짝수';
    ```
    
  - 약수의 합

    ```js
    function solution(n) {
      let answer = 0;
    
      for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
          answer += i;
    
          if (n !== i ** 2) {
            answer += n / i;
          }
        }
      }
    
      return answer;
    }
    ```

- 최소공배수 / 최대공약수

  ```js
  function calc_gcd(a, b) {
    if (b == 0) return a;
    return a > b ? calc_gcd(b, a % b) : calc_gcd(a, b % a);
  }
  
  function solution(a, b) {
    const gcd = calc_gcd(a, b);
    const lcm = (a * b) / gcd;
  
    return [gcd, lcm];
  }
  ```

  

- N진법 변환

  - 10 -> n 진법 변환

    ```js
    num.toString(n);
    ```

  - n -> 10 진법 변환

    ```js
    Number.parseInt(num, n);
    ```

  - 자릿수 맞추기

    ```js
    const makeBinary = (num, n) => {
      const bin = num.toString(2);
      return (
        Array(n - String(bin).length)
          .fill(0)
          .join('') + bin
      );
    };
    ```

- 0부터 num까지 합

  ```js
  const getSum = (num) => {
    const sign = num < 0 ? -1 : 1;
    return sign * Math.floor(((Math.abs(num) + 1) * Math.abs(num)) / 2);
  };
  ```

- a부터 b 까지 합

  ```js
  const result = ((a + b) * (Math.abs(b - a) + 1)) / 2;
  ```


- 1부터 n까지를 원소로 갖는 배열 만들기

  ```js
  [...Array(n)].map((_, i) => i + 1);
  ```

  
