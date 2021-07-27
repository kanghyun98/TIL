# 콜백 함수

콜백 함수는 다른 코드의 인자로 넘겨주는 함수이다. 이를 활용해 비동기 처리 시 문제점을 해결할 수 있다.



## 문제점 <by Captain PANGYO>

```jsx
function getData() {
	var tableData;
	$.get('<https://domain.com/products/1>', function(response) {
		tableData = response;
	});
	return tableData;
}

console.log(getData()); // undefined
```



## 콜백 함수를 이용한 해결 <by Captain PANGYO>

```jsx
function getData(callbackFunc) {
	$.get('<https://domain.com/products/1>', function(response) {
		callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
	});
}

getData(function(tableData) {
	console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```



## 간단한 비유(비동기) <by Captain PANGYO>

콜백 함수의 동작 방식은 일종의 식당 자리 예약과 같습니다. 일반적으로 맛집을 가면 사람이 많아 자리가 없습니다. 그래서 대기자 명단에 이름을 쓴 다음에 자리가 날 때까지 주변 식당을 돌아다니죠. 만약 식당에서 자리가 생기면 전화로 자리가 났다고 연락이 옵니다. 그 전화를 받는 시점이 여기서의 콜백 함수가 호출되는 시점과 같습니다. 손님 입장에서는 자리가 날 때까지 식당에서 기다리지 않고 근처 가게에서 잠깐 쇼핑을 할 수도 있고 아니면 다른 식당 자리를 알아볼 수도 있습니다.

자리가 났을 때만 연락이 오기 때문에 미리 가서 기다릴 필요도 없고, 직접 식당 안에 들어가서 자리가 비어 있는지 확인할 필요도 없습니다. 자리가 준비된 시점, 즉 데이터가 준비된 시점에서만 저희가 원하는 동작(자리에 앉는다, 특정 값을 출력한다 등)을 수행할 수 있습니다.



## 문제점: 콜백 지옥 (Callback hell)

비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때 발생하는 문제



## 콜백 지옥 예시 <by Captain PANGYO>

```jsx
$.get('url', function(response) {
	parseValue(response, function(id) {
		auth(id, function(result) {
			display(result, function(text) {
				console.log(text);
			});
		});
	});
});
```



## 해결 방법

콜백 함수 분리, Promise, async&await를 사용



[참조 자료](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)