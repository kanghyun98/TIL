# 타입

## 기본 타입

```typescript
// 문자 (string)
const str: string = 'hello';

// 숫자 (number)
const num: number = 10;

// 배열 (Array)
const arr: Array<number> = [1, 2 ,3];			// 배열 안에 number만 가능
const heros: Array<string>	= ["Capt", "Hulk"]	// 배열 안에 string만 가능

const items: number[] = [1, 2, 3]  //간편하게

// 튜플 (배열 인덱스 별로 지정)
const address: [string, number] = ["pangyo", 10]

// 객체 (obj)
const obj: object = {};

const person: {name: string, age: number} = {	//객체 하위요소
   name: 'capt',
   age: 24  
}

// 진위값 (boolean)
const show: boolean = true;

// 모든 타입
const todo: any = "아무거나

// 특정 값들의 집합 (enum)
enum Avengers {Capt, IronMan, Thor};
const hero: Avengers = Avengers.Capt;

let hero: Avengers = Avengers[0];	//인덱스로 접근
```



## 함수 타입

```typescript
// 함수의 파라미터, 반환값 타입 지정
function sum(a: number, b: number): number {
	return a + b;
}

// 파라미터 갯수를 제한하는 특징을 갖고있다.
sum(10, 20, 30, 40);	//error!

// 험수의 옵셔널 파라미터 (? 추가)
function log(a: string, b?: string) {
    
}
log('hello world')  // hello world

//return이 없는 경우 (void)
function noReturn(): void {
    console.log('no return')
}

//함수의 끝이 없음 (never)
// 이 함수는 절대 함수의 끝까지 실행되지 않는다는 의미
function neverEnd(): never {
  while (true) {

  }
}
```

