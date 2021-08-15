# GraphQL

기존의 REST API를 대체할 API

## GraphQL로 해결할 수 있는 문제

REST API의 아래 두 가지 문제점을 GraphQL로 해결할 수 있다.

1. over-fetching

   요청 외의 데이터까지 모두 받는 것

   REST API의 경우에는 데이터 테이블을 요청할 때 모든 것을 다 가져와 사용자가 무거운 데이터를 받게 만든다.

2. under-fetching

   필요한 데이터를 위해 여러 번의 request를 보내는 것

   테이블이 나눠져있는 경우, 여러번 보내서 원하는 데이터를 얻어낸다.

   

## 문제점

1. text 외의 것들은 처리하기 어렵다. (ex: 파일 전송)

   불가능한 것은 아니지만, 일반적인 GraphQL 서버에 비해 구조가 복잡해지고, 외부 서비스에 의존해야하는 경우가 생길 수 잇다.

2. 고정된 요청과 응답만 필요한 경우, 쿼리로 인해 REST API보다 요청의 크기가 커질 수 있다.

상황에 따라 REST API와 GraphQL 중 선택하여 사용하면 된다.



## Schema

사용자에게 보내거나 받을 data에 대한 설명(기술)

#### 1. Query

Database로부터 정보 수신 (REST API의 GET 메서드)



#### 2. Mutation

서버, DB, 메모리에서 데이터 변경 (REST API의 POST, PUT, DELETE 메서드)



#### 3. Subscription

실시간 통신 시 사용. Mutation에서 데이터를 조작할 때 그 값을 구독하여 실시간으로 변경사항을 확인할 수 있다.



## SQL과의 차이점

#### **SQL**

- **데이터베이스 시스템**에 저장된 데이터를 효율적으로 가져오는 것을 목적으로 함

- SQL의 statement는 백엔드 시스템에서 작성 및 호출

  ```sql
  // SQL 예시
  SELECT name, age FROM employee
  ```

#### **GraphQL**

- **웹 클라이언트**가 데이터를 서버로부터 효율적으로 가져오는 것을 목적으로 함

- 클라이언트 시스템에서 작성 및 호출

  ```js
  // GraphQL 예시
  {
    hero {
      name
      friends {
        name
      }
    }
  }
  ```

  

## REST API와의 차이점

![img](http://tech.kakao.com/files/graphql-mobile-api.png)

GraphQL을 사용하여 네트워크 호출을 한 번에 처리할 수 있다.

