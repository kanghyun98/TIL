# CSS !important

CSS에서는 같은 요소에 같은 속성이 여러번 부여되면, 제일 마지막에 받은 속성이 최종적으로 적용된다.



h1요소의 class가 "title"인 경우를 예로 들어보자

```css
h1 {
    color: blue;
}

.title {
    color: red;
}
```

 h1 요소에는 `color: red`가 적용된다.



그런데 `color: blue`를 주고싶은 상황이 생기게 된다면 어떠할까?



일반적이지는 않은 상황이지만, 그런 상황에는 속성에 `!important` 를 붙여서 사용하면 된다. 

```css
h1 {
    color: blue !important;
}

.title {
    color: red;	
}
```

 red 가 나중에 정의되었지만, `!important` 때문에 blue가 선택된다.



위와 같이 **CSS의 기본 규칙을 어기고, 강제로 우선순위를 적용하는 경우** !important가 사용된다.

**이 방법은 CSS 소스 코드를 복잡하게 만들고, 특히 !important를 남발하게 되는 경우 디버깅이 어려워져 권장되지 않는다.**



참고 자료

- https://www.w3schools.com/css/css_important.asp