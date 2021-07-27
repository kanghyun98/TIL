# async & await

## async

async를 function 앞에 쓰면 해당 함수 안의 code block이 Promise로 바뀜

```jsx
// Promise
function fetchUser () {
	return new Promise((resolve, reject) => {
		//do etwork request in 10s
		resolve('alex');
	});
}

// async
async function fetchUser() {
	//do network request in 10s
	resolve('alex');
};

const user = fetchUser();
user.then(console.log); 
```



## await

async가 붙은 함수 안에서만 사용 가능

동기적 코드를 사용하는 것처럼 보임

```jsx
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// with async&await
async function getBanana() {
	await delay(3000);
	return 'Banna';
}

// without async&await
function getBanana() {
	return delay(3000);
	.then(() => 'Banana');
}
```



Promise chain도 해결 가능

```jsx
// without async&await
function pickFruits() {
	return getApple()
	.then(apple => {
		return getBanana()
		.then(banana => `${apple} + ${Banana}`)
	});
}

// with async&await
async function pickFruits() {
	try {
		const apple = await getApple();  //1초
		const banana = await getBanana();  //1초
	} catch() {                        //에러 발생 시
	
	}
	return `${apple} + ${Banna}`;
}

// 개선(병렬적으로 실행) but 코드가 더럽
async function pickFruits() {
	const applePromise = getApple();    //서로 독립이어야 가능
	const bananaPromise = getBanana();  //1초 끝!
	const apple = await getApple();  
	const banana = await getBanana(); 
	return `${apple} + ${Banna}`;
}

pickFruits().then(console.log);

// 개선 (병렬처리 Promise API)
function pickAllFruits() {
	return Promise.all([getApple(), getBanana()]);  //Promise.race 사용시 먼저 실행되는 것만 출력
	.then(fruits => fruits.join('+'));
}

pickAllFriuts().then(console.log);
```