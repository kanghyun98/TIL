### MySQL, MySQL Workbench 설치 및 셋팅

- Window

  https://dev.mysql.com/downloads/ 에서 MySQL Community Server, MySQL Workbench 설치

- MacOS

  ```jsx
  // brew를 이용한 방식
  
  // MySQL 설치 및 설정
  $ brew install mysql // mysql 8버전 설치
  $ brew services start mysql
  $ mysql_secure_installation
  
  // MySQL Workbench 설치
  $ brew install --cask mysqlworkbench
  ```

  

- `mysql_secure_installation`의 설정은 아래와 같이 진행함

  - VALIDATE PASSWORD 설정: no
  - Anonymous Users 삭제 여부: no
  - 원격 IP 접속 허용 여부: yes
  - 기본 DB인 test 유지 여부: no
  - 변경된 설정 내역을 즉시 적용 여부: yes

  

- MySQL 접속

  ```jsx
  $ mysql -h localhost -u root -p
  // 임시 비밀번호: mysql
  ```



### Node.js에서의 설정

1. 필요한 패키지 설치 및 초기화

   ```jsx
   $ yarn add sequelize sequelize-cli mysql2
   $ yarn add -D ts-node @types/express @types/express-session @types/node
   
   $ npx sequelize init
   ```

   - `mysql2`: node.js와 MySQL을 연결해주는 드라이버 (sequelize가 내부적으로 mysql2 사용함)

   - `sequelize`: 자바스크립트로 SQL을 조작할 수 있게 해주는 라이브러리

   - `npx sequelize init`: sequelize 셋팅 (config, models, seeders, migrations 디렉토리 생김)

     

2. 설정

   - 생성된 `config/config.json` 의 확장자를 `ts`로 변경 (mysql 비밀번호를 넣어놔야하는데, 이를 보호하기 위해 `dotenv` 라이브러리 사용! → 더 괜찮은 방법 있으면 알려주!)

     development, test, production 모드에 따라 다른 db를 사용할 수 있다.

     ```jsx
     // config/config.ts
     
     import dotenv from 'dotenv';
     
     dotenv.config();
     
     type ConfigType = {
       database: string;
       username: string;
       password: string;
       dialect: 'mysql';
       host: string;
     };
     
     interface ConfigTypes {
       development: ConfigType;
       test: ConfigType;
       production: ConfigType;
     }
     
     const config: ConfigTypes = {
       development: {
         database: 'sasil-dev',
         username: 'root',
         password: process.env.DB_PASSWORD!,
         dialect: 'mysql',
         host: '127.0.0.1',
       },
       test: {
         database: 'sasil-dev',
         username: 'root',
         password: process.env.DB_PASSWORD!,
         dialect: 'mysql',
         host: '127.0.0.1',
       },
       production: {
         database: 'sasil',
         username: 'root',
         password: process.env.DB_PASSWORD!,
         dialect: 'mysql',
         host: '127.0.0.1',
       },
     };
     
     export default config;
     ```



- `models/index.ts`에서 `sequelize` 객체 생성.

  ```jsx
  // models/index.ts (node.js와 MySQL 연결만)
  
  import { Sequelize } from 'sequelize';
  import config from '../config/config';
  
  // 타입
  type EnvType = 'production' | 'test' | 'development';
  interface DBType {
  	// 나중에 DB 타입 추가
    [key: string]: any;
  }
  
  const env = (process.env.NODE_ENV as EnvType) || 'development';
  
  // sequelize가 node와 mysql 연결, sequelize에 연결정보 담겨있음
  const sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    config[env]
  );
  
  // 아직 db안에 테이블이 존재하지 않음
  const db: DBType = {};
  
  db.sequelize = sequelize; // 연결정보를 db에 넣기
  db.Sequelize = Sequelize; 
  
  export default db;
  ```

  

