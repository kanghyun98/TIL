# GraphQL Server

`react-create-app`과 유사하게 GraphQL도 `graphql-yoga` 라는 것을 이용해 쉽게 설치할 수 있다.

```
// cmd
yarn add graphql-yoga
yarn global add nodemon	//파일 수정 시마다 서버 재시작
//최신 문법 사용을 위한 babel 셋팅
yarn add @babel/cli @babel/core @babel/node @babel/preset-env 
```



package.json에 아래 scripts를 추가

```
// package.json
"scripts": {
    "start": "nodemon --exec babel-node index.js"
  },
```



.babelrc 파일 만들고, presets 추가

```
// .babelrc
{
    "presets": ["@babel/preset-env"]
}
```



Server 실행

```javascript
// index.js
import { GraphQLServer } from 'graphql-yoga';

const server = new GraphQLServer({
	// schema
});

server.start(() => console.log('GrpahQL Server Running'));

```

