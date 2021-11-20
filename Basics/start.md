시작할 때 맨날 헷갈려서 정리

npm, node 설치 여부 확인

```
$ npm -v
$ node -v
$ yarn -v (이건 선택)
```



시작

```
$ npm init
```



이후에 원하는 패키지 다운로드



## Next + TypeScript

##### 기본 설치

```
// 직접 설정
$ yarn add next react react-dom
$ yarn add --dev typescript @types/react @types/node
$ touch tsconfig.json

// 자동 설정
$ yarn create next-app --typescript (npx create-next-app --typescript)
```



##### ESLint, Prettier, TypeScript 관련 설치 (TIL의 ESLint 참고)

```
$ yarn add eslint prettier eslint-plugin-prettier eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-config-airbnb-base eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks -D
```



##### tsconfig.json 설정 (TIL의 TypeScript 참고)

```
{
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "noImplicitAny": true,
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
    "exclude": ["node_modules"]
  }
```



##### .eslintrc.json 설정 (TIL의 Eslint 참고)

```
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'linebreak-style': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,	// 함수 return 타입 오류
    'import/extensions': 0,		// import에서 확장자 오류
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



##### .prettierrc 설정 (TIL의 Prettier 참고)

```
{
    "singleQuote": true, 		
    "tabWidth": 2,				
    "trailingComma": "all",		
    "printWidth": 120,
    "semi": true,
    "arrowParens": "always",
    "useTabs": false,
    "parser": "typescript" 
}
```



### 스타일

##### Emotion.js

```
$ yarn add @emotion/react @emotion/styled
```



##### ant.design

```
$ yarn add antd @ant-design/icons
```

