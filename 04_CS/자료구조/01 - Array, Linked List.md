## Array (배열)

배열은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조, 즉 논리적 저장 순서와 물리적 저장 순서가 동일한 자료구조이다. 배열의 요소는 **하나의 데이터 타입**으로 통일되어 있으며 서로 연속적으로 인접해 있다.



### 특징

- 인덱스를 통한 **random access**가 가능해 배열 요소에 **접근**하는 속도가 매우 빠르다. (O(1))

- 원소 **삽입/삭제** 시 연속성을 유지하기 위해 **시프트 연산**이 필요해 느려진다. (O(N))

- **공간의 크기가 미리 결정**되어야하며, 오버플로우 발생 시 새로운 공간에 재할당해야 한다.



> **자바스크립트의** Array(Sparse)는 위에서 말하는 Array(Dense)와 다르다.
>
> 자바스크립트의 배열은 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며, 연속적으로 이어져 있지 않을 수도 있다. **해시 테이블**로 구현되어 있어 접근하는데 속도가 일반 배열보다 느리지만, 특정 요소를 검색하거나 요소를 삽입, 삭제하는 경우에는 일반 배열보다 빠르다.
>
> 최적의 성능을 내기 위해 자바스크립트의 배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선이다.





## Linked List (연결 리스트)

연결 리스트의 각 원소들은 **자기 자신 다음에 어떤 원소가 오는지**만을 기억한다. 그래서 다음 원소를 저장하는 부분을 변경해주는 방식으로 삭제와 삽입 연산을 구현한다.



### 특징

- **동적 공간할당 방식**이라 공간 효율성이 좋다.
- **다양한 데이터 타입**이 하나의 연결 리스트 안에 존재할 수 있다.

- Search(탐색)을 위해 순차적으로 원소들을 확인해야하므로 탐색이 필요한 연산들(접근, 삽입, 삭제 등)은 O(N)의 시간복잡도를 갖는다.
- 삽입/삭제 연산 시, **추가적인 시프트 연산이 필요없다**.
- Tree 구조가 Linked List를 기반으로 동작한다.



### 구현

```python
class ListNode:
    def __init__(self, newItem, nextNode):
        self.item = newItem
        self.next = nextNode

class LinkedListBasic:
    def __init__(self):
        self.__head = ListNode('dummy', None)
        self.__numItems = 0

    # 연결 리스트 원소 삽입
    def insert(self, i:int, newItem):
        if (i >= 0 and i <= self.__numItems):
            prev = self.__getNode(i - 1)  # i-1번째 노드 (-1번째: 더미 헤드)
            newNode = ListNode(newItem, prev.next)
            prev.next = newNode
            self.__numItems += 1

    def append(self, newItem):
        prev = self.__getNode(self.__numItems-1)  # 마지막 노드
        newNode = ListNode(newItem, prev.next)
        prev.next = newNode
        self.__numItems += 1

    # 연결 리스트 원소 삭제
    ## i번 노드 삭제
    def pop(self, i:int):
        if (i >= 0 and i <= self.__numItems-1):
            prev = self.__getNode(i - 1)
            curr = prev.next
            prev.next = curr.next
            retItem = curr.item  # 반환할 삭제된 아이템
            self.__numItems -= 1
            return retItem
        else:
            return None

    ## item이 x인 원소 삭제
    def remove(self, x):
        (prev, curr) = self.__findNode(x)
        if (curr != None):
            prev.next = curr.next
            self.__numItems -= 1
            return x
        else:
            return None

    # 조회
    ## i번 원소 조회
    def get(self, i:int):
        if (self.isEmpty()):
            return None
        if (i >= 0 and i <= self.__numItems-1):
            return self.__getNode(i).item
        else:
            return None

    ## item x가 몇 번 노드인지
    def index(self, x) -> int:
        curr = self.__head.next  # 0번 노드(더미 헤드 다음)
        for index in range(self.__numItems):
            if (curr.item == x):
                return index
            else:
                curr = curr.next
        return -2

    # 기타
    ## 비어있는지 확인
    def isEmpty(self) -> bool:
        return self.__numItems == 0

    ## 크기
    def size(self) -> int:
        return self.__numItems

    ## 초기화
    def clear(self):
        self.__head = ListNode('dummy', None)
        self.__numItems = 0

    ## 원소 x의 개수
    def count(self, x) -> int:
        cnt = 0
        curr = self.__head.next # 0번 노드
        while (curr != None):
            if (curr.item == x):
                cnt += 1
            curr = curr.next
        return cnt

    ## 확장(연결)
    def extend(self, a):  # a는 self와 같은 타입의 연결 리스트
        for index in range(a.size()):
            self.append(a.get(index))

    ## 복사
    def copy(self):
        a = LinkedListBasic()
        for index in range(self.__numItems):
            a.append(self.get(index))
        return a

    ## 역순
    def reverse(self):
        a = LinkedListBasic()
        for index in range(self.__numItems):
            a.insert(0, self.get(index))
        self.clear()

        for index in range(a.size()):
            self.append(a.get(index))

    ## 정렬
    def sort(self) -> None:
        a = []
        for index in range(self.__numItems):
            a.append(self.get(index))

        a.sort()
        self.clear()

        for index in range(len(a)):
            self.append(a[index])

    ## 노드 탐색
    def __findNode(self, x) -> (ListNode, ListNode):
        prev = self.__head  # 더미 헤드
        curr = prev.next    # 0번 노드

        while curr != None:
            if (curr.item == x):
                return (prev, curr)
            else:
                prev = curr
                curr = curr.next

        return (None, None)
        
```





참고 자료

- https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#array-vs-linked-list

- 자료구조 수업