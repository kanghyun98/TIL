# Sitemap

검색엔진을 통해 사용자들이 접근할 수 있는 페이지의 목록

보통 XML 파일로 작성되고, 사이트 URL을 나열한 형태의 파일이다.



대부분 여러 검색 엔진이 크롤링할 수 있도록 색인을 생성하기 전에 Sitemap을 제출하도록 하고 있다고 한다.

따라서 개발자는 검색 엔진에 노출되었으면 하는 페이지만을 Sitemap에 추가해 **크롤링 속도를 개선**할 수 있으므로 **검색 엔진 최적화에 있어서 중요한 역할**을 담당한다.



Gatsby를 이용한 경우 데이터 파일을 추가할 때마다 Sitemap을 수정하는 것은 귀찮은 일이므로 자동으로 Sitemap에 추가해주는 라이브러리인 `gatsby-plugin-sitemap` 을 사용한다.



설치

```
$ yarn add gatsby-plugin-sitemap
```



gatsby-config.js 설정 추가

```js
plugins: [
	...
	'gatsby-plugin-sitemap',
	...
]
```



빌드 실행

```
$ yarn build
```



빌드 실행 시, public 디렉토리에 sitemap-index.xml 파일과 sitemap-0.xml 파일이 함께 생성되어 있따. sitemap-index.xml 파일에서 이 파일을 참조하며 분할 저장의 형태를 띄고 있다.

이런 이유는 웹 마스터 도구에서 일정 량 이상의 URL이 담긴 사이트맵을 인식 못하기 때문에, URL 개수와 상관없이 Sitemap을 사용하기 위해서이다.

