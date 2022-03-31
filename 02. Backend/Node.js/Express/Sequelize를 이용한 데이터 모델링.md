# Sequelize를 이용한 데이터 모델링

MySQL에서 테이블을 만드는 것이 아닌, Sequelize를 이용해서 MySQL의 테이블을 생성할 수 있다.

- 모델이름은 자동으로 소문자+복수형으로 변경되어서 저장된다. ex) User → users
- 속성 관련
  - `type`: 종류 (STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME 등)
  - `allowNull`: null값 허용 여부
  - `unique`: 고유한 값인지
- 관계형 테이블에 대하여
  - `hasMany`: 내 기준 1:n
  - `belongsTo`: 내 기준 n:1 (기준 테이블에 컬럼 생김)
  - `belongsToMany`: 내 기준 n:n (relation table 생성)
  - `through`: relation table 이름, `as`: 대상 테이블에 대한 별칭(in JS), `foreignKey`: 컬럼명 설정 (동일한 테이블 내에서 n:n 발생할 경우 사용)

### 예시

1. 데이터 모델링

   ```jsx
   // models/user.ts
   
   import { Model, DataTypes, Sequelize } from 'sequelize';
   
   class User extends Model {
     static initModel(sequelize: Sequelize) {
       return User.init(
         {
           loginId: {
             type: DataTypes.STRING(30),
             allowNull: false,
             unique: true,
           },
           password: {
             type: DataTypes.STRING(100),
             allowNull: false,
           },
           userName: {
             type: DataTypes.STRING(30),
             allowNull: false,
             unique: true,
           },
           name: {
             type: DataTypes.STRING(30),
             allowNull: false,
           },
         },
         {
           modelName: 'User',
           tableName: 'users',
           charset: 'utf8',
           collate: 'utf8_general_ci', // 한글 저장
           sequelize,
         }
       );
     }
   
     static associate(db: any) {
       db.User.hasMany(db.Post);
       db.User.hasMany(db.Comment);
       db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
       db.User.belongsToMany(db.User, {
         through: 'Follow',
         as: 'Followers',
         foreignKey: 'FollowingId',
       });
       db.User.belongsToMany(db.User, {
         through: 'Follow',
         as: 'Followings',
         foreignKey: 'FollowerId',
       });
     }
   }
   
   export default User;
   ```

   ```jsx
   // models/comment.ts
   
   class Comment extends Model {
     static initModel(sequelize: Sequelize) {
       return Comment.init(
         {
           content: {
             type: DataTypes.TEXT,
             allowNull: false,
           },
         },
         {
           modelName: 'Comment',
           tableName: 'comments',
           charset: 'utf8mb4',
           collate: 'utf8mb4_general_ci',
           sequelize,
         }
       );
     }
   
     static associate(db: any) {
       db.Comment.belongsTo(db.User); // UserId 생성
       db.Comment.belongsTo(db.Post); // PostId 생성
     }
   }
   
   export default Comment;
   ```

   

2. `models/index.ts`에서 위에서 구성한 테이블 구조들을 모아준다.

   ```jsx
   // models/index.ts
   
   import { Sequelize } from 'sequelize';
   
   import config from '../config/config';
   import Comment from './comment';
   import Hashtag from './hashtag';
   import Image from './image';
   import Post from './post';
   import User from './user';
   
   type EnvType = 'production' | 'test' | 'development';
   type DBType = {
     Comment: typeof Comment;
     Hashtag: typeof Hashtag;
     Image: typeof Image;
     Post: typeof Post;
     User: typeof User;
     [key: string]: any;
   };
   
   const env = (process.env.NODE_ENV as EnvType) || 'development';
   
   const sequelize = new Sequelize(
     config[env].database,
     config[env].username,
     config[env].password,
     config[env]
   );
   
   const db: DBType = { Comment, Hashtag, Image, Post, User };
   
   Object.keys(db).forEach((model) => {
     db[model].initModel(sequelize);
   });
   
   Object.keys(db).forEach((model) => {
     if (db[model].associate) {
       db[model].associate(db);
     }
   });
   
   db.sequelize = sequelize;
   db.Sequelize = Sequelize;
   
   export default db;
   ```

   

3. 서버 실행할 때, `DB`와 `sequelize`의 연결이 같이 실행될 수 있도록 `app.ts` 파일에 추가

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
     .sync() // { force: true }
     .then(() => {
       console.log('db연결 성공!');
     })
     .catch(console.error);
   
   app.listen(app.get('port'), () => {
     console.log(`server is running on ${app.get('port')}`);
   });
   ```