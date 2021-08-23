# 게시글 페이지 만들기

우선 게시글 클릭 시, 각 게시글의 slug로 이동하는 url을 구현했다는 가정하에서 진행한다.

### 템플릿 만들기

모든 게시글 페이지는 레이아웃이 동일하다. Next.js는 pages 디렉토리에 `[slug].js` 로 게시글 페이지를 동일한 컴포넌트를 사용해 만들 수 있지만, Gatsby는 지원하지 않는다.

그러므로 `gatsby-node.js` 에서 이 기능을 할 수 있는 API를 만들어야 하는데, 공통된 템플릿 컴포넌트가 필요하게 된다. 이를 templates 디렉토리에 만들어 해결할 수 있다.

```tsx
// templates/post_template.tsx

import React, { FunctionComponent } from 'react';

interface PostTemplateProps {}

const PostTemplate: FunctionComponent<PostTemplateProps> = function (props) {
  console.log(props);

  return <div>Post Template</div>;
};

export default PostTemplate;
```



### 템플릿 컴포넌트로 게시글 페이지 생성

템플릿 컴포넌트를 이용해 게시글 페이지를 만들어주는 부분을 `gatsby-node.js`에서 구현한다.

(Gatsby에서 제공하는 createPage API 사용)

```js
// gatsby-node.js

...

// Generate Post Page Through Markdown Data
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;	// 1

  // Get All Markdown File For Paging (모든 slug 조회)
  const queryAllMarkdownData = await graphql(	// 2
    `
      {
        allMarkdownRemark(
          sort: {
            order: DESC
            fields: [frontmatter___date, frontmatter___title]
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  );

  // Handling GraphQL Query Error
  if (queryAllMarkdownData.errors) {	
    reporter.panicOnBuild(`Error while running query`);	// 3
    return;
  }

  // Import Post Template Component
  const PostTemplateComponent = path.resolve(	// 4
    __dirname,
    'src/templates/post_template.tsx',
  );

  // Page Generating Function
  const generatePostPage = ({	// 5
    node: {
      fields: { slug },
    },
  }) => {
    const pageOptions = {
      path: slug,
      component: PostTemplateComponent,
      context: { slug },
    };

    createPage(pageOptions);	// 6
  };

  // Generate Post Page And Passing Slug Props for Query	// 7
  queryAllMarkdownData.data.allMarkdownRemark.edges.forEach(generatePostPage);
};
```

1) createPage API 호출

2) 모든 slug 조회하는 쿼리

3) 쿼리 에러 헨들링

4) 템플릿 컴포넌트 호출

5) slug 데이터와 템플릿 컴포넌트를 이용해 페이지 생성하는 함수

- 경로: slug 데이터 그대로
- 사용할 컴포넌트: 불러온 템플릿 컴포넌트
- context : {slug} -> slug 데이터를 템플릿 컴포넌트에서 Props로 받을 수도 있고, 해당 컴포넌트에서 사용할 **GraphQL Query의 파라미터로도 받을 수 있다**. (해당 url로 들어가서 props를 확인할 수 있다.)

6) 생성한 pageOptions 객체의 형식(페이지 링크, 템플릿 컴포넌트, context)으로 인자를 받는 createPage API

7) 이 모든 것들을 edges 배열 각각에 적용



### 템플릿에서 데이터 사용하기

GraphQL Query의 파라미터로 해당 slug를 받아 해당 내용에 대한 데이터만 받아와야 한다.

위에서 context에 {slug}를 줌으로써, GraphQL Query의 파라미터로 slug를 받을 수 있다고 했는데, 이를 이용해 필터링된 쿼리문을 받을 수 있다.

```tsx
// post_template.tsx 하단

export const testQuery = graphql`
    query queryMarkdownDataBySlug($slug: String) {
      allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
        edges {
        	... // 필터링된 데이터
        }
      }
    }
`;
```

필터링된 데이터는 Props의 data 필드에 존재한다.