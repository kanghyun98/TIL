# event.target & event.currentTarget

**target**: 이벤트가 발생한 대상 요소

**currentTarget**: 현재 이벤트를 처리하는 이벤트 리스너가 등록된 요소



```html
<li>
	<button onClick={onClick}>
    	<span>hello</span>
    </button>
</li>
```

```javascript
const onClick = (event) => {
    console.log(event.target);
    console.log(event.currentTarget);
}
// ***target***
// <span>hello</span>

// ***currentTarget***
// <button onClick={onClick}>
//	 <span>hello</span>
// </button>
```

