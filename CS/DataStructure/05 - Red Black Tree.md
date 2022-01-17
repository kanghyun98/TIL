## Red Black Tree

RBT(Red-Black Tree)는 BST(Binary Search Tree)를 기반으로 하는 트리 형식의 자료구조이다.

RBT는 **BST의 skew 문제를 해결**한 **balanced binary search tree** 이므로 시간복잡도가 **O(logn)**이 되어 보다 효율적이다.



#### 규칙

1. Root Node: Black

2. External Node: Black

3. Red의 자식 노드: Black (즉, 빨간 노드가 연속으로 나올 수 없음)

4. 모든 Leaf Node의 Black Depth가 같음 (즉, 루트노드에서 각 리프노드까지 이어지는 노드 중 검정 노드의 개수는 모두 동일하다)



#### 삽입 (Insertion)

삽입되는 노드의 색깔은 Red이다.

위 방식대로 이진 탐색 트리 방식으로 삽입을 계속 진행하다보면, 빨간 노드가 연달아 나올 수 없다는 규칙을 어기게 된다.(이를 Double Red라 함)
규칙을 지키면서 삽입을 하기 위해 **Restructuring** 또는 **Recoloring**을 해주어야 한다.



**Restructuring**은 **Uncle Node**(부모 노드의 형제 노드, W)가 **검정색(or NULL)**인 경우 진행하고,
**Recoloring**은 **Uncle Node**가 **빨간색**인 경우 진행한다. 

<img src="https://user-images.githubusercontent.com/70627979/149765431-b5a244b0-114a-4f93-bc2a-cc445ee10e42.png" alt="image" style="zoom: 67%;" />

- **Restructuring 동작 방식**

  1. 현재 노드(삽입 노드, Z), 부모 노드(V), 부모의 부모 노드를 오름차순으로 정렬

  2. 가운데 있는 값을 부모 노드로 만들고, 나머지 두 노드를 자식 노드로 만든다.

  3. 부모 노드를 검정색, 자식 노드들을 빨간색으로 만든다.

  <img src="https://user-images.githubusercontent.com/70627979/149768820-473e3f41-1291-43db-8b8f-c5b1d54c1aff.png" alt="image" style="zoom:67%;" />

  

- **Recoloring의 동작 방식**

  1. 현재 노드(삽입 노드, Z)의 부모 노드(V)와 삼촌 노드(W)를 검정색 노드로 변경, 부모의 부모 노드를 빨간색으로 변경한다.
  2. 부모의 부모 노드가 Root Node가 아닌 경우, 다시 Double Red가 발생할 수 있다.

  <img src="https://user-images.githubusercontent.com/70627979/149768757-4e3f34ea-8a05-436f-9dcb-5cdc4f41fb81.png" alt="image" style="zoom:67%;" />

  



#### 삭제

삭제도 마찬가지로 RBT의 규칙을 지키면서 진행해야 한다. 

만약 삭제할 노드가 빨간색이라면 해당 노드를 삭제하면 되지만, 삭제할 노드가 검정색인 경우 모든 Leaf Node의 Black Depth가 같다는 규칙을 지키기 위해 Black-Height가 감소한 경로에 검정색 노드가 하나 추가되도록 rotation하고 노드의 색상을 변경해야 한다.





참고 자료

- https://zeddios.tistory.com/237
- https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#red-black-tree
- https://nesoy.github.io/articles/2018-08/Algorithm-RedblackTree