- `app.ts`에서 `sequelize` 객체를 이용해 서버 동작시키기

  ```jsx
  // app.ts
  
  import express from 'express';
  import dotenv from 'dotenv';
  
  import db from '../models';
  
  dotenv.config();
  
  const prod: boolean = process.env.NODE_ENV === 'production';
  const app = express();
  app.set('port', prod ? process.env.PORT : 3065);
  
  db.sequelize
    .sync({ force: true }) // { force: true }
    .then(() => {
      console.log('db연결 성공');
    })
    .catch(console.error);
  
  app.listen(app.get('port'), () => {
    console.log(`server is running on ${app.get('port')}`);
  });
  ```



### 데이터베이스 생성 및 연결

1. **Connection 생성하기**

   MySQL WorkBench를 들어가면 아래와 같은 화면이 나온다.

   <img src="https://user-images.githubusercontent.com/70627979/155894608-c2bc2fb9-4996-401d-a1ec-3f43422532dd.png" alt="image" style="zoom:50%;" />

   위 빨간색으로 표시된 +버튼을 누르면 아래와 같은 화면이 나오는데, Connection Name은 데이터베이스 이름과는 상관없으므로 마음대로 만든다.

   (비밀번호를 매번 들어갈 때마다 입력하기 귀찮으면 `Password의 Store in Keychain`을 클릭해주면 된다.)

   <img src="https://user-images.githubusercontent.com/70627979/155894629-a3dd7817-b98b-46f3-adbf-ed0a0a9f20af.png" alt="image" style="zoom: 67%;" />

   

2. **데이터베이스 생성하기**

   ok버튼을 누르고, 생성된 Connection을 클릭해 들어가면 아래와 같은 화면이 나온다.

   <img src="https://user-images.githubusercontent.com/70627979/155894655-045c7d49-9569-40d8-a80a-07621d4ae2ac.png" alt="image" style="zoom:50%;" />

   화살표가 가리키는 영역을 우클릭해 `Create Schema`를 클릭하면 아래와 같은 화면이 다시 나온다.

   <img src="https://user-images.githubusercontent.com/70627979/155894673-3155c8e9-6763-486d-8caf-737f1e9a1382.png" alt="image" style="zoom:67%;" />

   `Schema Name`이 생성할 데이터베이스 이름이고, 아래의 `Character Set`, `Collation`을 이미지와 같이 설정하면 된다. (`utf8mb4`는 데이터베이스에서 한글, 이모티콘을 저장할 수 있게 해주는 옵션이다.)

   `config.ts`에서 development, test 전용 데이터베이스 이름을 sasil-dev로 설정했으므로 이름이 sasil-dev인 것이다. (만약 production 모드를 돌려보고 싶다면 새로운 데이터베이스를 만들어주면 된다. → 물론 dev, test, prod 모드가 모두 같아도 되지만 구분하고 싶어서 이렇게 해놨음, 의견 바람)

   

3. Node.js에서 Sequelize와 MySQL의 연결 확인하기

   이제 터미널 창에 `yarn dev` 를 입력하면 연결 성공 화면을 볼 수 있다.

   <img src="https://user-images.githubusercontent.com/70627979/155894687-0f647f13-51e6-4402-810e-fbab0b4d700a.png" alt="image" style="zoom:50%;" />



### 🔥 마주쳤던 오류

사실 위에서 진행했던 데이터베이스 생성은 Node.js에서 `npx sequelize db:create` 명령으로 쉽게 생성할 수 있다.

하지만 아래와 같은 오류들을 마주쳤었고, 결국 극복해내지 못해 직접 생성하는 방식을 선택했다. (솔직히 직접 만드는게 너무 쉽고 간단해서 뭣하러 오류때문에 고생했나 후회중..)

