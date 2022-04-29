# Passport

## Passport 사용 이유

프로젝트에 소셜로그인을 도입하기 위해 Node.js + Express 환경에서 사용하기 좋은 `passport` 라이브러리를 사용하였다.

최종적으로는 `passport` 라이브러리 없이 각 소셜의 공식 문서에 나와있는 방식을 사용했지만, `passport` 라이브러리를 사용하면 소셜로그인을 매우 간단하게 구현할 수 있었고, 다음에 웹에서 소셜로그인을 구현할 때 사용하기 위해 정리하였다. 

간단한 이유는 `passport`에서 거의 모든 소셜로그인 구현을 통합된 방식으로 사용할 수 있게 만들어놨기 때문이다.

(→ `passport` 라이브러리를 사용하지 않은 이유는 진행했던 프로젝트가 웹과 모바일 모두 사용했는데, 모바일에서는 `passport` 라이브러리를 사용하는 방식이 불가능했기 때문이다. 물론 모바일 내에서 로그인을 웹뷰로 구현했다면 가능했겠지만, UI/UX를 생각하여 네이티브 방식을 사용하기로 해서 라이브러리 없이 구현하였다.)



## 구현

개발자 등록하고, 설정하는 단계는 건너뛴다.

프로젝트에서는 구글, 카카오, 애플 로그인을 구현하였고, 위에서 말했던대로 코드가 거의 다 비슷해서 가독성을 위해 구글 로그인의 코드만 적었다.



