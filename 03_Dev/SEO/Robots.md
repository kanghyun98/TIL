# robots.txt

특정 검색 로봇의 크롤링을 허용 페이지와 금지 페이지를 지정할 수 있다.



검색 엔진으로 크롤링되는 사이트는 보통 robots.txt 파일이 존재한다.



### 키워드

- User-agent: 검색 로봇 이름
- Disallow, Allow: 페이지 경로



### 셋팅

설치

```
$ yarn add gatsby-plugin-robots-txt
```



gatsby-config.js 설정 추가

```js
plugins:[
	...
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    ...
]
```

