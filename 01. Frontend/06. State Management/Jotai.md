# Jotai

프로젝트에서 Client-State의 관리를 위해 `Jotai` 도입하기로 결정. (Server-State는 `React-Query`)

- Next와 함께 사용하기 가이드: https://jotai.org/docs/guides/nextjs

- React Native와 함께 사용하기 가이드: https://jotai.org/docs/guides/react-native



## Primitive

1. `atom` 생성 (with 초기값)

   ```jsx
   // Store.js
   
   import { atom } from 'jotai'
   
   export const countAtom = atom(0)
   ```

2. component에서 `atom` 사용

   ```jsx
   // components/Counter.js
   import { useAtom } from 'jotai';
   import { countAtom } from '../Store.js';
   
   const Counter = () => {
     const [count, setCount] = useAtom(countAtom);
   
     return (
       <div>
         <h1>count1: {count}</h1>
         <button onClick={() => setCount((c) => c - 1)}>down</button>
         <button onClick={() => setCount((c) => c + 1)}>up</button>
       </div>
     );
   };
   
   export default Counter;
   ```

3. 계산된 값으로 dervied(파생) `atom` 생성

   derived `atom`은 read-only, write-only, read-write 세 종류가 있다.

   ```jsx
   const readOnlyAtom = atom((get) => get(priceAtom) * 2)
   const writeOnlyAtom = atom(
     null, // it's a convention to pass `null` for the first argument
     (get, set, update) => {
       // `update` is any single value we receive for updating this atom
       set(priceAtom, get(priceAtom) - update.discount)
     }
   )
   const readWriteAtom = atom(
     (get) => get(priceAtom) * 2,
     (get, set, newPrice) => {
       set(priceAtom, newPrice / 2)
       // you can set as many atoms as you want at the same time
     }
   )
   ```

4. 여러개의 `atom`으로 하나의 `atom`을 만들 수 있다.

   ```jsx
   const count1 = atom(1)
   const count2 = atom(2)
   const count3 = atom(3)
   
   const sum = atom((get) => get(count1) + get(count2) + get(count3))
   
   // 이런 방법도 가능!
   const atoms = [count1, count2, count3, ...otherAtoms]
   const sum = atom((get) => atoms.map(get).reduce((acc, count) => acc + count))
   ```

   atom은 어디서든 생성될 수 있고, 동적으로 생성될 수도 있다. referential equality(참조 동일성?)이 중요하다. render function에서 atom을 만드려면 useMemo나 useRef를 사용하여 안정적인 참조를 얻어야 한다.



## Async

first class in jotai, React Suspense 활용

1. async `atom`을 사용하려면 컴포넌트를 `<Suspense>`로 감싸줘야 한다.

   ```jsx
   const App = () => (
      <Suspense fallback="Loading...">
        <Layout />
      </Suspense>
   )
   ```

2. Async read `atom`

   `atom`의 read function은 promise를 반환할 수 있는데, promise가 fulfilled 됐을 때 멈췄다가 re-render된다.

   그리고 `useAtom`은 resolved value 반환을 보장해준다.

   ```jsx
   const countAtom = atom(1)
   const asyncCountAtom = atom(async (get) => get(countAtom) * 2)
   
   const Component = () => {
     const [num] = useAtom(asyncCountAtom)
     // `num` is guaranteed to be a number.
   }
   ```

   그리고 `get`을 이용해 비동기 atom을 하나라도 가져오면, 해당 atom도 비동기화 된다.

   ```jsx
   const anotherAtom = atom((get) => get(asyncCountAtom) / 2)
   ```

3. Derived async `atoms` (파생된 비동기 아톰)

   - `urlAtom`: `url` 관리 (read, write)
   - `fetchUrlAtom`: `urlAtom` 값으로 fetch 해온 결과 (read only)

   ```jsx
   const urlAtom = atom("<https://json.host.com>")
   const fetchUrlAtom = atom(
     async (get) => {
       const response = await fetch(get(urlAtom))
       return await response.json()
     }
   )
   
   function Status() {
     const [json] = useAtom(fetchUrlAtom)
   	// ..
   }
   ```

4. Async Actions

   위에서 두 개의 atom(url 관리, 결과)을 사용해 비동기 로직을 관리했는데,

   하나의 atom만 밖에서 사용하여 비동기 액션을 사용하고 싶다면 아래와 같이 하나의 atom을 저장소로 사용하고, 또 다른 atom에서 get, set을 이용해 수정하고 가져오는 방식을 이용하면 된다.

   ```jsx
   const countAtom = atom([])
   const fetchCountAtom = atom(
     (get) => get(countAtom),
     async (_get, set, url) => {
       const response = await fetch(url)
       set(countAtom, (await response.json()).count)
     }
   )
   
   function Controls() {
     const [count, compute] = useAtom(fetchCountAtom)
     return <button onClick={() => compute("<http://count.host.com>")}>compute</button>
   ```



## with Next.js

`useHydrateAtoms([atom, value])` 를 사용해 SSR 구현 (초기값 설정, [공식문서](https://jotai.org/docs/utils/use-hydrate-atoms))

```jsx
// Definition
function useHydrateAtoms(values: Iterable<readonly [Atom<unknown>, unknown]>, scope?: Scope): void
```



## with React Native

React Native에서 Session Storage, Local Storage, Async Storage 중 Async Storage 만 지원하는데, Jotai의 util함수 `atomWithStorage` 가 이를 지원한다.

- 간단한 방식 (문자열)

  ```jsx
  export const strAtom = atomWithStorage('string', undefined, AsyncStorage)
  ```

- 문자열이 아닌 경우 (객체)

  ```jsx
  // 1단계 (객체를 자동으로 문자열화, 파싱)
  const storage = createJSONStorage(() => AsyncStorage);
  
  // 2단계
  const objectAtom = atomWithStorage('object', undefined, storage)
  ```

- boolean 값인 경우 atomWithToggleAndStorage 방식도 있다.

  ```jsx
  const booleanAtom = atomWithToggleAndStorage('boolean', false, storage)
  ```





참고자료

- Jotai 공식문서: https://jotai.org/docs/introduction