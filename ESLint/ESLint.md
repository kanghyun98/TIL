# ESLint

문법 확인 도구

CRA(create-react-app)의 경우 기본으로 ESLint가 이미 적용되어 있다.



## My

```
.eslintrc.js

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    'linebreak-style': 0,
    'import/extensions': 0,
    'react/jsx-filename-extension': 0,
    'no-unused-vars': 1,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
```



## 방법 (airbnb)

### 설치

기본 셋팅 후에

#### 1) TypeScript, TypeScript-ESLint 관련 package 

```
# Typescript
$npm i -D typescript 

# ESLint
$npm -D eslint

# Typescript ESLint packages
$npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```



#### 2) React ESLint & Airbnb rule

Airbnb 설정에는 리액트 관련 규칙이 다 들어있는 `eslint-config-airbnb`와 리액트를 제외한 규칙이 들어있는 `eslint-config-airbnb-base` 두 가지가 있다.

서버와 같이 react 사용하지 않는 곳에서는 `eslint-config-airbnb-base`를 권장한다.

```
//eslint-config-airbnb 설치

$npm info "eslint-config-airbnb@latest" peerDependencies
$npx install-peerdeps --dev eslint-config-airbnb
```



### 3) Prettier 연동

Prettier와 ESLint 와의 충돌 방지

```
$npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

package.json 파일의 "eslintConfig" 부분 변경

```
  "eslintConfig": {
    "extends": [
      "react-app",
      "airbnb"
    ]
  },
```



`eslint-config-prettier` 적용

-> Prettier 에서 관리하는 스타일이 ESLint에서 비활성화



### 1,2,3 한번에

- 기본 셋팅 후, 아래 명령어 실행

```
$ npm i -D eslint prettier typescript eslint-plugin-prettier eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks  
```

- babel까지 할거면

```
$ npm i -D @babel@babel/core @babel/preset-env @babel/preset-typescript
```



- .eslintrc , .prettierrc파일 생성

- package.json의 scripts에 다음 추가

  ```
  "scripts": {
      "prettier": "prettier --write --config ./.prettierrc \"**/*.{ts,tsx}\"",
      "lint": "eslint './src/**/*.{ts,tsx}'",
      "lint:fix": "eslint --fix './src/**/*.{ts,tsx}'"
    },
  ```

- .eslintignore에 추가

  ```
  /node_modules
  ```




### VSCode ESLint 플러그인 관련 설정

1. VSCode의 [ESLint 플러그인](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 설치
2. VSCode에서 `ctrl` + `shift` + `p` / `cmd` + `shift` + `p` 키를 이용하여 명령어 실행 창 표시
3. 명령어 실행 창에 `open settings (json)` 입력 후 선택 (Preferences: Open Settings (JSON))

4. settings.json 파일에 추가

   ```
   {
     // ... <-- 기존 내용을 꼭 유지한 상태에서 아래 내용을 추가하고 이 주석은 제거할 것
     "editor.codeActionsOnSave": {
         "source.fixAll.eslint": true
     },
     "eslint.alwaysShowStatus": true,
     "eslint.workingDirectories": [
         {"mode": "auto"}
     ],
     "eslint.validate": [
         "javascript",
         "typescript"
     ],
   }
   ```

   

   





















