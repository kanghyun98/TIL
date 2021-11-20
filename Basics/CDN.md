# CDN

Content Delivery Network (컨텐츠 전송 네트워크)

> 서버와 사용자 사이의 물리적 거리를 줄여 웹 페이지 컨텐츠 로드 지연을 최소화하는, 분산된 서버로 이루어진 플랫폼

출처: [Akamai](https://www.akamai.com/kr/ko/cdn/what-is-a-cdn.jsp)



간단하게 이야기하면, 컨텐츠(사진, 동영상, 파일 등)을 본진에서 계속 받아오는 것이 아니라, 분산된 지점에 미리 뿌려져있는 컨텐츠를 받아오는 것으로, 본진까지 직접 가서 받아오지 않음으로써 로딩 시간이 단축된다.



### 작동 원리

1. 콘텐츠에 대한 각 요청이 발생하면 최적으로 배치된 CDN 서버에 엔드유저가 매핑되고, 해당 서버는 요청된 파일의 캐싱된(사전 저장된) 버전으로 응답

2. 서버가 파일을 찾는 데 실패하는 경우 CDN 플랫폼의 다른 서버((혹은 원본 서버)에서 콘텐츠를 찾은 다음 엔드유저에게 응답을 전송



### 기타

- CDN을 모든 네트워크가 이용하는 것은 아니고, CDN 관련 회사에 비용을 지불하고 이용하는 것이다.
- 캐시 알고리즘이 존재해 최적화된 CDN을 구축하고, 데이터를 받아올 수 있다.
