# EmotionJS

그동안 css 파일을 따로 만들어 사용해왔는데, 블로그를 만들 때는 JS안에서 스타일하는 방법을 한 번 연습해보기 위해 CSS-in-JS 라이브러리인 EmotionJS를 사용했다.



#### 왜 EmotionJS?

CSS-in-JS 중 가장 인기있는 EmotionJS는 기존에 많이 쓰이던 styled-components과 유사하나, styled-components의 가장 큰 문제점인 번들 용량을 해결한 라이브러리이다.



### 설치

```
$ yarn add gatsby-plugin-emotion @emotion/react @emotion/styled
```



`gatsby-config.js` 의 `plugins`에 추가

```
// gatsby-config.js
module.exports = {
  siteMetadata: { ... },
  plugins: [
    ...,
    `gatsby-plugin-emotion`,
    ...
  ]

```



### 사용법

#### 1. 글로벌 스타일 지정

`Global`이라는 컴포넌트를 이용

```tsx
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

...

const globalStyle = css`	//Tagged Template Literal 방식
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-size: 20px;
  }
`;

...

const NextPage = () => {
	return(
		<div>
        	<Global styles={globalStyle}/>
            <h1>Hello</h1>
        </div>
	)
}
```



#### 2. Tagged Template Literal 방식

Tagged Template Literal 방식으로 정의한 css

```
const MyStyle = css`
	font-size: 20px;
	font-wieght: 600;
	color: red;
`;
```



요소에 적용하는 방법

```tsx
...
return(
	<div>
    	<Global styles={globalStyle} />
        <h1 css={MyStyle}>Hello</h1>
    </div>
)
...
```



#### 3. Styled Component 생성 방법 (Tagged Template Literal 방식)

```
const Text1 = styled.div`
  font-size: 20px;
  font-weight: 700;
`;
```



요소에 적용하는 방법

```tsx
...
return(
	<Text1>Hello!</Text1>
)
...
```



#### 4. Styled Component 생성 방법 (객체 방식)

하이픈('-')을 이용한 css 정의하는 Kebab Case가 아닌, 단어를 이어붙이는 Camel Case를 사용해야 한다.

```
const Text2 = styled('div')(() => ({
  fontSize: '15px',
  color: 'blue',
}));
```



#### 5. Styled Component에서의 Props

disabled이라는 Props를 받아 만약 참이면 글씨에 중간줄을 추가

```tsx
...

const Text1 = styled.div<{ disable: boolean }>`
  font-size: 20px;
  font-weight: 700;
  text-decoration: ${({ disable }) => (disable ? 'line-through' : 'none')};
`;

const Text2 = styled('div')<{ disable: boolean }>(({ disable }) => ({
  fontSize: '15px',
  color: 'blue',
  textDecoration: disable ? 'line-through' : 'none',
}));

...

return (
	<div>
    	<Text1 disable={true}>Hello</Text1>
        <Text2 disable={true}>World</Text2>
    </div>
)
```

