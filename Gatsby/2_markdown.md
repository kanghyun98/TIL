# Markdown 파일 가져오기

블로그 글을 마크다운 파일로 작성하고, 가져오기 위해서는 마크다운 파일 처리기가 필요하다.

물론 백엔드를 따로 사용하지 않고 폴더에 마크다운 파일을 추가하면 게시되는 형태의 블로그이기 때문에 마크다운 파일을 불러와 가지고 노는 라이브러리만 있으면 된다.



## 라이브러리 종류

기본

- gatsby-source-filesystem: 파일시스템에서 파일 읽어오기
- gatsby-transformer-remak: 마크다운 파일 HTML이나 frontmatter로 변형

추가

- gatsby-remark-prismjs / prismjs: 문법 하이라이팅(소스코드 IDE에서 보는 것처럼 변환)
- gatsby-remark-smartypants: 글 내의 문장 부호를 깔끔한 부호로 변경
- gatsby-remark-copy-linked-files: 마크다운 내 이미지 특정 디렉토리로 복사
- gatsby-remark-external-links: 마크다운 내 링크 태그의 target, rel 속성 지정



## 다운로드 및 설정

```
$ yarn add gatsby-source-filesysem
```



gatsby-config.js의 plugins에 추가

```js
//gatsby-config.js
...
plugins: [
    ...
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    ...
]
```

path는 마크다운 파일이 있는 위치로 설정하면 된다. 이렇게 `path: ${__dirname}/src/markdown-pages` 로 두면 src 디렉토리 안의 markdown-pages 디렉토리로 설정된다.



나머지 라이브러리 한번에 다운로드

```
$ yarn add gatsby-transformer-remark gatsby-remark-images gatsby-remark-prismjs prismjs gatsby-remark-smartypants gatsby-remark-copy-linked-files gatsby-remark-external-links
```



gatsby-config.js의 plugins에 추가(위와 같은 곳에 추가)

```js
// gatsby-config.js
...
plugins: [
    ...
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 768,
              quality: 100,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {},
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
        ],
      },
    },
    ...
]
```



## 마크다운 내 코드 테마 적용

gatsby-browser.js에 아래 코드 추가

```
import 'prismjs/themes/테마 종류.css';
```



[여기](https://github.com/PrismJS/prism/tree/1d5047df37aacc900f8270b1c6215028f6988eb1/themes)에 다양한 종류의 테마가 있으니 고르면 된다.



## 마크다운 파일 추가

contents 디렉토리에 테스트용 마크다운 파일을 추가해보자

```
// test.md
---
slug: '/blog/my-first-post'
date: '2021-08-14'
title: 'Test'
categories: ['Web', 'SEO', 'Optimization']
summary: '홈페이지를 운영하는 많은 사람들 또는 기업들이 검색 페이지 최상단에 보여지게 하기 위해 어떤 최적화 작업을 하는지 알아보자.'
thumbnail: './test.png'
---

// 게시글 내용
```

특이한 점은 `---` 가 위 아래로 있는 것인데, 이 부분이 바로 GraphQL로 처리되는 부분이다.

`yarn develop`을 하고 `http://localhost:8000/___graphql`에 접속해 GraphiQL IDE를 확인해보면 마크다운의 `---` 로 감싸진 부분들이 들어가 있다.

위치: `allMarkdownRemark > edges > node > frontmatter` 



## gatsby-image 라이브러리

### 이유

GraphQL Query를 이용해 이미지 링크를 받아올 수 있지만, 이 방식은 이미지 사이즈, 해상도 조절이 불가능하며 파일 크기가 클 경우 이미지가 완전히 로딩될 때까지 화면에 나타나지 않아 UX 측면에서 떨어진다. gatsby-image 라이브러리를 사용해 썸네일과 마크다운 내부의 이미지를 Lazy Loading으로 사용자에게 보여줄 수 있고, 추가적으로 이미지가 완전 로딩될 때까지 `blur-up` 효과를 얻게되어 더 나은 UX를 제공할 수 있다.



### 사전 준비

기본으로 설치된 라이브러리 `gatsby-transformer-sharp` 는 imageSharp 노드를 만들어 GraphQL에서 조회할 수 있도록 만들어준다. 이로써 파일 노드의 자식 노드인 `childImageSharp` 로 조회할 수 있는 것이다.



### gatsby-image 설치 및 이해하기

#### 라이브러리 설치

```
$ yarn add gatsby-image
```



#### 반응형 이미지 타입 종류

- Fixed Image: 가로, 세로 길이 고정 (기기에 따라 해상도 다르게 적용)
- Fluid Image: 길이 고정x -> 이걸 사용할 계획



publicURL을 불러오는 방식

```tsx
// 이전
{
	...
    thumbnail {
        publicURL
    }
	...
}
```



fluid 이미지 불러오는 방식

```tsx
// 이후
{
    thumbnail {
		childImageSharp {
        	fluid(
            	maxWidth: 768
                maxHeight: 200
                fit: INSIDE
                quality: 100
             ) {
                  ...GatsbyImageSharpFluid_withWebp	// fragment
                }
              }
	}
}
```



#### Fragment

`gatsby-transformer-sharp` 라이브러리에서 제공하는 내장 Fragment를 [여기](https://www.gatsbyjs.com/plugins/gatsby-image/#gatsby-transformer-sharp)서 확인할 수 있다.

그 중, 구글에서 만든 이미지 로딩 속도를 개선한 WebP 방식 이미지를 사용할 수 있는 `GatsbyImageSharpFluid_withWebp` 사용한 것



참고자료

- https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/
- https://jeonghwan-kim.github.io/dev/2020/08/19/gatsby-image.html

