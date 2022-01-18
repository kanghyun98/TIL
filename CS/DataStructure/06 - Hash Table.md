## Hash Table

**Hash Table**은 (key, value)로 데이터를 저장하는 자료구조로, 내부적으로 배열을 사용한다. (e.g. 사전)

Hash Table은 key를 이용해 value에 직접 접근(random access) 가능하므로 O(1)의 시간 복잡도를 가진다. 하지만 배열 자료구조와 달리 Hash Table은 탐색 뿐만 아니라 삽입, 삭제도 시간 복잡도 O(1)을 가지므로 매우 효율적인 자료구조라고 볼 수 있다. (물론 Collision 때문에 항상 O(1)이 되는 것은 아님)

이제 Hash Table에서 내부적으로 배열을 사용한다는 것이 무슨 소리인지 알아보자. 위에서 Hash Table은 (key, value)의 형태로 저장된다고 했는데, 여기의 value들이 자료구조 배열의 형태로 저장된다. 물론 아무렇게나 저장되는게 아니라, key를 이용해 어떤 값을 만들어내고, 배열에 저장할 때 해당 값을 인덱스로 지정해 그 위치에 저장하는 방식이다.

여기서 key를 이용해 어떤 값을 만들어내는 것을 **Hash Function**, 그 값을 **Hash Code**라고 한다. Hash Function은 key를 이용해 규칙적인 고유의 값을 만들어야하며, 중복된 값이 있을 경우(이를 해시 충돌(Collison)이라 함)를 처리해주어야 한다. 

해시 충돌(Collision)을 해결하기 위한 방법으로 **분리 연결법**과 **개방 주소법** 두 가지가 대표적으로 제시된다.

- **개방 주소법 (Open Addressing)**

  개방 주소법은 해시 충돌이 발생한 경우, 다른 해시 버킷에 삽입하려는 값을 넣어주는 방식이다. 물론 다른 해시 버킷을 찾는 방식에도 여러가지가 있겠지만, 이정도로만 알아두고 넘어가자..!

- **분리 연결법 (Seperate Chaining)**

  분리 연결법은 충돌이 발생했을 때, 해당 버킷에 추가적인 자료구조를 생성해 삽입하는 방식으로, 기존의 해시 테이블에서 빈 공간을 찾는 개방 주소법과 다르다. 추가적인 자료로 Linked List 또는 Red-Black Tree 등을 활용할 수 있다.





참고 자료

- https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#hash-table
- https://www.youtube.com/watch?v=HraOg7W3VAM