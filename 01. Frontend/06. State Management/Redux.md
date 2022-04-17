# Redux

전역 상태 관리 라이브러리 (중앙 데이터 저장소)

리액트와 사용하기 위해 만들어졌지만, 리액트 없이도 사용할 수 있다.

### 전역 상태 관리가 필요한 이유

프로젝트를 만들다보면 로그인이나 게시물 작성 등과 같이 상태(State)를 관리해야하는 경우가 많이 생긴다. React 함수형을 사용하는 경우, React Hooks의 useState를 이용해 컴포넌트간에 상태(State)를 주고받으며 관리할 수 있다. 하지만 프로젝트의 크기가 커질 수록 컴포넌트간에 상태를 주고받으며 관리하기 힘들어져 해결방안이 필요했다.

매번 부모 컴포넌트에서 상태(State)를 정의하고 하위 컴포넌트에 수동적으로 전달하는 방식을 개선하고자 중앙 데이터 저장소 방식(`Redux`, `Mobx`, `Apollo`, `Context API`등)이 고안되었다.

### 어떤 전역 상태 관리 라이브러리가 있는가?

꼭 전역 상태 관리 라이브러리로 리덕스를 선택할 필요는 없다.

프로젝트의 규모가 매우 작다면 useState를 사용하고, 규모가 작지만 전역 상태 관리가 필요하다면 Context API(비동기 지원x), GraphQL을 사용한다면 Apollo를 사용해도 되니 상황에 따라 판단해서 라이브러리를 선택하면 된다.

다만 Redux와 MobX를 사용하면 비동기 절차가 자동 구현되고, 두 라이브러리 모두 인기가 많아 관련 자료가 많이있어 유리하다. (Context API 사용 시, 데이터 요청, 성공 및 실패 시 처리 등을 직접 구현해야 한다.)

제로초 님의 의견에 따르면, Redux를 사용하다가 React와 상태관리에 익숙해지면 생산성 향상을 위해 MobX를 사용하는 것을 추천한다고 한다. (Redux가 코드가 많이 필요함)



#### 리덕스?

- 원리가 간단해 에러 추적(tracking)이 용이하다(앱의 안전성 확보)
- 코드가 많음
- 위 두개와 반대되는 것이 MobX
- 중앙 저장소는 서버에서 데이터를 많이 받아오기 때문에 비동기(오류 대비 필요)

- 앱의 규모가 커지면 reducer를 쪼개줘야하는 작업 필요



### 설치 패키지

- redux
  - `compose` (MiddleWare 생성 시 사용(배포 모드))
  - `applyMiddleware` (미들웨어 적용?)
  - `createStore` (`reducer`와 `enhancer`(미들웨어 추가하기 위한 확장)를 이용해 저장소 만듦)
- react-redux
  - `useSelector`(state 불러오는 역할)
  - `useDispatch`(action을 이용해 store에 정보 보내주는 역할 )
  -  `Provider`(<Provider store={store}>로 페이지 감싸줘야하는데, next에서는 자동으로 처리해줌)
- next-redux-wrapper
  - `createWrapper`(configureStore와 다른 설정들 묶어 wrapper로 만들고,  `export default wrapper.withRedux(App);` 로 페이지를 감싸준다.)
  -  `HYDRATE`(Redux가 SSR이 되도록 만듦)
- redux-devtools-extension
  - `composeWithDevTools`(Redux devtools를 사용하기 위해 설치(개발자 모드))

```
$ yarn add redux react-redux next-redux-wrapper redux-devtools-extension
```



### 구조 & 작동 순서

`state`, `action`(어떤 것을 할 것인가?), `dispatch`, `reducer`(해당 액션이 무엇인가를 정의 with `switch`문)

`state`와 `reducer`를 합쳐 `store`라 부른다.

1.  `reducer`를 정의(`state`와 `action`에 따른 행동 정의)
2. 가져온 `reducer`와 Redux 관련 설정(미들웨어 추가 등)으로  `createStore()`을 이용해 `store` 생성
3. `useDispatch()`에 `action`을 불러와, 상태 업데이트
4. `useSelector()`를 이용해, 상태 구독



### 중요한 점

state를 업데이트할 때 **비구조화 할당**을 잘 이용해야하는데, 그 이유는 **state의 불변성**과 **메모리 데이터의 절약**을 위해서이다.

- state의 안정성과 추적을 위해 state의 값을 가져와 변경하는 것이 아닌, 새로운 객체로 상태를 업데이트 해줘야한다.
- 매번 업데이트 시, state안의 모든 값들을 새롭게 생성하면 메모리 낭비가 심해지므로, 비구조화 할당을 이용해 얕은 복사가 이루어지게 한다.

