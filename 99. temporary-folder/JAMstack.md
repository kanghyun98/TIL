# JAMstack

## 1.웹 개발 구조

![img](https://cdn.inflearn.com/public/files/courses/326897/units/75995/0a45a363-2b26-4848-bdc9-a6d05bbe367c/gatsby-lecture-1-1-2.png)

전통적인 웹은 DB/CMS에서 데이터 조회 및 저장, App Server에서 다양한 비즈니스 로직 처리, Web Server에서 처리한 데이터를 이용해 HTML 페이지를 생성하여 제작된다.

이러한 구조는 계층들이 강하게 결합되어 있어 의존성이 강하고, 별도의 서버 운영 비용이 필요하다.

-> serverless 개념 등장 (+ 이를 확장한 AWS, netlify, Firebase와 같은 function 단위의 서비스가 App server 대체)

JAMstack도 serverless 개발 구조에서 파생된 구조이다.



## 2. What is JAMstack?

- **Javascript**: 동적인 요소 처리

- **API**: 재사용 가능한 API
- **Markup**: <u>빌드 시 페이지 생성 (Prebuilt Pages)</u>



### JAMstack의 개발 구조

(위 이미지 참고)

**정적 사이트 생성기(Static Site Generator)**를 사용해 개발 및 구현(Build) -> 산출된 결과물을 CDN을 통해 전송

별도로 추상화된 함수, 서비스를 사용해 API 요청



## 3. JAMstack 장점

#### 1) 높은 안정성

정적 페이지를 미리 생성하여 렌더링하기 때문에 동적으로 변경되는 부분이 적고, 서버나 DB 실행x -> 공격 노출이 적음

#### 2) 빠른 성능

prebuilt되어있기 때문에 빠른 렌더링 가능, CDN을 통해 빠른 전송 및 캐시의 이점 가짐

#### 3) 확장성 및 낮은 비용

전세계 어디든 CDN을 통해 확장 가능, 정적인 HTML 페이지 호스팅 비용이 낮음.

#### 4) 쉬운 자동화

빌드 및 배포 과정을 쉽게 자동화 가능, 배포 과정이 단순함.



## 4. 정적 사이트 생성기 (Static Site Generator)

JAMstack 구현을 도와주는 프레임워크 또는 라이브러리

정적 사이트 생성기의 결과물: 정적 페이지

ex) Gatsby(React), Next.js(React), Nuxt.js(Vue.js), 11ty(Vanilla js), Hugo(Go), Jekyll(Ruby) 



## 5. Gatsby

- React.js 기반의 정적 사이트 생성기

- 다양한 데이터 타입 지원(JSON, YAML, 마크다운)

- GraphQL을 통한 데이터 조회



#### Data Flow

1. Data Sources (JSON, YAML, 마크다운 등)
2. Gatsby 플러그인을 통해 GraphQL 노드로 변환 (GraphQL 쿼리를 정의해서 조회)
3. React 컴포넌트에서 이를 사용
4. Prebuilt Pages



## 6. 동적인 컨텐츠

방법1) 틀을 미리 생성해놓고, 동적인 부분을 JavaScript로 렌더링

방법2) 동적 컨텐츠들을 위한 API or 저장소 (Third party APIs)

​	ex) algolia(검색 API)



## 7. 문제점

- 빌드 속도 (페이지가 많을 수록 오래걸림)
- 실시간 변경 콘텐츠

이러한 문제들을 해결하고자 Gatsby와 Next.js에서는 점진적 빌드라는 것을 개발하고 있다. 이를 이용해 빌드에 걸리는 시간이 대폭 감소하였으며, 점진적 빌드의 성장이 앞으로의 JAMstack에 큰 영향을 줄 것이다.



참고 자료

- https://www.youtube.com/watch?v=CTtoHa1g8I4