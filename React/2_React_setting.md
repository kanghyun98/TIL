# React 실습환경 구축, 배포

## 실습환경 구축

(npm대신 성능이 더 좋은 yarn으로 대체 가능)

npm을 사용해 React App을 설치하기 위해, node.js를 먼저 설치

(npm은 프로그램 설치, npx는 일회성 설치(실행할때 마다 설치, 최신버전 사용 가능))



**npm -v**  : 설치 버전 확인

**npm install -g create-react-app** : 설치,

(관리자 권한 없다고 뜰 시, sudo npm uninstall create-react-app)

**create-react-app -V** : 설치 버전 확인



**cd C:\Users\이강현\Desktop\study\react-app**

**create-react-app .**



vs Code terminal에서

**npm run start** : 브라우저에서 실행

**ctrl + c** : react 종료



React Router

npm add react-router-dom



### yarn

npm install yarn --global



## 배포

**npm run build** : 빌드에 사용할 파일들 생성

npm install -g serve : 웹 서버 설치 (npx serve -s build)



실제 서비스에는 build안에 있는 파일들을 쓴다.



nodeJS: 브라우저 밖에서도 자바스크립트 프로그래밍이 가능하게 하는 프레임워크

npm: package manager (설치, 업데이트)

npx: executing packages (실행)

yarn: package manager (성능 up, npm과 호환 가능)