-> immer로 해결 가능

### Reducer 쪼개기

초기  reducers 디렉토리의 index.js는 모든 `initialState`, `action creater`, `reducer(switch문)` 등이 포함되어 있어 코드의 길이가 길어진다.

가독성을 위해 reducer를 쪼개 관리하는데, state도 함께 찢은 후에 index에서 다시 합쳐저 사용하는 방식으로 작동한다.

그렇기 때문에, 찢어진 파일들마다 `initialState`와 `action creater`, `reducer`가 포함되어 있으며 해당 `reducer`를 export 한다. index.js에서는 `combineReducers()`를 이용해 `reducer`함수를 합쳐주는데, **각 `reducer`에서 return된 `state`도 하나로 합쳐져 동작한다.**



### Redux를 SSR로 만들기

위에서 `HYDRATE`를 이용해 Redux에 SSR을 더해준다고 하였다.

이를 위해 index.js에서 `reducer`안의 `combineReducers()` 함수 매개변수에 객체가 추가되는데, 이는 key값은 `index`, value는 `case HYDRATE:`인 reducer 함수이다.

``` js
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;

    default: {
      const combinedReducer = combineReducers({
        user: userReducer,
        post: postReducer,
      });
      return combinedReducer(state, action);
    }
  }
};
```



### 상태 추적

크롬의 Redux Devtools라는 확장 프로그램이 있는데, 이를 이용해 상태의 추적을 눈으로 확인할 수 있다.

다만, 이를 사용하기 위해서는 **액션이 리듀서로 전달되기 전후로 추가 작업을 실행해주는 함수**인 `MiddleWare`를 이용한 확장자를 store에 추가해줘야 한다.

```js
const configureStore = () => {
  // Redux 관련 설정
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);
  return store;
};
```

다만, 배포 모드와 개발 모드에서 사용하는 MiddleWare함수가 다르니 조심해야한다. (보안 이슈)



## Middleware란?

Redux의 기능을 확장해주는 확장자

redux-thunk와 같은 라이브러리를 Middleware로 쓸 수 있지만, 커스텀으로 만들어서 사용할 수 도 있다.

```js
// redux-devtools처럼 action 동작 시마다, 해당 action 출력하는 Middleware
function loggerMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
   	console.log(action);	
    return next(action);
  };
};

// 위 Middleware를 configureStore() 안에서 compose()와 applyMiddleware()를 이용해 적용시킬 수 있다. 

```

 



## Redux-Thunk

Redux의 MiddleWare로, Redux가 비동기 action을 dispatch할 수 있도록 도와준다.

```js
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

// 동기 action creator
function increment() {
  return {
    type: INCREMENT_COUNTER,
  };
}

// 비동기 action creator (with redux-thunk)
function incrementAsync() {
  return (dispatch) => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}
```



비동기 액션을 만들어줌으로써 dispatch()를 여러번 할 수 있다.

즉, 하나의 비동기 action 안에 여러 개의 동기 action을 넣을 수 있다는 것.

Redux-thunk가 구현해주는 것은 여기까지이며, 그 외에는 직접 만들어야 한다.



## Saga

### Generator

중단점이 있는 함수

```js
const gen = function*() {
	console.log(1);
	yield;			// 정지, {value: undefined, done: false}
	console.log(2);
	yield;			// 정지, {value: undefined, done: false}
	console.log(3);
	yield 4;		// 정지, {value: 4, done: true}
}

// gen().next()	// 실행 
const generator = gen();
generator.next();	// 1
generator.next();	// 2
generator.next();	// 3

```



### Saga에서의 Generator

무한의 개념, 이벤트 리스너처럼 활용 가능

```js
let i = 0;
const gen = function*() {
    while(true) {
        yield i++;
    }
}

// gen.next() 실행 마다 1씩 추가되면서 나옴
gen.next() // {value: 0, done: false} 
gen.next() // {value: 1, done: false}
```

**테스트**할 때 아주 편하기 때문에 사용한다.





### Saga Effects

- all: 배열로 받은 함수 전체 실행

- fork: 비동기 함수 호출
- call: 동기 함수 호출
- take: 첫 번째 argument로 오는 action 실행 후, 두 번째 argument의 함수 실행
- put: dispatch()와 동일한 역할



Redux-Saga의 Effects 간단한 예제

