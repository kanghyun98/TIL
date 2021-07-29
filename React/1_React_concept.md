# What is React?

## MVC

어플리케이션을 model, view, controller 각각의 레이어로 나눠서 코딩

리액트는 view 레이어를 담당한다.

→ model, controller를 담당하는 것은? :

model: DB, 정보가공 component

controller: 앱의 사용자로부터의 입력에 대한 응답으로 모델 및 또는 뷰를 업데이트하는 로직

**컴포넌트 단위로 이루어진 UI를 쉽게 만들 수 있게 도와주는 라이브러리 (UI 보여주고, Event 처리)**



### Component

한 가지의 기능을 수행하는 UI 단위

서로 독립, 고립, 재사용



## Framework and Library

### Framework

정해진 골격 안에서 원하는 기능을 구현(다양한 기능들이 하나에 묶여서 제공됨)

ex) Angular, Vue 등



### Library

작은 단위 안에서 원하는 기능을 구현(필요한 기능에 따라서 라이브러리 선택)

ex) React



## 중요 컨셉

1. Re-render

   state가 변경될 때마다 render 재실행

2. VDOM

   성능 up



### Virtual DOM

component를 전체 다 업데이트하면 어떠할까? → React (with virtual DOM)



브라우저에 실제로 보이는 DOM이 아닌, 메모리에 존재하는 가상의 DOM



Virtual DOM은 JavaScript 객체이므로 실제 DOM보다 훨씬 빠르게 작동한다.



리액트는 상태가 업데이트되면, 업데이트가 필요한 곳의 UI 를 Virtual DOM 을 통해서 렌더링, 실제 브라우저에 보여지고 있는 DOM 과 비교를 한 후, 차이가 있는 곳을 감지하여 이를 실제 DOM 에 패치



Virtual DOM 덕분에 복잡한 컴퍼넌트를 쉽게 구현할 수 있고, lifecycle부분을 제외하면 성능 부분에서 크게 신경 쓸 필요가 없다.



https://reactjs.org/docs/getting-started.html

https://create-react-app.dev/docs/getting-started