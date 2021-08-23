# Canonical Link Element

Canonical Link Element는 대표 URL을 검색엔진에게 제공하는 Link 요소이다.

대표 URL이 필요한 이유는 원치 않는 임의의 페이지가 대표 페이지가 되는 것과 이에 따른 검색 순위가 밀리는 현상을 방지하기 위해서 필요하다.



### 방법

rel="canonical" 과 href 속성으로 대표 url을 지정해주면 된다.

```
<head>
  <link rel="canonical" href="<대표 URL>" />
</head>
```



이를 메타 태그에 추가하는 방법도 있지만, `gatsby-plugin-canonical-urls` 라이브러리를 이용해 더 쉽게 구현할 수 있다.



라이브버리 설치

```
$ yarn add gatsby-plugin-canonical-urls
```



gatsby-config.js 설정 추가

```js
plugins: [
	...
	{
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: '<https://my-website.com/>',
        stripQueryString: true,
      },
    },
    ...
]
```