1. password 보호를 위해 `config.json` → `config.ts`

   `npx sequelize init` 을 실행시키면 `config/config.json` 이 생성되는데, 아래와 같이 비밀번호가 노출이 된다.

   ```jsx
   {
     "development": {
       "username": "root",
       "password": null, // 으악!
       "database": "database_development",
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     "test": {
       "username": "root",
       "password": null,
       "database": "database_test",
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     "production": {
       "username": "root",
       "password": null,
       "database": "database_production",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```

   그래서 `dotenv` 라이브러리를 이용하기로 결정했고, dotenv 라이브러리를 불러오기 위해서는 `config.json` 파일을 JS/TS 확장자로 변경시켜야 했다.

   여기서 바로 문제점이 발생하는데, `npx sequelize db:create` 를 실행시키면 `config.json` 파일 내놓으라는 오류 코드가 나온다.

   ![image](https://user-images.githubusercontent.com/70627979/155894712-0e2a867a-2a1d-44e6-a352-42414e70a05e.png)

   이 오류는 다행히 해결했는데, 방법은 root에 `.sequelizerc` 파일을 생성하고 아래 코드를 추가해주었다.

   ```jsx
   module.exports = {
     "config": "./dist/config/config.js"
   }
   ```

   그러면 이제 config.json이 아니라 config.js를 봐주세요 하고 부탁을 했는데, 자세히 보니 위치가 dist 폴더로 설정되어 있다. 이는 2번 오류와 연결된다.

   

2. typescript 파일은 읽기 싫어!

   ```jsx
   module.exports = {
     "config": "./config/config.ts"
   }
   ```

   처음에는 그냥  `.sequelizerc` 에서 `config/config.ts` 파일을 가리키도록 설정했는데, 바로 아래와 같은 오류가 떴다.

   ![image](https://user-images.githubusercontent.com/70627979/155894769-39b2f252-fd87-47bb-87f0-2ee69dfa30aa.png)

   음, 타입스크립트 파일로 설정해줘서 문제가 생긴거구나 하고, config/config.ts가 build된 후 생성되는 자바스크립트 파일을 지정해주면 되겠지싶어서 위치를 `./dist/config/config.js`로 지정해주었다. 그랬더니 파일을 읽지 못하는 문제는 사라졌고, 또 다른 오류가 나를 찾아왔다.

   (혹시`.ts` 확장자로 지정해줘서 문제가 생긴건가 하고 `config/config` 로 설정도 해봤지만, 이 방식은 아예 읽지를 못한다.)

   

3. 이건 뭐야...?

   <img src="https://user-images.githubusercontent.com/70627979/155894794-aa166d5e-17ae-4741-8012-74ec301d9c2a.png" alt="image" style="zoom: 50%;" />

   갑자기 `Dialect`가 `undefined` 되어있어서 동작하지 않는다고 한다. 하지만 난 `dialect`를 `mysql`로 분명히 설정해주었고, `dist/config/config.js` 파일에 들어가서 console 찍었을 때도 정상적으로 동작했다.

   심지어 아무리 구글링하고 이것저것 해봐도 문제가 풀리지 않아 `config.ts` 파일을 `config.js` 파일로 바꾸고 `.sequelizerc` 에서 `./config/config.js`로 설정하고 실행시키니 정상적으로 생성된다...

   그냥 js파일로 냅둘까도 생각했지만, `config.ts` 파일이 데이터베이스 생성할 때 뿐만이 아니라 연결하고 테이블을 생성될 때도 사용되는거라 오류가 계속 떠있는 상태인 js파일은 문제가 된다. (build할 때 오류뜸..ㅎ)

   ![image](https://user-images.githubusercontent.com/70627979/155894803-411cbba9-973e-4c0a-b583-a628a915a5f4.png)

그래서 최종적으로 선택한 방식은 결국 데이터베이스를 **직접 생성하기**이다...

많은 시간이 걸리기도 했고, dialect 설정도 분명히 해줬기 때문에 매우 억울하긴 했지만.. 검색해도 안나오고 공식문서도 이것저것 뒤져봤지만 나오지 않아 해결방법을 도저히 못찾겠다ㅠㅠ

혹시 누군가 찾는다면 알려주시길...