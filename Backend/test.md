- v5이후부터, 시퀄라이즈는 타입스크립트 정의를 제공하므로 별도의 @types/sequelize는 설치x

```
$ yarn add express dotenv mysql2 sequelize sequelize-cli
$ yarn add -D @types/express @types/node nodemon ts-node typescript
```



- 기본 파일 셋팅 (config, models, seeders, migrations 디렉토리 생성)

```
$ npx sequelize init
$ npx sequelize-cli init	// 뭔차이지?
```



- config/config.ts에서 mysql 연결 정보를 입력한다.

```ts
// config/config.js

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD!,
    database: 'olim',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD!,
    database: 'olim',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD!,
    database: 'olim',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
```

development, test, production 모드에 따라 다른 db를 사용할 수 있음



- models/index.ts에서 sequelize 객체 생성

```ts
const Sequelize = require('sequelize');

import config from '../config/config';

const env = (process.env.NODE_ENV as EnvType) || 'development';
const { database, username, password } = config[env];

export const sequelize = new Sequelize(
  database,
  username,
  password,
  config[env]
);
```



- 모델 생성 (ex. users)

```ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

import Post from './post';
import Comment from './comment';

interface UsersAttributes {
  userId: string;
  password: string;
  userName: string;
  name: string;
}

class User extends Model<UsersAttributes> {
  public readonly id!: number;
  public userId!: string;
  public password!: string;
  public userName!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    userId: {
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

User.hasMany(Post);
User.hasMany(Comment);
User.belongsToMany(Post, { through: 'Like', as: 'Liked' }); // 테이블명: Like
User.belongsToMany(User, {
  through: 'Follow',
  as: 'Followers',
  foreignKey: 'FollowingId',
});
User.belongsToMany(User, {
  through: 'Follow',
  as: 'Followings',
  foreignKey: 'FollowerId',
});

export default User;
```



- 

```js
import express from 'express';

import { sequelize } from './database/models/index';
import postRouter from './routes/post';

const app = express();
const prod = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3065);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('db연결 성공');
  })
  .catch(console.error);

app.use('/post', postRouter);

app.listen(app.get('port'), () => {
  console.log('서버 실행 중');
});
```

