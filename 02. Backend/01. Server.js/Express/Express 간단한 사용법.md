# Node.js + Express

- 노드에서는 `import/export`를 사용하지 않고, `require/module.export`**를 사용해 모듈을 관리**한다. (노드에서 웹팩 안써서)

- node runtime이 이 코드를 실행시켜서 **노드에서 제공하는 `http` 모듈이 작동해 서버 역할**을 해줌. (노드가 서버인 것이 아닌, 노드가 제공해주는 `http` 모듈이 서버를 제공해주는 것이다.)

- 데이터가 여러개인 경우, 한번 요청에 여러 데이터를 묶어서 한번에 응답을 줄 수도 있고, 여러번 요청을 나눠 보내고 그에 맞게 데이터를 응답해주는 방법이 있다.

  **요청과 응답은 1:1**로 이뤄져야 한다.



`http` 모듈을 이용한 서버 배포 방법 (라우팅이 너무 복잡!)

```js
const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
    if(req.method === 'GET') {
        if(req.url === '/post') {
            ...
        }
    } else if(req.method === 'POST'){
        ...
    }
    ...
  res.write('hello my first node');
  res.end('Hello node');
});
server.listen(3065);
```



## Express로 라우팅하기

라우팅을 보다 편리하게 하기 위해서 `Express` 사용 (`Express`도 내부적으로 `http`를 사용하기 때문에, 서버를 돌릴 수 있는 것이다.)

```js
const express = require('express');
const app = express();

app.METHOD(PATH, HANDLER)
```

- 예제)

  ```js
  // Express로 편리하게 라우팅
  const express = require('express');
  const app = express();
  
  app.get('/', (req, res) => {
    res.send('hello express');
  });
  
  app.get('/api', (req, res) => {	
    res.send('hello express2222');
  });
  
  app.listen(3065, () => {
    console.log('서버 실행 중');
  });
  ```



### REST API

- `get`: 조회
- `post`: 생성
- `put`: 전체 수정
- `delete`: 제거
- `patch`: 부분 수정

(애매하면 post 추천)



### Express 라우터 분리

`express.Router` 클래스를 사용하여 라우터를 모듈식 마운팅 가능한 핸들러 작성 가능하다.

```js
// routes/post.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {  // 실제로는 POST /post
  res.json({ id: 1, content: 'test' });
});

router.delete('/', (req, res) => {  // 실제로는 DELETE /post
  res.json({ id: 1 });
});

module.exports = router;
```

→ router가 모두 `/` 로 되어있는데, 이는 밑에 app.js에서 `app.use()`의 첫번째 인자로 `/post`를, 두번째 인자로 위 `router`를 설정했으므로 `/post`가 위 `router`에 prefix로 붙는다.



```js
// app.js
const express = require('express');
const postRouter = require('./routes/post');

const app = express();

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('서버 실행 중');
});
```