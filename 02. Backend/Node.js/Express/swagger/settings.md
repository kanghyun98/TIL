# Swagger Settings

프론트에서 API 명세서만 보고 개발할 수 있도록 Swagger를 도입하기로 결정하였고, 아래는 Node.js의 Experss 환경에서 Swagger를 사용하기 위한 셋팅 과정이다.

Swagger는 API 명세와 테스트를 동시에 할 수 있게 도와주는 프레임워크이다.



## 패키지 설치 

```
$ yarn add -D swagger-ui-express swagger-jsdoc
```

- `swagger-ui-express`: API 문서의 swagger-ui 제공을 위한 패키지
- `swagger-jsdoc`: 주석을 사용해 routes를 마크업하고, 동적으로 swagger yml 생성해주는 패키지



## Basic Settings

swagger를 적용시키는 방식은 매우 다양하다. 나는 OpenAPI 버전3을 사용하였고, [문서](https://github.com/scottie1984/swagger-ui-express)에 나와있는 Express의 router와 함께 사용하는 방식을 선택하여 적용하였다.

옵션에 대해 파일을 따로 분리시킬 수도 있지만, swagger 관련 코드가 옵션을 제외하면 거의 없고, 파일 구조가 복잡해지는 것을 고려해서 하나의 파일에 담아두었다. (추후에 필요하다면 분리시킬 예정)

```js
// routes/docs.ts
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const router = express.Router();

// 옵션
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sasil-Server with Swagger',
      version: '1.0.0',
      description: 'REST API with Express',
    },
    servers: [
      { url: 'http://localhost:4000' },
      { url: 'https://서버주소' },
    ],
  },
  apis: [],
};

// router 설정
const swaggerSpec = swaggerJSDoc(options);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));

export default router;
```



그리고 위에서 만든 swagger 설정들을 `app.ts` 파일로 가져와 서버에 적용시켰다.

```js
// app.ts
import swaggerRouter from '@/routes/docs';

app.use('/docs', swaggerRouter);
```



## 결과

이렇게 설정해준 결과, http://localhost:4000/docs/ 에 접근하면 아래와 같은 화면에 접근할 수 있으며, swagger 설정이 성공적으로 이루어진 것을 확인할 수 있다.

<img width="1439" alt="image" src="https://user-images.githubusercontent.com/70627979/161433228-0c7569de-e7d4-4b59-af28-0e74a56b27e0.png">