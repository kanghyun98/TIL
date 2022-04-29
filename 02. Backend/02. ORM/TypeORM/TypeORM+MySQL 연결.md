# TypeORM과 MySQL 연결

우선 MySQL은 설치 및 설정이 되었다는 가정하에 진행한다.



TypeORM과 데이터베이스를 연결하려면 `typeorm` 라이브러리의 `createConnection()` 함수를 사용하면 된다.

그리고 함수의 인자에는 데이터베이스 관련 설정들을 넣어주면 된다.

```js
// app.ts
import { createConnection } from 'typeorm';
import ormconfig from '@/database/config/ormconfig';

// DB
createConnection(ormconfig).then(() => {  // 설정들은 파일을 따로 만들었다.
  console.log('DB Connection is Successful!');
});

...
```



아래는 `createConnection()`의 인자로 넘겨줄 설정 정보들이다.

```js
const ormconfig = {
  type: 'mysql',  // db 종류
  host: ...  // host 주소
  port: ...  // port 번호
  username: ...  // 마스터 사용자 이름	
  password: ...  // 마스터 비밀번호
  database: ...  // 데이터베이스 이름
  synchronize: true,
  logging: false,
  entities: [...],  // entities 파일 경로
  migrations: [...],  // migrations 파일 경로
  subscribers: [...],  // subscribers 파일 경로
  cli: {
    entitiesDir: ...
    migrationsDir: ...
    subscribersDir: ...
  },
};
```



나는 개발 모드와 배포 모드를 구분하여 데이터베이스를 생성 및 유지하기 위해 아래와 같이 설정하였다.

또한 데이터베이스 정보 중 노출되면 안되는 정보들은 `.env` 파일에서 관리하여 불러왔다.

```js
const ormconfig: ormconfigType = {
  dev: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: process.env.DEV_DB_PASSWORD, 
    database: DEV_SETTING.db.database,
    synchronize: true,
    logging: false,
    entities: ['src/database/entity/**/*.ts'],
    migrations: ['src/database/migration/**/*.ts'],
    subscribers: ['src/database/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/database/entity',
      migrationsDir: 'src/database/migration',
      subscribersDir: 'src/database/subscriber',
    },
  },
  prod: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(PROD_SETTING.db.port),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: PROD_SETTING.db.database,
    synchronize: true,
    logging: false,
    entities: ['src/database/entity/**/*.ts'],
    migrations: ['src/database/migration/**/*.ts'],
    subscribers: ['src/database/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/database/entity',
      migrationsDir: 'src/database/migration',
      subscribersDir: 'src/database/subscriber',
    },
  },
};
```





참고자료

- https://whitemackerel.tistory.com/53