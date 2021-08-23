# Meta Tag 추가하기

### 목적

- 최적화된 SEO 제공(검색 결과 상단)

- 카카오톡, 인스타그램에 링크 공유 시 정보 표시



### 메타 태그

- Title: 해당 페이지의 제목
- Description: 해당 페이지의 설명
- Viewport: 모바일 ?
- Content Type: 브라우저가 데이터 읽는 방법 정의 ?
- Social Meta Tag: 여러 소셜 미디어를 위한 Meta Tag 정의
-  등등..



### 셋팅

React-Helmet 라이브러리를 이용해 HTML 작성하듯이 손쉽게 메타 태그 추가할 수 있다.

gatsby-config.js

```js
...
plugins:[
`gatsby-plugin-react-helmet`,	// 플러그인에 추가
]
```



React-Helmet 라이브러리 타입 받기 위해

```
$ yarn add @types/react-helmet
```



### React-Helmet

React-Helmet 라이브러리는 Meta Tag를 HTML 파일 작성하듯이 사용하기 위해 Helmet 컴포넌트 제공한다.

아래와 같이 Helmet 컴포넌트를 이용해 여러 Meta Tag를 작성할 수 있다.

```tsx
import { Helmet } from 'react-helmet';

...

const Template: FunctionComponent<TemplateProps> = function ({ children }) {
  return (
    <Container>
      <Helmet>
        <title>Hyun's Dev Blog</title>

        <meta name="description" content="항상 발전하기 위해 노력하는 주니어 개발자입니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Helmet>

      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  );
};

export default Template;
```



### Template 활용

모든 페이지에 각각 적용해줄 수 있지만, 편리하게 Template 컴포넌트를 이용해 Props로 메타데이터를 넘겨주어 메타 태그를 만들 수 있다.

```tsx
const Template: FunctionComponent = ({
  title,
  description,
  url,
  image,
  children,
}) => {
  return (
    <Container>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@사용자이름" />
        <meta name="twitter:creator" content="@사용자이름" />
      </Helmet>

      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  );
};
```



### GraphQL로 메타 데이터  내용 받기

`gatsby-config.js`의 `siteMetadata` 프로퍼티를 통해 GraphQL로 메타 데이터를 받아올 수 있다.

```js
// 초기값
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: '배포 후'
  },
  ...
}
```



### Index.tsx에서 적용

```tsx
...

interface IndexPageProps {
  location: {
    search: string;
  };
  data: {					// 메타 데이터
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
      };
    };
    allMarkdownRemark: {
      edges: PostType[];
    };
    file: {
      publicURL: string;	// 이미지 넘겨주기 위해
      childImageSharp: {
        fluid: ProfileImageProps['profileImage'];
      };
    };
  };
}

const IndexPage: FunctionComponent<IndexPageProps> = ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file: {
      publicURL,
      childImageSharp: { fluid },
    },
  },
}: any) => {
    ...
    
    return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <Introduction profileImage={fluid} />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList posts={edges} selectedCategory={selectedCategory} />
    </Template>
  );
};
```



그리고 블로그 게시글의 경우, 페이지 링크를 추가로 받아와야 하기 때문에 post_template.tsx에서 location.href 데이터를 추가로 받아온다.

index.tsx와 유사하게 post_template.tsx도 만들어주면 된다.

