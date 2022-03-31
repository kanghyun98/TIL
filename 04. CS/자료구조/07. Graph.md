## Hash Table

트리도 그래프의 한 형태이다. 트리는 루트노드가 존재하고, 들어오는 것이 한 개이며, 사이클이 없는 아래로만 흐르는 방향 그래프이다.

그래프는 이러한 제약들이 존재하지 않는 자료구조이다.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/6n-graph2.svg/800px-6n-graph2.svg.png" alt="undefined" style="zoom: 25%;" />

[이미지 출처](https://upload.wikimedia.org/wikipedia/commons/2/28/6n-graph2.svg)

#### 그래프의 구분

- **방향성** 여부

  : 방향성이 존재하는 그래프를 Directed Graph, 방향성이 존재하지 않는 그래프를 Undirected Graph라고 한다.

  - **Directed Graph**

  - **Undirected Graph**

- **사이클** 여부

  : 그래프 내부에 하나 이상의 사이클이 존재하는 경우 Cyclic Graph, 사이클이 존재하지 않는 그래프를 Acyclic Graph라고 한다.

  - **Cyclic Graph**
  - **Acyclic Graph**



#### 그래프를 표현하는 방법 

- **Adjacent Matrix (인접 행렬)**

  : 그래프를 표에다 표현하는 방법, 서로 연결된 노드들은 1, 연결이 없으면 0으로 2차원 배열을 채우는 방식

  - 노드 간의 연결 관계를 O(1)로 파악할 수 있다. 
  - Edge 개수와 무관하게 O(N^2)의 공간 복잡도를 갖는다.
  - Dense Graph를 표현할 때 적합하다.

- **Adjacent List (인접 리스트)**

  : 배열에다 노드들을 집어넣고, 각 배열에 있는 노드와 인접한 노드들을 Linked List로 연결하는 방식

  - 요소의 Linked List를 확인해 노드 간의 연결 관계를 파악해야 하므로 오래걸린다.
  - O(N + E)의 공간 복잡도를 갖는다.
  - Sparse Graph를 표현할 때 적합하다.

  - 코드

    ```js
    const graph = {
      A: ["B", "C"],
      B: ["A", "D"],
      C: ["A", "G", "H", "I"],
      D: ["B", "E", "F"],
      E: ["D"],
      F: ["D"],
      G: ["C"],
      H: ["C"],
      I: ["C", "J"],
      J: ["I"]
    };
    ```

    



#### 그래프의 탐색

- **DFS (Depth First Search, 깊이 우선 탐색)**

  : 최대한 깊이 내려간 뒤, 끝에 다다른 후 옆으로 이동

  - with **Stack** or **재귀**

  - 시간 복잡도: **O(N + E)**

    <img src="https://blog.kakaocdn.net/dn/xC9Vq/btqB8n5A25K/GyOf4iwqu8euOyhwtFuyj1/img.gif" alt="img" style="zoom:50%;" />

    [이미지 출처](https://developer-mac.tistory.com/64) 

  - 코드

    ```js
    // Stack
    const dfs = (graph, startNode) => {
      const visited = []; // 탐색을 마친 노드들
      const stack = []; // 탐색해야할 노드들
    
      stack.push(startNode);
    
      while (stack.length !== 0) { 
        const node = stack.pop();
        
        if (!visited.includes(node)) {
          visited.push(node); 
          stack = [...stack, ...graph[node]];
        }
      }
      return visited;
    };
    ```

    



- **BFS (Breadth first Search, 너비 우선 탐색)**

  : 자식 노드들을 먼저 다 방문한 후 다음 레벨(자식)의 노드들 방문

  - with **Queue**

  - tlrks qhrwkqeh: O(V + E)

    <img src="https://blog.kakaocdn.net/dn/c305k7/btqB5E2hI4r/ea7vFo08tkDYo4c8wkfVok/img.gif" alt="img" style="zoom:50%;" />

    [이미지 출처](https://developer-mac.tistory.com/64)

  - 코드

    ```js
    const bfs = (graph, startNode) => {
      const visited = []; // 탐색을 마친 노드들
      const queue = []; // 탐색해야할 노드들
    
      queue.push(startNode);
    
      while (queue.length !== 0) { 
        const node = queue.shift();
        
        if (!visited.includes(node)) {
          visited.push(node); 
          queue = [...queue, ...graph[node]];
        }
      }
      return visited;
    };
    ```

    









참고 자료

- https://www.youtube.com/watch?v=fVcKN42YXXI

- https://www.youtube.com/watch?v=_hxFgg7TLZQ

- https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#graph

- https://ryusm.tistory.com/48

  