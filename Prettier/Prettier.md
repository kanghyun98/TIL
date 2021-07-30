# Prettier

code formatter

개인 편의에도 도움되지만, 개발자간 협업할 때 Prettier 설정을 통일시켜줌으로써 코딩을 보다 쉽게 이해할 수 있다.



## MY

**.prettierrc** 파일을 최상위 디렉토리에 생성

```
{

  "singleQuote": true, 		// 따옴표 '' or ""

  "parser": "typescript",   // 해줘야 하나?

  "semi": true,				// 세미콜론 ;

  "useTabs": false,

  "tabWidth": 2,				// 들여쓰기 크기

  "trailingComma": "all",		// none or es5 or all : 맨 마지막 줄에 쉼표

  "printWidth": 100,

  "arrowParens": "always"

 } 
```

ctrl + , 를 누르고, Format On Save 검색 후 체크.

수동: Ctrl + Shift + P 누르고, Format Document 입력