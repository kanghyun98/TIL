# 정렬

- [O(N^2) 정렬](#on2-정렬)
  * [버블 정렬](#버블-정렬)
  * [선택 정렬](#선택-정렬)
  * [삽입 정렬](#삽입-정렬)
- [O(NlogN) 정렬](#onlogn-정렬)
  * [병합 정렬](#병합-정렬)
  * [퀵 정렬](#퀵-정렬)
  * [힙 정렬](#힙-정렬)

## O(N^2) 정렬

### 버블 정렬

버블 정렬은 매번 연속된 두 개의 인덱스를 비교한다.

비교할 때마다 큰 값이 뒤로 이동하며, 한 바퀴를 돌면 맨 뒤에 가장 큰 값이 저장된다.

다음 한 바퀴를 돌 때는 맨 마지막 인덱스를 제외하고 진행한다.

모든 경우에 시간 복잡도가 O(n^2)이 된다.

![Bubble sort](https://www.programmingsimplified.com/images/c/bubble-sort.gif)

[이미지 출처](https://www.programmingsimplified.com/c/source-code/c-program-bubble-sort)



### 선택 정렬

선택 정렬은 현재 인덱스의 우측에 위치한 모든 인덱스를 돌며 최솟값을 찾아 현재 인덱스의 값과 변경한다.

한 바퀴를 돌 때마다 좌측부터 작은 값들이 정렬되어 위치한다.

모든 경우에 시간 복잡도가 O(n^2)이 된다.

![selectionsort.gif (700×400)](https://hudi.kr/wp-content/uploads/2018/02/selectionsort.gif)

[이미지 출처](https://hudi.kr/%EC%A0%95%EB%A0%AC-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-1-%EC%84%A0%ED%83%9D-%EC%A0%95%EB%A0%AC-selection-sort/selectionsort/)



### 삽입 정렬

삽입 정렬은 현재 인덱스까지의 값들이 정렬되게 만드는 방법으로, 좌측 인덱스들에서 현재 인덱스보다 큰 인덱스와 작은 인덱스 사이에 현재 인덱스의 값을 삽입하는 방식이다.

만약 정렬이 되어있는 경우 시간복잡도는 O(n)이 된다.

![img](https://media.vlpt.us/images/hwamoc/post/4baaa2bc-d48a-4f3b-a063-6538f6f59971/%EC%82%BD%EC%9E%851.gif)

[이미지 출처](https://gfycat.com/ko/densebaggyibis)



## O(NlogN) 정렬

### 병합 정렬

- 항상 O(NlogN)의 시간복잡도를 갖는 안정 정렬

- 단점

  - 추가적인 메모리가 필요 

- 분할, 정복 방법을 사용

  : 문제를 작은 2개의 문제로 분리하고 각각을 해결하고, 결과를 모아서 원래의 문제를 해결하는 전략

  - 분할(divide) : 두 개의 배열로 분할
  - 정복(conquer) : 분할된 배열을 정렬 (크기가 2 이상이면 재귀함수를 이용해 해당 배열을 다시 분할, 정복)
  - 결합(combine) : 정렬된 배열들을 결합

<img src="https://user-images.githubusercontent.com/70627979/148423849-609dd522-035c-4006-86a4-24dd099aa6b8.png" alt="image" style="zoom: 33%;" />

[이미지 출처](https://gmlwjd9405.github.io/2018/05/08/algorithm-merge-sort.html)



- JavaScript 코드

```js
const merge = (leftArr, rightArr) => {
  const mergedArr = [];

  while (leftArr.length && rightArr.length) {
    leftArr[0] < rightArr[0]
      ? mergedArr.push(leftArr.shift())
      : mergedArr.push(rightArr.shift());
  }

  // 종료 후 남은 요소들 처리
  while (leftArr.length) mergedArr.push(leftArr.shift());
  while (rightArr.length) mergedArr.push(rightArr.shift());

  return mergedArr;
};

const mergeSort = (arr) => {
  if (arr.length < 2) {
    return arr; // 원소 1개이면 그대로 반환
  }

  const leftLen = Math.floor(arr.length / 2); // 왼쪽 배열 길이 설정

  const leftArr = mergeSort(arr.splice(0, leftLen)); // slice 이용 가능
  const rightArr = mergeSort(arr);

  return merge(leftArr, rightArr);
};
```



### 퀵 정렬

- 최악의 경우 O(N^2), 보통 및 최상의 경우 O(NlogN)의 시간 복잡도를 갖는다.

- 분할, 정복 방법을 사용

  - 분할(divide): 피벗을 기준으로 두 개의 비균등한 배열로 분할 (피벗 요소의 좌측에는 피벗보다 작은 요소들, 우측에는 큰 요소들을 배치시킨다.)
    - 분할이 실행될 때마다 하나의 피벗 값의 위치가 정해진다.
  - 정복(conquer): 분할된 배열을 정렬 (크기가 2 이상이면 재귀함수를 이용해 해당 배열을 다시 분할, 정복)
  - 결합(combine) : 정렬된 배열들을 결합

  <img src="https://user-images.githubusercontent.com/70627979/148473897-fc619796-2fb0-4cd6-a81b-fd256a752407.png" alt="image" style="zoom: 25%;" />

  [이미지 출처](https://gmlwjd9405.github.io/2018/05/10/algorithm-quick-sort.html)

  

- 코드

  ```js
  const position = (arr, left, right) => {
    let i = left;
    let j = right;
    const pivot = arr[left];
  
    //제자리 더 큰수/더 작은 수 좌우 배치.
    while (i < j) {
      while (arr[j] > pivot) j--;
      while (i < j && arr[i] <= pivot) i++;
  
      tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  
    arr[left] = arr[j];
    arr[j] = pivot;
  
    return j;
  };
  
  const quicksort = (arr, left = 0, right = arr.length - 1) => {
    if (left < right) {
      //기준점을 찾고 기준점을 중심으로 더 작은수, 더 큰수 분류
      const i = position(arr, left, right);
      //기준점 기준 좌측 정렬
      quicksort(arr, left, i - 1);
      //기준점 기준 우측 정렬
      quicksort(arr, i + 1, right);
    }
  
    return arr;
  };
  ```

  

### 힙 정렬

- 힙

  - 완전 이진 트리
    - 완전 트리: 노드가 순서대로 들어있는 트리
  - 최대 힙: 부모 노드의 키 값이 자식 노드의 키 값보다 크거나 같은 완전 이진 트리
  - 최소 힙: 부모 노드의 키 값이 자식 노드의 키 값보다 작거나 같은 완전 이진 트리
  - 1차원 배열로 나타낼 수 있다.

  <img src="https://user-images.githubusercontent.com/70627979/148479250-aa3d6da2-c0ba-48de-be15-acdbc0bc1dc5.png" alt="image" style="zoom:25%;" />

- 알고리즘 (오름차순)

  - 정렬하고자 하는 배열의 요소들로 최대 힙을 만든다
  - 최상위 루트의 값을 꺼내 순차적으로 저장한다.
    - 마지막 노드를 최상위 루트로 가져옴
    - 힙을 재구성 함

- 코드

  ```js
  const swap = (arr, idx1, idx2) => {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  };
  
  // 자식 노드로 내려가면서 알맞은 위치에 배치시킴
  const heapify = (arr, idx, len = arr.length) => {
    let largest = idx;
    let leftIdx = idx * 2 + 1;
    let rightIdx = idx * 2 + 2;
  
    if (leftIdx < len && arr[leftIdx] > arr[largest]) {
      largest = leftIdx;
    }
    if (rightIdx < len && arr[rightIdx] > arr[largest]) {
      largest = rightIdx;
    }
  
    if (largest !== idx) {
      swap(arr, largest, idx);
      heapify(arr, largest, len);
    }
  };
  
  const heapSort = (arr) => {
    // 초기 힙 구조 만들기
    for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
      heapify(arr, i);
    }
  
    // 정렬 (오름차순)
    for (let i = arr.length - 1; i > 0; i--) {
      swap(arr, 0, i);
  
      heapify(arr, 0, i);
    }
  
    return arr;
  };
  ```

  

