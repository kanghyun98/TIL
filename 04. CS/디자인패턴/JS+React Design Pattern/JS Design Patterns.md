# JS Design Patterns

- 1~6: 생성 패턴
- 7~10: 구조 패턴
- 11~13: 행위 패턴

<br>

## 1. 생성자 패턴

- 생성자(constructor): 객체가 생성된 뒤 초기화하는데 사용되는 메서드
- 클래스 특징
  - 새 객체를 초기화하는 `constructor()` 라는 메서드 포함
  - `new` 키워드로 생성자 호출 가능
  - 생성자 내부에서 사용된 `this` 키워드는 새로 생성된 해당 객체를 가리킴



## 2. 모듈 패턴

- 모듈 패턴은 전통적인 소프트웨어 엔지니어링 분야에서 클래스의 캡슐화를 위해 처음 고안됨

  → 객체 리터럴을 이용한 방식

- 이제는 객체, 함수, 클래스, 변수 등을 다른 파일에 쉽게 내보내고 가져올 수 있다.

<br>

### 1. 비공개

- 모듈 패턴은 클로저를 활용해 '비공개' 상태와 구성을 캡슐화한다.
- 전역 스코프로의 유출 방지 및 다른 인터페이스와의 충돌 예방

```javascript
// CounterModule.js
let counter = 0;

export function incrementCounter() {
  counter++;
}

export function resetCounter() {
  counter = 0;
}

export function getCounter() {
  return counter;
}

export default { incrementCounter, resetCounter, getCounter };
```

```javascript
import CounterModule from './CounterModule.js';

console.log(CounterModule.counter); // error

console.log(CounterModule.getCounter()); // now you can get counter
```

<br>

### 2. 모듈 패턴 변형

- 믹스인 가져오기 변형
- 내보내기 변형
  - 이름을 지정해주지 않고 전역 스코프로 변수를 내보낼 수 있다.

<br>

### 3. 장단점

장점

- 코드의 유지부수가 용이
- 캡슐화
- 전역 스코프 오염 방지



단점

- unit test에서 비공개 멤버는 제외됨

<br>

### 추가

모듈과 파일의 분리

- 공통점
  - 대부분의 프로그래밍 언어에서 모듈은 하나의 파일로 구성
  - 파일 단위로 코드를 분리하는 것이 모듈화를 실현하는 주요 방법 중 하나
- 차이점
  - 파일 분리: 코드 관리를 위해 물리적으로 파일을 나누는 것
  - 모듈: **기능적으로 관련된 코드의 집합**으로, 프로그램의 특정 기능이나 로직을 캡슐화하기 위한 논리적 단위

<br>

## 3. 노출 모듈 패턴

- 모든 함수와 변수를 비공개 스코프에 정의
- 공개하고 싶은 부분만 포인터를 통해 비공개 요소에 접근할 수 있게 해주는 익명 객체를 반환

```javascript
let privateVar = 'Rob Dodson';
const publicVar = 'Hey there!';

const privateFunction = () => {
  console.log(`Name:${privateVar}`);
};

const publicSetName = strName => {
  privateVar = strName;
};

const publicGetName = () => {
  privateFunction();
};

// 비공개 함수, 속성에 접근하는 공개 포인터
const myRevealingModule = {
  setName: publicSetName,
  greeting: publicVar,
  getName: publicGetName,
};

export default myRevealingModule;
```

```javascript
import myRevealingModule from './modules/myRevealingModule.mjs';
  
myRevealingModule.setName('Matt Gaunt');
```

<br>

### 장단점

장점

- 코드의 일관성이 유지됨
- 모듈의 마지막 부분에서 명시적으로 반환 객체를 구성하여, 퍼블릭 인터페이스를 명확하게 정의

단점

- private 메서드를 참조하는 public 메서드를 수정하기 어려움
  - private 메서드의 모든 세부사항을 이해해야함
  - private 메서드 파라미터가 변경되는 경우, public 메서드의 호출 방식도 바뀌어야 하므로 전체 모듈에 영향을 미침

<br>

## 04. 싱글톤 패턴

: 클래스의 인스턴스가 오직 하나만 존재하도록 제한하는 패턴

- 전역에서 접근 및 공유해야 하는 단 하나의 객체가 필요할 때 유용

- 싱글톤 패턴은 초기화를 지연시킬 수 있음
  - 초기화 시점에 필요한 정보가 유효하지 않을 수 있기 때문
  - 정적 클래스(또는 객체)와의 차이점
- 싱글톤 패턴의 **적합성**
  - 클래스의 인스턴스는 정확히 하나만 있어야 하며, 접근이 용이해야 함
  - 싱글톤의 인스턴스는 서브클래싱을 통해서만 확장 가능해야하며, 코드의 수정 없이 확장된 인스턴스를 사용할 수 있어야 한다.
- 단점
  - 테스트가 어려움
  - 싱글톤임을 파악하는 것이 어려움

```javascript
// 싱글톤 패턴 예시
let instance;

class MySingleton {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  getInstance() {
    return this;
  }
}

const singleA = new MySingleton();
const singleB = new MySingleton();

console.log(singleA.getInstance() === singleB.getInstance()); // true
```