```js
import { all, fork, call, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {	// 'LOG_IN' action 전달
  try {
    const result = yield call(logInAPI, action.data);	// logInAPI(action.data)가 아님!
    
    // saga에서 내부적으로 next를 알아서 실행
    yield put({				// put()은 dispatch()와 같다고 보면 된다.
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: 'err.response.data',
    });
  }
}

function* watchLogin() {
  yield takeLatest('LOG_IN', logIn);
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT', logOut);	// logIn과 같은 템플릿으로 만들면 된다.
}

function* watchAddPost() {
  yield takeLatest('ADD_POST', addPost);	// logIn과 같은 템플릿으로 만들면 된다.
}

export default function* rootSaga() {
  yield all([
    // all()은 배열을 받고, 받은 배열들을 모두 실행
    fork(watchLogin), // fork()는 안의 함수를 실행(call() 대체 가능)
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}

```

Redux-Thunk에서는 비동기 action을 직접 실행했지만, Redux-Saga에서는 EventListener와 같은 역할을 한다.



> 위에서 **call과 fork의 차이**를 좀 더 들여다보면,

call 사용 시, 아래와 같이 **결과 값을 받고 다음 코드를 실행**하고  (동기 처리) (yield call == await 이라고 보면 된다.)

```js
function* logIn() {
  try {
    axios.post('/api/login')	// const result = yield call(logInAPI);	
      .then((result) => {
        yield put({				
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    })
   });
  ...  
}
```



fork 사용 시, 아래와 같이 **결과 값을 기다리지 않고 다음 코드를 실행**하는 것과 같다. (비동기 처리)

```js
function* logIn() {
  try {
    axios.post('/api/login')	// const result = yield fork(logInAPI);	
    yield put({				
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    });
	...
  }
}
```



> take에 대하여

take()는 첫 번째 argument인 action의 실행을 기다린 후, 두 번째 argument인 logIn 실행하는 함수이다.

take()의 문제점은 1회용 이라는 것인데, 이를 해결하기 위해 `while(true){}`로 코드를 감싸주어 해결할 수 있다.

```js
function* watchLogIn() {
	yield take('LOG_IN_REQUEST', logIn)
}
```



하지만 while문과 같은 반복문은 가독성이 떨어지기 때문에, saga에서는 `takeEvery()`를 제공해주고 있다.

while문으로 감쌌을 때와 같은 효과가 일어나는데, 문제는 action을 여러번 요청하면, 그 횟수 그대로 받아들인다는 것이다. 

뭐가 문제지 싶을 수도 있는데, 사용자가 logIn 버튼을 여러번 클릭하면 한번만 데이터를 요청하는 것이 아니라, 클릭한 횟수만큼 데이터를 요청하기 때문에 서버에 과부하가 오게 된다. 이런 셀프 디도스 프로그램을 해결하기 위해, saga에서는 `takeLatest()`를 제공해 가장 마지막에 요청한 값에 대해서만 서버에서 넘겨받는 방식을 이용할 수 있다. (만약 첫 번째 요청만 넘기길 원한다면, `takeLeading()`을 사용하면 된다.)

여기서도 문제가 있긴한데, Front에서 Back으로 요청하는 횟수를 줄이는게 아닌, 요청은 n번 그대로 하고 Back에서 응답을 하나만 받아오는 것이기 때문에, Back에서 중복된(같은) 데이터 요청이 여러번 들어오지 않는지 점검이 필요하다.

원한다면 throttle()을 이용해 n초 동안 데이터 요청 보내는 횟수를 제어할 수 있다.



### 파일

reducers / index.js, post.js, user.js

store / configureStore.js

sagas / index.js



components / UserProfile.js, PostCard.js



## Redux Toolkit

늘어나는 코드양과 복잡도를 해결하기 위해 

- `configureStore()`: `createStore`을 포함, configuration options 간단하게, `redux-thunk`가 default, Redux DevTools Extension 사용 가능

- createSlice()
- createAsyncThunk: 비동기 처리



## 궁금한 점

- `reducers/index.js`에서 `export default rootReducer`를 했는데, `store/configureStore.js`에서 `import reducer`로 해당 reducer를 가져옴.

  => export default ~ 를 가져올 때 해당 변수명을 수정해서 가져올 수 있다??

- reducer가 state를 포함하는건가??? 이상하네... redux devtools를 보면 reducer명이 state안의 data 명이 되어있다.

  => combineReducer(index, userReducer, postReducer) 이렇게 사용했는데, 객체에 추가할 때 key값을 생략하면서 value랑 key값이 동일하게 되면서 reducer명이 출력된 것. 

