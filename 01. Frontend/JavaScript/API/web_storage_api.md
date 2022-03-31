# Web Storage API

일시적인 정보를 서버에 저장하는 것은 비효율적이므로, 클라이언트에 저장할 수 있는 Web Storage 활용

과거: 쿠키 / HTML5 이후: Web Storage



## 두 가지 저장소

- ### **Local Storage**

  - 직접 데이터를 삭제하지 않는 한 계속 유지된다.

    

- ### **Session Storage**

  - 페이지 세션이 유지되는 동안 데이터가 유지된다.

Storage 객체는 단순한 **key-value 저장소**이며, 이는 객체와 비슷

이 데이터들은 페이지 로딩에도 온전하게 유지

key와 그 value는 항상 **문자열** (만약 정수로 키를 사용할 경우 이는 자동으로 string으로 변경)