<br>

## 05. 프로토타입 패턴

: 이미 존재하는 객체를 복제해 만든 템플릿을 기반으로 새 객체를 생성하는 패턴

- 프로토타입 패턴은 프로토타입의 상속을 기반으로 함
  - 프로토타입 상속은 이미 존재하는 다른 객체를 복제하여 새로운 객체를 만들어내는 방식
- 성능적인 이점
  - 객체 내에 함수를 정의할 때 복사본이 아닌 참조로 생성되어 모든 자식 객체가 동일한 함수를 가리키게 할 수 있음

<br>

## 06. 팩토리 패턴

- 다른 패턴과 달리 생성자를 필요로하지 않지만, 필요한 타입의 팩토리 객체를 생성하는 다른 방법을 제공



### 1. 예시

```javascript
class Car {
  constructor({ doors = 4, state = 'brand new', color = 'silver' } = {}) {
    this.doors = doors;
    this.state = state;
    this.color = color;
  }
}

class Truck {
  constructor({ state = 'used', wheelSize = 'large', color = 'blue' } = {}) {
    this.state = state;
    this.wheelSize = wheelSize;
    this.color = color;
  }
}

class VehicleFactory {
  constructor() {
    this.vehicleClass = Car;
  }

  createVehicle(options) {
    const { vehicleType, ...rest } = options;

    switch (vehicleType) {
      case 'car':
        this.vehicleClass = Car;
        break;
      case 'truck':
        this.vehicleClass = Truck;
        break;
    }

    return new this.vehicleClass(rest);
  }
}

// 사용 예제
const vehicleFactory = new VehicleFactory();

const car = vehicleFactory.createVehicle({
  vehicleType: 'car',
  color: 'yellow',
  doors: 6,
});

const truck = vehicleFactory.createVehicle({
  vehicleType: 'truck',
  color: 'red',
  wheelSize: 'medium',
});
```

<br>

### 2. 팩토리 패턴을 사용하면 좋은 상황

- 객체나 컴포넌트의 생성 과정이 높은 복잡성을 가지고 있을 때
- 상황에 맞춰 다양한 객체 인스턴스를 편리하게 생성할 수 있는
- 같은 속성을 공유하는 여러 개의 작은 객체 또는 컴포넌트를 다뤄야 할 때
- 덕 타이핑 같은 API 규칙만 충족하면 되는 다른 객체의 인스턴스와 함께 객체를 구성할 때 (디커플링에도 유용)

<br>

### 3. 단점

- 잘못된 상황에 적용 시, 애플리케이션 복잡도가 크게 증가
- 객체 생성 과정을 인터페이스 뒤에 추상화하기 떄문에 객체 생성 과정이 복잡할 경우, 단위 테스트의 복잡성 증가

<br>

### 3. 추상 팩토리 패턴

: 같은 목표를 가진 각각의 팩토리들을 하나의 그룹으로 캡슐화하는 패턴

- 객체가 어떻게 생성되는지에 대한 세부사항을 알 필요 없이 객체 사용 가능
- 객체의 생성 과정에 영향을 받지 않아야 하거나 여러 타입의 객체로 작업해야 하는 경우 유용



> - **팩토리 패턴**) 단일 객체 생성에 초점을 맞추며, 구체적인 클래스의 생성 로직을 캡슐화
> - **추상 팩토리 패턴**) 관련된 여러 객체를 일관된 방식으로 생성하는 데 사용되며, 다양한 구체적인 팩토리를 통해 각기 다른 객체를 생성

<br>



## 07. 퍼사드 패턴

> 퍼사드(facade): 실제 모습을 숨기고 꾸며낸 겉모습만을 세상에 드러내는 것

- 심층적인 복잡성을 숨기고, 사용하기 편리한 높은 수준의 인터페이스를 제공하는 패턴
- 클래스의 인터페이스를 단순화하고 코드의 구현 부분과 사용 부분을 분리

<br>

### 1. 예시

```javascript
// 하위 시스템 클래스
class CPU {
  start() {
    console.log('CPU: Starting...');
  }

  shutdown() {
    console.log('CPU: Shutting down...');
  }
}

class Memory {
  load() {
    console.log('Memory: Loading...');
  }

  clear() {
    console.log('Memory: Clearing...');
  }
}

class HardDrive {
  read() {
    console.log('HardDrive: Reading data...');
  }

  write() {
    console.log('HardDrive: Writing data...');
  }
}

// Facade 클래스
class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start() {
    console.log('\nStarting computer...');
    this.cpu.start();
    this.memory.load();
    this.hardDrive.read();
  }

  shutdown() {
    console.log('\nShutting down computer...');
    this.cpu.shutdown();
    this.memory.clear();
    this.hardDrive.write();
  }
}
```

<br>

### 2. 장점

- 하위 시스템에 직접 접근하기보다는 간접적으로 상호작용하여 에러를 줄일 수 있음
- 사용하기 쉬움
- 패턴 구현에 필요한 코드의 양이 적음



