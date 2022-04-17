# 시맨틱 웹

- Semantic Web은 의미론적 태그를 사용한 HTML로 구현된 웹으로, HTML 각 요소의 의미에 맞게 HTML을 작성하는 것이 중요하다.

  

  ## **그렇다면 왜 귀찮게 의미를 부여하면서까지 태그를 작성하는 것일까?**

  처음에 시맨틱 태그라는 말을 들었을 땐, 개발자가 웹페이지의 유지보수를 쉽게 만들기 위해 사용되겠지라고 생각했다. 그러다 우연히 [이 글](https://soeunlee.medium.com/시맨틱하게-html을-짠다는-것-90612ffc988e)을 읽게 되었는데, 시맨틱 태그로 **유지보수** 뿐만 아니라 **검색 엔진 최적화(SEO)**, **웹 접근성(Accessibility)**을 높일 수 있다는 것을 배울 수 있었다.

  

  지금 당장 코드를 짜고 웹사이트를 구현하는데 있어서 시맨틱 태그가 문제가 되는 것은 아니지만, 웹사이트 존재의 이유(코딩을 하는 목적)를 생각해본다면 가볍게 여겨서는 안될 요소라고 생각이 들었다.

  

  아래는 MDN에 정리되어있는 시맨틱 태그 관련된 글을 간단하게 정리한 내용들이다.

  

  ## **문서의 기본 섹션과 HTML 요소**

  - **header** : 큰 제목과 로고 등 <header>
  - **navigation bar** : 목차 등(header와 분리하는 것이 좋음) <nav>
  - **main content** : 메인 내용 <main>
  - **sidebar** : 주변 정보, 링크, 인용 부호, 광고 등 <aside>
  - **footer** : 저작권 정보, 연락처 등 <footer>

  

  #### 헷갈리는 개념 

  (나중에 더 정리할 계획)

  <**article**> : 문서, 페이지, 애플리케이션, 또는 사이트 안에서 독립적으로 구분해 배포하거나 재사용할 수 있는 구획

  <**section**> : HTML 문서의 독립적인 구획을 나타내며, 더 적합한 의미를 가진 요소가 없을 때 사용

  (요소의 콘텐츠를 외부와 구분하여 단독으로 묶는 것이 나아보인다면 <article> 요소가 더 좋은 선택)

  -> 아래 MDN 자료 참조

  

  더 많은 내용들은 아래 두 개의 MDN 링크에 정리되어 있다. (한글 번역되어 있으니 확인하세요!)

  - [HTML elements reference: html tag 등](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
  - [Document and website structure: 구조](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)