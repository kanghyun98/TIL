# 이넘 (enum)

특정 값들의 집합을 의미하는 자료형



### 5.1 숫자형 이넘

별도의 값으로 초기화하지 않으면 숫자형 enum으로 처리된다.

```typescript
enum Shoes {	//자동으로 1씩 증가
	Nike,
	Adidas
}

const firstShoes = Shoes.Nike;
const secondShoes = Shoes.Adidas;

console.log(firstShoes);	// 0
console.log(secondShoes);	// 1
```



### 5.2 문자형 이넘

```typescript
enum Shoes {	//자동으로 1씩 증가
	Nike = "나이키",
	Adidas = "아디다스"
}

const firstShoes = Shoes.Nike;
const secondShoes = Shoes.Adidas;

console.log(firstShoes);	// "나이키"
console.log(secondShoes);	// "아디다스"
```



### 5.3 예제

```typescript
enum Answer {
    Yes = "yes",
    No = "no"
}

function askQuestion(answer: Answer) {
    if (answer === Answer.Yes) {
        console.log('정답');
    }
    if (answer === Answer.No) {
        console.log('오답');
    }
}

askQuestion('예스');	// 오류!
askQuestion(Answer.Yes);	// 정답
```

