## Tree

비선형 자료구조로, **계층적 관계(Hierarchical Relationship)**을 표현하는 자료구조.



### 트리 구성요소

- **Node**: 트리를 구성하고 있는 각각의 요소
- **Edge**: 트리를 구성하기 위해 노드와 노드를 연결하는 선
- **Root Node**: 트리 구조에서 최상위에 있는 노드
- **Terminal Node**: 하위에 다른 노드가 연결되어 있지 않은 노드
- **Internal Node**: Terminal Node를 제외한 모든 노드(루트 노드를 포함)



### Binary Tree (이진 트리)

각각의 노드가 최대 두 개의 자식 노드를 가지는 트리 자료 구조

- 트리의 **크기**: 노드의 개수

- 트리의 **높이**: 트리의 최고 레벨

  - 루트 노드의 레벨이 0, 순차적으로 1씩 증가

  

- **Perfect Binary Tree (포화 이진 트리)**: 모든 레벨이 꽉 찬 이진 트리

- **Complete Binary Tree (완전 이진 트리)**: 위에서 아래로, 왼쪽에서 오른쪽으로 순서대로 차곡차곡 채워진 이진 트리

- **Full Binary Tree (정 이진 트리):** 모든 노드가 0개 혹은 2개의 자식 노드만을 갖는 이진 트리



아래 이미지는 크기가 9, 높이가 3인 이진 트리이다.

<img src="https://user-images.githubusercontent.com/70627979/149658942-fe9da7ec-31fb-43c8-ab12-0ae2df02e2c1.png" alt="image" style="zoom:67%;" />

[이미지 출처](https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%A7%84_%ED%8A%B8%EB%A6%AC)



### Binary Search Tree(BST, 이진 탐색 트리)

이진 탐색(binary search)과 연결 리스트(linked list)를 결합한 자료구조의 일종이다.

이진 탐색의 경우 search에 소요되는 시간 복잡도가 O(logn)이지만 자료 입력 및 삭제가 불가능하고, 
linked list의 경우 자료 입력 및 삭제에 필요한 시간 복잡도가 O(1)이지만 search에는 O(n)의 시간 복잡도를 가진다.
두 방식의 장점들을 결합한게 이진 탐색 트리이다.



이진 탐색 트리는 아래와 같은 속성들을 가진다.

- 각 노드의 왼쪽 서브트리에는 해당 노드의 값보다 작은 값을 지닌 노드들로 이루어져 있다.
- 각 노드의 오른쪽 서브트리에는 해당 노드의 값보다 큰 값을 지닌 노드들로 이루어져 있다.
- 중복된 노드가 없어야 한다.
- 왼쪽 서브트리, 오른쪽 서브트리 또한 이진탐색트리이다.



이진 탐색 트리는 Skewed Tree(편향된 트리)가 될 수 있다는 문제점이 있다. 이로 인해 평균 search 연산이 최악의 경우 O(n)의 시간 복잡도를 갖게 된다.

<img src="https://user-images.githubusercontent.com/70627979/149659453-658fe9c2-b689-4aac-bc89-f6d454b3f8b7.png" alt="image" style="zoom:67%;" />

[이미지 출처](https://imgur.com/nCYjtI7)







참고 자료

- https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#tree
- https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%A7%84_%ED%8A%B8%EB%A6%AC
- https://ratsgo.github.io/data%20structure&algorithm/2017/10/22/bst/