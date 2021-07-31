# Atomic Design

아토믹 디자인은 페이지를 디자인하는 것이 아닌, 컴포넌트 시스템을 디자인하는 것이다.



## Why

Atomic Design의 목적은 컴포넌트의 재사용성을 높이는 것으로, 컴포넌트를 기반으로 개발하는 React에 매우 적합해보인다.



## How

Atom 단위로 UI 컴포넌트를 쪼개고, 이를 합치면서 UI를 디자인(개발)한다.

컴포넌트 구조는 아래와 같다.

Atoms → Molecules → Organisms → Templates → Pages



### 1. Atoms (원자)

가장 작은 단위인 Atoms는 Label, Input과 같은 HTML 태그이다.

색상, 폰트와 같은 추상적인 요소들과 애니메이션과 같은 인터페이스의 보이지 않는 측면 등을 포함할 수 있다.

재사용성을 높이기 위해 Atoms에 해당하는 컴포넌트들이 특정 기능을 수행하지 않도록 만드는 것이 중요하다. 

ex) Button의 onClick에 해당하는 함수를 props로 전달받도록 만들기



### 2. Molecules (분자)

Atom의 조합들로 만들어낸 컴포넌트로, 그 자체의 특성을 가지고 있다.

ex) Label + Input 으로 FormInput 이라는 컴포넌트를 만들 수 있다.



### 3. Organisms (유기체)

Molecule과 Atom들의 조합으로 만들어진 컴포넌트.

Molecule은 작업할 수 있는 빌딩 블록을 제공하고 있어, 이를 결합하여 유기체를 형성할 수 있다.

ex) FormInput 여러 개와 버튼을 조합해 SignUpForm을 만들 수 있다.



Organisms는 서로 비슷하거나 아니면 서로 상이한 분자 유형으로 구성될 수 있는데, 예를 들어 "masthead" 유기체는 로고, 메인 네비게이션, 검색, 소셜 미디어 채널 리스트와 같은 다양한 컴포넌트로 구성될 수 있다. 그러나 "product grid" 유기체는 같은 분자(제품 이미지, 제품 제목 및 가격을 포함한)로 반복적으로 구성될 수 있다.



분자에서 유기체로의 구축을 위해선 컴포넌트가 독립적(standalone)이고, 기동성(portable)있고, 재사용(reusable) 가능하게 제작해야 한다.



## 4. Templates (템플릿)

템플릿 파일은 주로 페이지를 구성하기 위해 서로 꿰매어진 유기체 그룹으로 구성되며, 이 부분에서 디자인을 확인하고 레이아웃이 실제로 구동하는지 볼 수 있다.



## 5. Pages

템플릿의 특정 인스턴스. 해당 템플릿에 알맞은 컴포넌트를 주입하게 된다면, template에서 미리 만들어 놓은 레이아웃에 맞게끔 사용할 수 있도록 된다.

사용자 맥락에서 모든 것들을 살펴보면서 분자, 유기체 및 템플릿을 수정하여 실제 디자인의 context보다 더 나은 방법으로 개선할 수 있다.



참조 링크

- https://brunch.co.kr/@ultra0034/63
- https://medium.com/@inthewalter/atomic-design-for-react-514660f93ba?
- https://bradfrost.com/blog/post/atomic-web-design/#atoms