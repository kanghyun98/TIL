# Gatsby에서 Image 사용하기

Gatsby에서 이미지를 사용하는 방법에는 기본적인 방법, `StaticImage` 컴포넌트와 `GatsbyImage`  컴포넌트 세 가지가 있다.

두 가지가 어떻게 다르고, 언제 사용되는지 아래를 통해 알아보자.



## Basic

우리가 HTML을 처음 배우고, 웹 페이지에 이미지를 띄울 때 사용하는 방법으로 `img` 요소를 사용했다. `img`의 속성으로 `src`와 `alt`를 줘야했고, `src`는 이미지 url, `alt`는 이미지에 대한 설명을 주면 된다. 

간단한 예시

```js
const IndexPage = () => {
	return <Img src={url} alt="Profile Image" />
}
```



이 방법을 이용해 Gatsby에서 이미지를 나타낼 수 있지만, **이미지가 완전히 로딩될 때까지 화면에 나타나지 않으며 사이즈와 해상도 조절이 불가능해 이미지 파일 용량이 클 수록 문제**가 된다.

그래서 gatsby에서는 이미지 관련 플러그인을 통해 보다 나은 웹에서의 이미지 활용을 할 수 있도록  만들었다.  



## StaticImage

`StaticImage`는 `gatsby-plugin-image`  플러그인을 사용해서 이미지를 웹에 추가하는 방법으로, 높은 성능과 반응형 이미지를 구현할 수 있다.



### 라이브러리 추가

##### StaticImage를 사용하기 위해서는 몇 가지 플러그인 추가 설치

```
$ npm install gatsby-plugin-image gatsby-plugin-sharp gatsby-source-filesystem
```

- `gatsby-plugin-sharp`: `gatsby-plugin-image`에서 사용하는 실제 이미지의 처리를 핸들링 
- `gatsby-source-filesystem`: 컴퓨터 file system에서 데이터 가져오기



##### `gatsby-config.js`에 사용하는 플러그인 추가

```js
plugins: [
    ...
    "gatsby-source-filesystem",
	"gatsby-plugin-image",
    "gatsby-plugin-sharp",
]
```



### 사용하기

사용하는 방법은 매우 간단하다. `Img` 요소를 사용하듯이 `StaticImage` 요소를 사용하면 된다.

```js
import { StaticImage } from 'gatsby-plugin-image'

...
const IndexPage = () => {
	return <StaticImage src={url} alt="Profile Image" />
}
```



- 만약 외부 URL을 이용한 방식이 아닌, 로컬 파일 시스템에서 이미지를 가져오고 싶다면 `src/images` (아무런 디렉토리)에 이미지 파일을 추가하고 url 주소를 `../images/image.jpg` 로 설정해주면 된다.

- 원격 주소를 이용한 이미지는 빌드 시에 다운로드되고 크기가 조절된다. 그렇기 때문에 이미지가 다른 서버에서 변경되어도 다시 빌드하지 않으면 업데이트되지 않는다. 



## Gatsby Image

### StaticImage와의 차이점

- `StaticImage`는 **정적 이미지**, 컴포넌트가 매번 렌더링 될 때마다 같은 이미지 src를 사용하는 경우 

- `GatsbyImage`는 **동적 이미지**, 예를 들어 이미지 src가 prop로 전달되는 경우에 사용된다.  



### 라이브러리 추가

`GatsbyImage` 를 사용하기 위해, `gatsby-transformer-sharp` 플러그인을 추가해줘야 한다.

```
$ npm install gatsby-transformer-sharp
```



##### gatsby-config.js에 추가

```js
plugins: [
    ...
    "gatsby-source-filesystem",
	"gatsby-transformer-sharp",
]
```



Gatsby가 빌드 시 GraphQL Data Layer에 노드를 추가할 때, **`gatsby-transformer-sharp` 플러그인은 file 이미지 확장자(.png, .jpg 등)로 끝나는 노드를 찾고, 해당 파일에 대한 `ImageSharp` 노드를 생성**한다. 

![데이터 계층의 파일 노드에서 ImageSharp 노드가 생성되는 방식을 보여주는 다이어그램](https://www.gatsbyjs.com/static/d710adc16d08d60f8919c62468ec0e8f/321ea/data-layer-with-imagesharp-nodes.png)

이미지 출처: [Gatsby 공식 문서](https://www.gatsbyjs.com/docs/tutorial/part-7/#render-hero-image-in-the-blog-post-page-template)



### GraphiQL에서 확인

아래 query문을 GraphiQL에서 확인하면 이미지에 대한 다양한 정보들을 얻을 수 있다.

(예시는 markdown 파일에서 넘겨주는 정보 중 `thumbnail`의 이미지 처리에 대한 query문이다. 상황에 맞게 바꿔서 사용하면 된다.)

```js
// GarphQL
query filteredData {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          thumbnail {
            childImageSharp {
              gatsbyImageData	// 안에 옵션 있음
            }
          }
        }
      }
    }
  }
}
```





### 사용하기

아래 예시들을 통해 간단한 사용 방법에 대해 알아보자.

```js
...
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const BlogPost = ({ data }) => {
  const image = getImage(data.allMarkdownRemark.(생략).thumbnail) 
  
  return (
    <GatsbyImage image={image} alt="Profile Image" />
  )
}
```

위 예시의 경우 `getImage()`를 이용해 `thumbnail`안의 `childImageSharp` 안의 `gatsbyImageData`를 받아왔는데, `getImage()` 함수를 사용하고 싶지 않다면 `data`의 `gatsbyImageData`를 직접 호출하면 된다.



### 이미지 옵션 추가하기

**이미지의 최적화**를 위해 사이즈, 퀄리티, 사이즈 확장 및 축소 방법, 블러 처리 등을 하기 위해 **GraphQL 쿼리문에 옵션을 추가**할 수 있다.  

GraphiQL에 들어가서 확인하거나 [Gatsby 공식 홈페이지](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#image-options)를 보면 무슨 종류가 있는지 모두 확인할 수 있다.



간단하게 옵션을 적용한 예시를 보면 아래와 같다.

```js
query filteredData {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                transformOptions: {fit: INSIDE}
                layout: CONSTRAINED
                width: 768
                height: 200
              )
            }
          }
        }
      }
    }
  }
}
```

이에 대한 설명은 공식 문서에 적혀있으니 들어가서 확인하면 된다.





참고 자료

- https://www.gatsbyjs.com/docs/tutorial/part-3/ (StaticImage 튜토리얼)
- https://www.gatsbyjs.com/docs/tutorial/part-7/ (GatsbyImage 튜토리얼)
- https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#using-staticimage-with-css-in-js-libraries (css-in-js와 함께 사용)
- https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#image-options (이미지 옵션)

