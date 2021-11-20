# Prettier

code formatter

개인 편의에도 도움되지만, 개발자간 협업할 때 Prettier 설정을 통일시켜줌으로써 코딩을 보다 쉽게 이해할 수 있다.



## MY

**.prettierrc** 파일을 최상위 디렉토리에 생성

```
{
  "singleQuote": true, 		// 따옴표 '' or ""
  "tabWidth": 2,				// 들여쓰기 크기
  "trailingComma": "all",		// none or es5 or all : 맨 마지막 줄에 쉼표
  "printWidth": 120,
  "semi": true,				// 세미콜론 ;
  
  "arrowParens": "always",	// arrow function의 파라미터에 괄호 유무
  "useTabs": false,			// 탭 사용 여부?
  "parser": "typescript"   // 해줘야 하나?
 } 
```

ctrl + , 를 누르고, Format On Save 검색 후 체크.

수동: Ctrl + Shift + P 누르고, Format Document 입력