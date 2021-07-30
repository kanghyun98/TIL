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
$ npm i -D eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier
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

  