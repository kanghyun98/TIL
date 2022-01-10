## LAN 매체와 유선 LAN

### 1) LAN에서 사용하는 매체

#### 전송매체

: 에너지를 전달하는 물질을 의미

![image](https://user-images.githubusercontent.com/70627979/148741129-59d7a4cc-0191-49df-ad8a-35ec88f3a115.png)



#### 유도매체 (Guided Media: Wired)

- 꼬임선 (Twisted-Pair Cable)
  - UTP (Unshielded Twisted-Pair)
    - UTP 카테고리: UTP 케이블의 전송 가능 대역폭에 따라 분류 (카테고리가 높을수록 성능이 좋음)
    - TP 커넥터: RJ45 커텍터가 많이 사용
  - STP (Shielded Twisted-Pair)
- 동축 케이블 (Coaxial Cable)
  - TP 케이블보다 높은 주파수의 신호를 전달
  - 그러나 감쇄가 심해서 많이 이용되지 않음
- 광섬유 케이블 (Fiber-Optic Cable)
  - 빛 신호를 전달하는데 사용
  - 현존하는 매체 중 가장 고속의 광대역 전송이 가능한 매체



#### 비유도 매체 (Unguided Media: Wireless)

- 물리적인 도체 없이 신호를 전달하는 매체
- 3KHz에서 1GHz를 라디오 파, 1에서 300GHz를 마이크로 파라고 함
- 라디오 파는 다방향성, 마이크로 파는 단방향성의 특성을 가짐 



### 2) 유선 LAN: Ethernet

#### IEEE 표준 프로토콜

- 이더넷은 LLC와 MAC으로 구성된 2개의 부계층이 존재

  ![image](https://user-images.githubusercontent.com/70627979/148743350-22e4f05b-7e9b-4be8-93df-8398ad6d345c.png)

- MAC 계층은 매체의 특성과 운용방식에 따라 여러 개의 프로토콜이 존재

  ![image-20220110182730942](/Users/kanghyun/Library/Application Support/typora-user-images/image-20220110182730942.png)

- LAN에서 흐름제어, 에러제어 등 각종 제어에 대한 행위를 수행 (Media와 관계 없이)
  - 이 부계층을 LLC(Logical Link Control)
  - LLC는 모든 LAN에서 공통의 계층   



#### Ethernet

- MAC 프레임

  - 이더넷 프레임은 7개의 필드로 구성
    - Preamble : 프레임이 곧 도착하니 준비하라는 의미
    - Start frame delimiter (SFD) : 프레임의 시작을 알림
    - Destination address (DA): 목적지 주소
    - Source address (SA): 송신자 주소
    - Length/type: 데이터 필드의 길이, 네트워크 계층 프로토콜의 종류
    - 데이터: 최소 46바이트에서 최대 1500 바이트까지 가능
    - CRC: 에러를 검출하는 기능

  ![image](https://user-images.githubusercontent.com/70627979/148744612-9a18b63d-fb6c-42da-90e1-20cd36b51296.png)

- 주소 지정 (위에서의 목적지 및 송신자 주소)
  - 각 시스템은 NIC(Network Interface Card)를 갖고 있는데, LAN 카드라고도 불림
  - LAN 카드에는 고유 주소가 설정되어 있음
    - MAC주소, Ethernet주소, 하드웨어 주소라고 함
    - 6바이트로 이루어져 있으며, 보통 16진수로 표기
    - 브로드캐스트 주소는 모든 비트가 1인 ff-ff-ff-ff-ff-ff 로 구성

- MAC 프로토콜: CSMA/CD
  - 이더넷은 1-presistent CSMA/CD를 사용