## 04 - 무선 LAN과 네트워크 연결장치

### 4-1) 무선 LAN

#### 무선 LAN 구조

- 무선 LAN은 BSS와 ESS라는 두 종류의 서비스를 지원

- AP(Access Point)를 유무선 공유기라고도 함

- BSS (Basic Service Set) 는 하나의 AP내에의 서비스이며, 2개의 모드가 존재함

  - Infrastructur 모드: AP(Access Point)라는 중앙의 기지국을 이용하는 모드

  - Ad hoc 모드: AP가 없는 모드

    <img src="https://user-images.githubusercontent.com/70627979/148857966-cdfec147-ebf9-4dc9-8a4e-c6eb2ebbcb1d.png" alt="image" style="zoom:67%;" />



- ESS (Extended Service Set): AP를 갖는 여러 BSS로 구성된 서비스를 의미

  <img src="https://user-images.githubusercontent.com/70627979/148858253-2f038da1-0d8a-4a2f-aa04-fbecb146c69e.png" alt="image" style="zoom:67%;" />



#### MAC 부계층

- 무선 LAN 표준인 IEEE 802.11에서는 2개의 MAC 부계층을 정의

  - ad hoc 모드에서는 불가능
  - 제어를 통해 경쟁(contention)이 발생하지 않음

  - **Distributed Coordination Function (DCF)**
  - **Point Coordination Function (PCF)** : 복잡한 접근제어를 수행 (선택)

- **Distributed Coordination Function (DCF)**
  - DCF는 **CSMA/CA**를 사용
  - 무선 LAN에서는 CSMA/CD를 사용 불가능
    - 숨겨진 단말기 문제로 인해 충돌을 인지하지 못할 수 있음
    - 신호가 약해져서 다른 컴퓨터에서 발생한 충돌을 감지하지 못할 수 있음

- Hidden Terminal 문제

  - B - A - C 순으로 단말기가 존재한다 했을 때, B와 C는 서로 sensing 불가능, 따라서 B와 C가 동시에 A에 데이터 전송하고 이로 인해 충돌이 발생함

  - 문제를 해결하기 위해 **RTS(Request To Send)**와 **CTS(Clear To Send)**를 주고받는 과정이 필요

  - C는 A가 보내는 CTS를 통해서 자신이 모르는 위치에 시스템(Hidden Terminal)이 있다는 것을 알 수 있음

    <img src="https://user-images.githubusercontent.com/70627979/148860234-d8dd5613-91be-4e55-b1d0-e0792ce09c2f.png" alt="image" style="zoom:67%;" />



- **Point Coordination Function (PCF)**
  - PCF는 선택사항으로 infrastucture 네트워크에서만 운용이 가능
  - 중앙집중식으로 충돌이 발생하지 않도록 폴링 방법을 사용
    - 무선 LAN의 장치들이 AP에 의해 하나씩 차례로 폴링, 이때 AP로 데이터를 전송 가능



#### Bluetooth

- 서로 다른 기능의 기기들이 서로 연결하기 위한 무선 LAN 기술
- ad hoc 네트워크 사용
- Piconets
  - 하나는 마스터, 나머지는 종속 시스템으로 구성
- 링크의 종류
  - 마스터와 종속 시스템 사이에 2가지 형태의 링크가 존재
    - **Synchronous Connection-Oritented (SCO) 링크**: 지연이 에러보다 중요한 경우 (실시간 음성)
    - **Asynchronous Connectionless Link (ACL) 링크**: 데이터의 무결성이 중요한 경우 (데이터 에러)



### 4-2) 네트워크 연결 장치

#### 네트워킹 장치

- 네트워크 연결장치는 어떤 계층에서 연결하는가에 따라서 4가지 종류가 존재

  <img src="https://user-images.githubusercontent.com/70627979/148861263-cd4a2c5b-4844-46a9-aab6-7761446764f7.png" alt="image" style="zoom: 67%;" />



- 리피터 (Repeaters)

  - 물리 계층에서 네트워크를 연결 (같은 프로토콜을 사용하는 LAN만 연결)
  - 미약해진 신호를 원래의 비트형태로 재생산
  - **허브**는 리피터의 기능도 수행
  - 케이블의 길이를 연장시키는 것과 동일한 기능
  - 에러 검출 및 복구 기능이 존재하지 않고, 트래픽을 전체 다 전송시킴.

  <img src="https://user-images.githubusercontent.com/70627979/148862477-c9b2cea1-c289-4576-b447-7d0859214919.png" alt="image" style="zoom:67%;" />



- 브릿지 (Bridge)

  - 물리 계층과 데이터링크 계층 사이에서 동작
    - **L2 스위치**로 불리는 허브들이 존재
  - 트래픽 필터링 기능
    - 목적지 주소를 검사해서 프레임을 전달할 포트를 결정
    - 포트와 주소를 관련시킨 테이블 존재

  <img src="https://user-images.githubusercontent.com/70627979/148861998-5ad16fbd-e9f7-47be-9537-3956cf0c51c5.png" alt="image" style="zoom:67%;" />



- 라우터 (Router)

  - 네트워크 계층에서 IP 주소를 기반으로 패킷을 전달
  - 각기 독립된 네트워크들을 연결시켜주는 장치

  <img src="https://user-images.githubusercontent.com/70627979/148862677-702c665e-00a0-49b3-9eb7-e51d93f7472c.png" alt="image" style="zoom:67%;" />



- 스위칭 허브 (Switching Hub)

  - 스위칭 허브는 목적지 주소를 인식하여 해당 포트로만 메시지를 전달

    (일반 허브는 수신한 메시지를 모든 포트로 전송)

  <img src="https://user-images.githubusercontent.com/70627979/148862883-f4c514f1-92b3-40bd-af91-2c8194cbdadb.png" alt="image" style="zoom:67%;" />



- 게이트웨이 (Gateway)
  - 두 개 이상의 다른 시스템이나 네트워크를 연결하는데 사용
    - Internet의 5계층이나 OSI 모델의 7계층에서 동작
    - L7 switch라고도 불림
  - 서로 다른 프로토콜 구조를 변환하는데 사용됨



- Backbone Networks

  - 여러 네트워크를 연결하는데 사용되는 네트워크

  <img src="https://user-images.githubusercontent.com/70627979/148863430-aad5774c-7e1c-4074-aaba-b2beaa152c5a.png" alt="image" style="zoom:67%;" />



- Virtual LANs

  - 물리적인 제한 받지 않고 논리적인 구성에 따라 LAN을 구성할 수 있는 형태
    - 물리적인 구성의 변경에 유연함
    - 동일한 VLAN에 속한 구성원들은 같은 LAN에 속해 있는 것으로 간주

  <img src="/Users/kanghyun/Library/Application Support/typora-user-images/image-20220111100905495.png" alt="image-20220111100905495" style="zoom:67%;" />