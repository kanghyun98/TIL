# OAuth

OAuth는 인증 및 인가를 위한 프로토콜이며, 구글이나 카카오의 서비스를 다른 외부 서비스에서도 사용하기 위해 존재한다.



## 배경

OAuth가 존재하지 않는다면, 외부 서비스에서 구글의 서비스를 사용하기 위해서는 사용자의 구글 아이디와 비밀번호를 받아와야한다. 이렇게되면 당연히 보안 문제가 매우 커지게 된다.

그래서 OAuth가 탄생하였으며, 1.0a 버전부터 표준 프로토콜로 자리잡았다.



## 과정

- 웹사이트(외부 서비스): **Client** 
- 유저: **Resource Owner**
- 제공자(구글): **Resource Server**



### 1. 등록

내가 만든 앱(Client)에서 외부 서비스를 사용하기 위해서는 “등록" 절차가 필요하다. 이 과정은 해당 기능을 제공해주는 사이트(Google, Kakao, Apple 등)에서 직접 진행한다.

등록을 하면 Resource Server는 **Client ID,** **Client Secret**, **Authorized Redirect URIs**를 가지게 된다.

- **ClientID**: 어플리케이션 식별자
- **Client Secret**: 위 식별자에 대한 비밀번호 (노출x)
- **Authorized Redirect URIs**: Authorized Code(Request Token)를 전달해줄 주소



### 2. 인증 과정

1. Resource Owner(유저)가 Resource Server(구글)의 서비스(e.g.소셜로그인)를 Client(외부 서비스)에서 사용하려 한다면, Client는 Resource Owner에게 소셜 로그인 버튼을 제공한다.
   → 해당 버튼을 클릭하는 것은, client_id, scope, redirect_uri를 담은 Resource Server URI로 이동시키는 것이다. (e.g. https://resource.server/cliend_id=1&scope=B,C&redirect_url=https://client/callback)
2. 로그인 성공 시, Resource Server는 link로 넘어온 client_id 와 redirect URI 값들이 자신에게 있는지 확인하고 비교한다.
3. 그리고 Resource Server는 Resource Owner에게 Scope를 확인하는 창을 띄워준다. (동의 페이지)
4. Resource Owner가 허용 시, Resource Server는 Resource Owner의 UserID, Scope 두 가지를 갖게 된다.
5. 그리고 이제 Resource Server는 Authorization code(Request Token)를 생성 후, header location에 redirect URI과 Authorization code(Request Token)를 포함하여 Resource Owner에게 전달한다. 그러면 Resource Owner는 header에 세팅되어 있는 location에 의해 redirect URI로 이동한다.
6. Resource Owner로부터 authorization code(Request Token)를 받은 Client는 Resource Server로 직접 접근한다. 물론 요청을 보내는 URI에는 authorization_code, redirect_uri, client_id, client_secret를 모두 포함한다.
7. Resource Server는 전달받은 code를 통해 모두 검사 후, 성공 시 Resource Server AccessToken 생성 후 Client에 보내준다. 그리고 Resource Server와 Client의 Authorization Code(Request Token)는 모두 제거된다.

![img](https://oauth.net/core/diagram.png)

이미지 출처: https://oauth.net/core/diagram.png



## OAuth2.0

OAuth2.0에서 달라진 점은 아래와 같다.

- 웹 애플리케이션이 아닌 애플리케이션 지원 강화 (다양한 인증방식)
- https 필수
- Siganature 단순화 정렬과 URL 인코딩이 필요 없음
- Access Token의 Life-Time 지 가능

