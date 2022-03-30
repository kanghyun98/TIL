# Promise

자바스크립트의 비동기 처리에 사용되는 객체

프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용 (some heavy work)



## Producer

프로미스는 만들어지는 순간 executor가 자동적으로 실행된다.

```javascript
const promise = new Promise((resolve, reject) => {
	console.log('doing something');
	setTimeout(() => {
		resolve('alex');
		//reject(new Error('problem'));   // 문제가 생겼을 시 실행되는 콜백 함수
	}, 2000);
});
// doing someting (선언만 해도 실행된다)
```

만약 사용자가 요구한 경우에만 실행되어야 하는 것일 경우 Promise를 사용x



## Consumer

```javascript
// then, catch, finally
// then이 promise를 return하기 때문에 chain 가능
promise
	.then(value => {      // value: resolve라는 콜백함수가 전달해준 값
		console.log(value);          // alex
	})
	.catch(error => {
		console.log(error);
	})
	.finally(() => {            //성공과 실패와 상관없이 실행
		console.log('finish');
	});
```