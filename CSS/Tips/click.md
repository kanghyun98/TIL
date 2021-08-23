# 클릭되는 것처럼 변환

- `cursor: pointer;` 를 이용해 클릭하는 느낌나게 할 수 있음(애니메이션은 아래)

```css
.video {
	cursor: pointer;
	transition: transform 250ms ease-in;
}

.video:hover {
	transform: scale(1.02);
}
```

- box-shadow: https://html-css-js.com/css/generator/box-shadow/
- flex-grow: https://developer.mozilla.org/ko/docs/Web/CSS/flex-grow