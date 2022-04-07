# Apply Swagger

Swagger 기본적인 셋팅은 완료했고, Swagger를 본격적으로 프로젝트에 적용시키는 과정을 적어보려고 한다.

역시 [공식문서](https://swagger.io/docs/specification/about/)가 참고하기 제일 좋았으며, 버전별로 사용방법이 다르다는 것을 꼭 기억하자..! (버전 때문에 고생ㅠ)



### 추가 셋팅

우선 기존에 되어있는 기본 셋팅은 아무런 기능을 하지 못하기 때문에, Swagger의 목적인 API 명세서 및 테스트 역할을 하기 위해서는 약간의 추가가 필요하다. 아래는 실제 프로젝트에 적용되어있는 셋팅이며, 핵심은 `apis` 프로퍼티에 있다.

```js
// routes/docs.ts

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sasil-Server',
      version: '1.0.0',
      description: 'REST API with Express',
    },
    servers: [
      { url: 'http://localhost:4000', description: '개발 서버' },
      { url: 'https://서버주소', description: '배포 서버' },
    ],
  },
  apis: ['./src/swagger/routes/*', './src/swagger/components/*'], // 여기!!
};
```

`apis`를 보면, 특정 디렉토리 안에 있는 파일들을 가리키는 것이란걸 알 수 있는데, 이게 바로 API 명세서를 작성한 파일들이다. 파일 구조는 자유롭게 짤 수 있으며, 앞으로 나올 모든 부분을 하나의 파일 안에 때려박아도 괜찮다. 하지만 코드의 복잡성과 가독성을 생각해서 `routes와` `components` 두 개로 디렉토리로 나눴다.

`routes`는 옵션에서 설정한 baseURL을 제외한 API의 모든 것들을 명시한다. 요청에는 파라미터, 헤더, 바디의 구조와 경로 등이 있고, 응답에는 응답 데이터의 구조가 있다.

```
// swagger/routes/user.yaml
tags:
  - name: User
    description: 유저 정보 관련 API

paths:
  /user/me:
    get:
      summary: 유저 기본 정보 조회 (인증 필요)
      tags:
        - User
      security:
        - sasil-jwt: []
      responses:
        '200':
          description: 유저 기본 정보 조회 성공
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
```



`components`는 `routes`에서 작성한 응답 데이터의 구조를 컴포넌트화 해놓은 곳이다. 응답은 중복되는 부분이 많기 때문에 코드 복잡성, 가독성을 고려해서 따로 빼주었다.

```
// swaagger/components/user.yarml
components:
  schemas:
    User:
      type: 'object'
      properties:
        id:
          type: 'integer'
        created_at:
          type: 'string'
        updated_at:
          type: 'string'
        email:
          type: 'string'
        login_type:
          type: 'string'
        nickname:
          type: 'string'
        profile:
          type: 'string'
      example:
        id: 1
        created_at: 2022-03-27T15:56:04.904Z
        updated_at: 2022-03-27T15:56:04.904Z
        email: test@google.com
        login_type: google
        nickname: test
        profile: null

```



### yaml

위 예시들을 보면 파일구조가 신기한데, 이게 바로  `yaml` 이라는 것이다. Swagger에서는 이  `yaml`을 이용해서 구조를 짤 수 있으며, python과 비슷하게 들여쓰기를 이용해 구조화한다.

`json`으로도 가능하다고는 하는데, 공식문서에서도 다 `yaml`로 되어있고 `json` 을 이용한 문서는 잘 못 찾겠어서 `yaml`을 사용했다.



### Authentication

프로젝트에서 소셜로그인 기능이 있기 때문에 당연히 API에도 인증과 관련된 요청들이 많다. 로그인 자체 뿐만 아니라, 다른 요청들에도 유저의 개인 정보가 포함된 데이터가 필요할 경우, header의 `Authorization`의 값으로 서버에서 발급받은 `jwt를` 담아서 요청을 보내야한다.

액세스 권한이 있는지 판단하는 것을 쉽게 구현할 수 있도록 swagger에서는 `securitySchemes`을 제공한다.

사용 방법은 아래와 같다.

먼저 yaml 파일로 `components` 아래 `securitySchemes`를 놓고, 그 아래에 필요한 권한과 관련된 정보들을 나열한다. 나는 아래 description에 써놓았듯이, 프로젝트 서버에서 제공하는 Jwt 토큰과 소셜로그인 인증 페이지에서 제공하는 토큰 두 가지를 명세하였다.

```
// components/security.yaml
components:
  securitySchemes:
    sasil-jwt:
      description: sasil에서 로그인 후 받은 jwt
      in: header
      name: Authorization
      type: apiKey
    social-login-token:
      description: 프론트에서 소셜로그인 후 받은 토큰
      in: header
      name: Authorization
      type: apiKey

```

그러면 API명세 페이지의 우측 상단에 Authorize 버튼이 생기는데, 이를 클릭하면 아래 이미지와 같이 인증값을 넣을 수 있는 모달창이 나온다.

![image](https://user-images.githubusercontent.com/70627979/162222144-42b796f4-7a24-44d5-b2df-0e91e9a2b03b.png)



이제 해당 인증값을 포함해서 전달해야하는 요청에 추가해주면 끝난다.

유저 정보 요청에 대한 명세는 아래와 같이 작성할 수 있는데, security 부분에 추가해주면 된다.

```
paths:
  /user/me:
    get:
      summary: 유저 기본 정보 조회 (인증 필요)
      tags:
        - User
      security:  // 여기 !!!
        - sasil-jwt: []
      responses:
        '200':
          description: 유저 기본 정보 조회 성공
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

```



공식 문서: https://swagger.io/docs/specification/authentication/



### Components

위에서 응답 구조를 컴포넌트화하여 routes 디렉토리안에 작성했다고 하였다. 응답 구조는 아래와 같이 생겼으며, json 객체를 반환하기 때문에 객체 구조 형태로 되어있을 뿐이지 다양한 방식으로 작성할 수 있다.

```
components:
  schemas:
    User:
      type: 'object'
      // 속성
      properties:
        id:
          type: 'integer'
        created_at:
          type: 'string'
        updated_at:
          type: 'string'
        email:
          type: 'string'
        login_type:
          type: 'string'
        nickname:
          type: 'string'
        profile:
          type: 'string'
      // 예제
      example:
        id: 1
        created_at: 2022-03-27T15:56:04.904Z
        updated_at: 2022-03-27T15:56:04.904Z
        email: test@google.com
        login_type: google
        nickname: test
        profile: null
```



그리고 routes 디렉토리에 작성한 API 명세 파일에서 이 컴포넌트를 참조하게 만들면 아래와 같은 결과를 얻을 수 있다.

반환값 예시)

![image](https://user-images.githubusercontent.com/70627979/162224018-40790de8-9fe9-4e91-9368-c1a5e1b2d28f.png)



타입)

![image](https://user-images.githubusercontent.com/70627979/162224067-faa5fcc0-ba40-46e8-a848-5dc8f51d30a0.png)



공식 문서: https://swagger.io/docs/specification/data-models/



### routes

이제 API 명세에 필요한 모든 것을 작성한 파일을 만들어보자. 당연히 위에서 작성한 것들도 포함된다.

```
tags:
  - name: User
    description: 유저 정보 관련 API

paths:
  /user/me:
    get:
      summary: 유저 기본 정보 조회 (인증 필요)
      tags:
        - User
      security:
        - sasil-jwt: []
      responses:
        '200':
          description: 유저 기본 정보 조회 성공
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
```

- `paths`: 요청들을 paths 아래에 나열한다. 그리고 각 요청을 경로로 구분한다.
- `get`: 각 경로들을 또 메소드로 구분한다.
- `tags`: API를 그룹화할 수 있게 만들어주는 기능이다. 나는 각 파일별로 하나의 `tags`를 작성해주었다. (tags == 파일 구조)
- `security`: 요청에 필요한 인증 (`securityScheme에서` 만든 것!)
- `responses`: 응답 구조 명시, `responses` 아래에 응답 결과 별로 작성할 수 있다.
- `schema`: 위에서 작성했던 component를 여기에 전달하여 응답 결과를 확인할 수 있게 한다.



이제 성공적으로 API 명세서를 확인할 수 있다.

![image](https://user-images.githubusercontent.com/70627979/162226798-8377511c-5894-4711-b45a-a5714495e483.png)

![image](https://user-images.githubusercontent.com/70627979/162227207-3c5f9943-a181-49b3-a709-61c458447f2f.png)