우선 기본이 되는 `passport` 와 관련 라이브러리들을 설치하면 된다. ([라이브러리 종류](https://www.passportjs.org/packages/))

나는 구글, 카카오, 애플을 구현하기 위해 `passport-google-oauth`, `passport-kakao`, `passport-apple` 라이브러리를 사용하였다.

```js
$ yarn add passport-google-oauth passport-kakao passport-apple
```



이제 위 라이브러리들을 사용해서 각각의 로그인 전략을 `passport.use()` 함수를 통해 등록할 수 있는데, 이따 routes 파일에서 이 전략들을 사용해서 소셜로그인을 완성할 수 있다.

구글로그인의 경우 `new GoogleLoginStrartegy()`로 전략을 생성할 수 있으며, 첫 번째 인자로는 개발자 등록 및 앱 등록을 하면서 받아온 정보들을 입력해주면 된다.

두번째 인자는 로그인을 시도한 사용자가 실제로 해당 소셜에 존재하는 유저라는 것을 인증받은 후 (`passport에서` 이 부분을 알아서 처리해줌), 해당 소셜에서 사용자 정보를 받아와 처리하는 부분이다. 소셜로그인 종류마다 파라미터 종류가 약간씩은 다를 수 있지만, 전반적인 흐름은 동일하다. (보통 공식문서에 잘 나와있으니 확인)

나는 아래의 흐름으로 전략을 세웠다. 

1. 소셜에서 받아온 이메일 정보를 가지고 DB에서 해당 유저가 존재하는지 확인
2. 존재하면 바로 로그인 성공
3. 존재하지 않으면 해당 정보로 자동 회원가입 처리 후 로그인 성공
4. 로그인 성공 시, 유저 정보로 세션id 만들어 쿠키를 생성할 수 있도록  `done(null, userData)`로 데이터를 넘겨준다.

```js
// src/auth/strategy.ts

import passport from 'passport';
import { OAuth2Strategy as GoogleLoginStrategy } from 'passport-google-oauth';
import { Strategy as KakaoLoginStrategy } from 'passport-kakao';
import AppleLoginStrategy from 'passport-apple';
import dotenv from 'dotenv';

import { DEV_SETTING, PROD_SETTING } from '@/constants/index';
import { getUserByLoginInfo, addUser } from '@/database/controllers/user';

dotenv.config();

export const GoogleStrategy = (isProdMode: boolean) => {
  passport.use(
    new GoogleLoginStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: isProdMode
          ? PROD_SETTING.redirectURI.google
          : DEV_SETTING.redirectURI.google,
      },
      (accessToken, refreshToken, profile, done) => {
        // 사용자 정보는 profile에 들어있다.
        if (profile.emails) {
          const email = profile.emails[0].value;
          const loginType = 'google';

          let userData = getUserByLoginInfo(email, loginType);
          if (!userData) {
            userData = addUser(email, loginType);
          }

          done(null, userData);
        }
      },
    ),
  );
};

// Kakao, Apple Login도 위 방식과 거의 유사하다. (공식문서 참고!)
// Kakao Login
export const KakaoStrategy = (isProdMode: boolean) => {
  passport.use(
    new KakaoLoginStrategy(
      // ...
    ),
  );
};

// Apple Login
export const AppleStrategy = (isProdMode: boolean) => {
  passport.use(
    new AppleLoginStrategy(
      // ...
    ),
  );
};
```



위에서 생성한 전략들을 포함하여 관련 설정들을 초기화할 수 있는 함수 `configurePassport()`를 `auth/index.ts` 파일에 만들었다.

- `passport.initialize()` : passport를 미들웨어로 사용하겠다는 선언 (req 객체에 passport 설정들 입력)
- `passport.session()` : `req.session`에 passport의 정보들을 저장 (`req.session`은 `express-session`을 통해 생성되니, `express-session` 미들웨어 아래에 위치해야 한다.)
- `serializeUser`: 선택한 `user.id`값을 직렬화를 통해 세션에 저장될 수 있는 포맷으로 바꾼 뒤 `req.session`(세션) 객체에 저장), 로그인시에 딱 한번 실행한다.
- `deserializeUser`: `req.session`(세션)에 저장된 `id`를 통해 메모리에 저장된 `id`를 찾아서 가져오고, 해당 `id`와 연결된 `user.id`를 이용해 user 정보 불러와 반환한다. 조회된 결과값은 `req.user`에 담김, 페이지를 이동할때마다 (`passport.session()`이 실행될때마다) 호출한다.

```js
// src/auth/index.ts

import { Application } from 'express';
import passport from 'passport';

import { KakaoStrategy, GoogleStrategy, AppleStrategy } from '@/auth/strategy';
import User from '@/database/entity/user';
import { getUserById } from '@/database/controllers/user';

const configurePassport = (app: Application, isProdMode: boolean) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const userData = await getUserById(id);
      if (userData) {
        done(null, userData);
      } else {
        throw new Error('User does not exist');
      }
    } catch (error) {
      done(error);
    }
  });

  KakaoStrategy(isProdMode);
  GoogleStrategy(isProdMode);
  AppleStrategy(isProdMode);
  
  app.use(passport.initialize());
  app.use(passport.session());
};

export default configurePassport;
```



이제 `app.ts`에서 위에서 만든 `configurePassport()`를 사용해 미들웨어로 등록시키면 라우터에서 소셜로그인 인증을 사용할 수 있다.

```js
// app.ts

...

// Cookie(sessionId 생성)
app.use(cookieParser(process.env.COOKIE_SECRET));

// Session
app.use(
  session({
    secret: process.env.COOKIE_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProdMode,
    },
  }),
);

// passport
configurePassport(app, isProdMode);

// routers
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(app.get('port'), () => {
  console.log(`server is running on ${app.get('port')}`);
});
```



이제 위에서 만든 소셜로그인 전략을 routes에 불러와서 사용할 수 있다.

이제 `/google`로 요청을 보내면 소셜로그인 창이 뜨면서 해당 소셜에서 로그인을 할 수 있고, 로그인 성공을 하면 /google/callback (내가 설정한 값)으로 인증코드를 보내주고, 해당 코드를 가지고 passport 내부에서 실제 소셜의 유저가 맞는지 판단한 후 로그인 전략을 실행시킨다.

```js
// src/routes/auth.ts

import express from 'express';
import passport from 'passport';

const router = express.Router();

// 각 소셜 로그인 페이지
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);
router.get('/kakao', passport.authenticate('kakao'));
router.get('/apple', passport.authenticate('apple'));

// 각 소셜 로그인 페이지에서 로그인 성공 후, 
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/'
  })
);

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
  	// ...
  }),
);

router.get(
  '/apple/callback',
  passport.authenticate('apple', {
  	// ...
  }),
);

export default router;
```

로그인 요청 성공 시 한번에 유저 데이터를 넘겨줄 수 도 있고, 이번 요청에는 쿠키에 세션 정보만 넘기고, 해당 쿠키 정보를 사용해 유저 정보를 따로 요청할 수 있다.



참고자료

- https://www.passportjs.org/