# URL에서 쿼리문 파싱하기

Gatsby의 페이지 컴포넌트에서는 기본적으로 URL에 대한 부분을 props로 넘겨준다.

컴포넌트 `IndexPage`에는 다양한 props가 존재하는데,  `location` 이 바로 URL과 관련된 부분이다. 그 중에서 **URL 쿼리문**은 `location`의 `search`를 통해 받아올 수 있다.

예를 들어 URL 주소가 `https://..../?category=JavaScript` 이면 `location: {search}`를 통해 `?category=JavaScript`를 받아올 수 있는 것이다.



### 라이브러리

만약 여기서 query의 값을 받아오고 싶다면 `query-string` 라이브러리를 이용해서 쉽게 구현할 수 있다.

```
$ yarn add query-string
```



#### 사용법

`queryString.parse()` 를 사용해 URL의 쿼리문을 객체 형태로 얻을 수 있게 된다.



#### 예시

```tsx
// URL) https://..../?category=JavaScript
...
import queryString, { ParsedQuery } from 'query-string';

const IndexPage: FunctionComponent<IndexPageProps> = ({
  location: { search },
  data: { ... }
}) => {
    const parsed: ParsedQuery<string> = queryString.parse(search);
  	// parsed는 {category: "JavaScript"} 형태의 객체

	return( ... )
	}
```



#### 타입

타입은 query-string 라이브러리에서 제공하는 `ParsedQuery` 를 사용하고, 객체의 프로퍼티 타입인 `string` 을 제네릭으로 지정해야 한다.