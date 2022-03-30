## Binary Heap

: 완전이진트리 자료 구조를 기반으로 하는 자료구조

index값이 1부터 루트노드가 시작된다. (1차원 배열로 나타낼 수 있다)

- Max Heap(최대 힙): 부모 노드의 값이 자식 노드의 값보다 크거나 같은 완전 이진 트리

- Min Heap(최소 힙): 부모 노드의 값이 자식 노드의 값보다 작거나 같은 완전 이진 트리

<img src="https://user-images.githubusercontent.com/70627979/148479250-aa3d6da2-c0ba-48de-be15-acdbc0bc1dc5.png" alt="image" style="zoom:25%;" />

### 삽입과 추출

#### 최소힙에서 노드 삽입

(O(logn)의 시간복잡도를 가짐)

##### 절차

1. 삽입할 노드를 마지막 자리에 추가 (완전이진트리 유지)

2. 현재노드와 부모노드를 비교하여 현재노드가 더 작을 경우 변경

3. 2번 반복



#### 최소힙에서 노드 추출

자료 구조의 목적을 생각해보면, 가장 작은 값을 요청한다. (O(logn)의 시간복잡도를 가짐)

##### 절차

1. 루트노드가 제일 작으므로, 루트 노드를 추출
2. 맨 마지막 노드를 루트노드로 가져옴
3. 현재노드와 자식노드를 비교하여 가장 작은 자식노드와 변경
4. 3번 반복



참고 자료

- https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#binary-heap
- https://www.youtube.com/watch?v=jfwjyJvbbBI&list=PLjSkJdbr_gFY8VgactUs6_Jc9Ke8cPzZP&index=3