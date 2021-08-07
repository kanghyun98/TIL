# 유틸리티, 맵드 타입

## 1. 유틸리티 타입(Utility Type)

유틸리티 타입은 이미 정의해 놓은 타입을 변환해서 재사용할 때 쓰인다.



어떤 종류가 있는지 예시들을 통해 알아보자. 우선 아래에 `interface`와 이를 활용한 API 함수 `fetchProducts()` 가 있다.

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// 상품 목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product[]> {
    // ...
}
```



상품 목록을 받는 API 함수 뿐만 아니라 다른 기능을 하는 함수들도 필요한데, 예를 들어 인기 상품 리스트를 가져오는 함수가 필요하다고 가정해보자. 만약 해당 함수에는 `Product` 인터페이스 안의 모든 값이 필요하지 않고, id, name, brand 만 필요한 상황이라면 인터페이스를 새롭게 만들어야할까?

이런 경우 상황에 맞게 기존의 인터페이스를 활용하여 간단하게 타입을 지정해는 것이 **유틸리티 타입**이다. 아래와 같이 `Partial`, `Pick`, `Omit` 등이 있다.

### 1.1 Partial

특정 타입의 부분 집합을 만족하는 타입을 정의할 수 있다.

```ts
// 특정 상품 정보 업데이트 함수 (일부만 업데이트 되도록)
type UpdateProduct = Partial<Product>

function updateProductItem(productItem: UpdateProduct) {
    // ...
}
```



### 1.2 Pick

특정 타입에서 몇 개의 속성을 직접 선택하여 타입을 정의할 수 있다.

```ts
// 상품 간단한 정보 보는 함수
type ShoppingItem = Pick<Product, 'id' | 'name' | 'price'>

function simpleProduct(shoppingItem: ShoppingItem)
```



### 1.3 Omit

pick과 반대로, 지정된 속성만 제거한 타입을 정의할 수 있다.

```ts
// 위와 동일한 함수
type ShoppingItem = Omit<Product, 'brand' | 'stock'>

function simpleProduct(shoppingItem: ShoppingItem)
```

상황에 따라 Pick과 Omit 중 적절히 골라 사용하면 될 것 같다.

위 타입들을 유틸리티 타입을 사용하지 않고 직접 구현했다면, optional, mapped 타입 등을 이용해 복잡하게 구현했어야 하는데, 유틸리티 타입을 통해 보다 쉽게 원하는 바를 구현할 수 있다.



## 2. 맵드 타입 (Mapped Type)

- 기존에 정의되어 있는 타입을 새로운 타입으로 변환해주는 문법

- 자바스크립트 `map()`  API 함수를 타입에 적용한 것과 같은 효과를 갖는다.

- 대괄호`[ ]`와 `in` 을 사용해 구현할 수 있다.



### 간단한 예제

```ts
type Heroes = 'Hulk' | 'Thor' | 'Capt';
type HeroProfiles = { [K in Heroes]: number };	// for in 문법과 유사하게 작동

const heroInfo: HeroProfiles = {
  Hulk: 54,
  Thor: 1000,
  Capt: 33,
}
```

