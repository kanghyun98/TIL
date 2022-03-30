# Settings

### 1. 프로젝트 생성

```
// 방법1) 바로 만들기
$ npx gatsby-cli new "프로젝트 이름"

// 방법2) Gatsby 사이트 방식
$ npm install -g gatsby-cli
$ gatsby new	// 다양한 초기 설정 가능
```



### 2. development server 실행

```
$ gatsby develop	// $ yarn develop과 동일
```

http://localhost:8000 로 이동하여 웹 브라우저 확인 가능



### 3. 디렉토리 변경 및 라이브러리 삭제

src 파일 내부를 지우고 새롭게 만들어주고, 사용하지 않는 라이브러리를 삭제해준다.

blog 만들기 에서는 아래와 같이 하였다.

```
// 디렉토리 구조
- Root Directory
	- contents		// 블로그 포스트 관련 파일들을 저장하기 위한 디렉토리
	- src
		- components	// React Component를 저장하기 위한 디렉토리
		- hooks			// Custom Hooks을 저장하기 위한 디렉토리
		- pages			// 페이지의 역할을 하는 컴포넌트를 저장하기 위한 디렉토리
		- templates		// 게시글 페이지와 같이 페이지의 역할을 하면서 같은 형식의 여러 콘텐츠를 보여주는 컴포넌트를 저장하기 위한 디렉토리
		
// 기본적으로 브라우저에서 pages 디렉토리에 있는 파일의 이름을 통해 페이지에 접근할 수 있기 때문에 페이지의 역할이 아닌 컴포넌트들은 해당 디렉토리에 절대 저장하면 안 됩니다.

// Gatsby에서 제공하는 API를 통해 이 디렉토리에 저장된 템플릿 컴포넌트로 여러 페이지를 만들 수 있습니다.

// pages 디렉토리와는 다르게 파일명으로 페이지에 접근이 불가능합니다.
```



PWA(Progressive Web Application)을 위한 라이브러리인 `gatsby-plugin-manifest`와 Gatsby Cloud를 위한 라이브러리인 `gatsby-plugin-gatsby-cloud`를 삭제

```
$ yarn remove gatsby-plugin-manifest gatsby-plugin-gatsby-cloud
```



### 4. TypeScript 설치 (추가 단계)

설치

```
$ yarn add typescript --dev
$ yarn add gatsby-plugin-typescript
```



`gatsby-config.js` 파일 수정 (설치한 플러그인 추가, 마크다운 파일 위치 탐색 설정, 삭제한 라이브러리 내용 삭제)

```
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

```



이후에 tsconfig.json 파일 추가해 설정해주고, ESLint, Prettier까지 추가해주면 설정이 끝난다.