## summary


# 9. 훅

### 클래스 컴포넌트의 한계와 리액트 훅의 등장 배경

리액트 16.8 버전 이전에는 클래스 컴포넌트로만 상태를 관리할 수 있었습니다. 

#### 클래스 컴포넌트의 기본 구조와 상태 관리

클래스 컴포넌트는 JavaScript의 `class` 키워드를 사용하여 정의되며, `React.Component`를 상속받습니다.

```jsx
// 기본적인 카운터 컴포넌트 예시
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>증가</button>
      </div>
    );
  }
}
```

**[클래스 컴포넌트의 상태 관리의 주요 특징]**

1. **상태 초기화**
   - `constructor`에서 `this.state` 객체를 통해 초기 상태 설정
   - `super(props)` 호출이 필수적
   - 상태는 반드시 객체 형태여야 함

2. **상태 업데이트**
   - `this.setState()` 메서드를 통해서만 상태 변경 가능
   - 비동기적으로 처리됨
   - 이전 상태를 기반으로 업데이트 시 함수형 업데이트 사용

3. **생명주기와 상태 관리**
   - `componentDidMount`: 초기 상태 설정 및 API 호출
   - `componentDidUpdate`: 상태 변경 후의 사이드 이펙트 처리
   - `componentWillUnmount`: 상태 관련 정리 작업

```jsx
// 데이터 fetching을 포함한 복잡한 컴포넌트 예시
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  // 컴포넌트가 마운트될 때 데이터를 가져옴
  componentDidMount() {
    fetchData().then(data => this.setState({ data }));
  }

  // props가 변경될 때마다 새로운 데이터를 가져옴
  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      fetchData(this.props.id).then(data => this.setState({ data }));
    }
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}
```

#### 클래스 컴포넌트만 상태를 가질 수 있었던 이유

1. **리액트의 초기 설계 의도**
   - 리액트는 처음부터 클래스 기반 컴포넌트를 중심으로 설계됨
   - 상태 관리를 위한 내부 메커니즘(`this.setState`)이 클래스 구조에 최적화되어 있었음
   - 함수형 컴포넌트는 단순히 props를 받아 UI를 렌더링하는 순수 함수로만 동작

2. **JavaScript의 기술적 한계**
   - ES6 이전에는 클래스 문법이 없어 `React.createClass`를 사용
   - 함수형 컴포넌트에서 상태를 유지하기 위한 메커니즘이 없었음
   - 클로저를 통한 상태 관리가 가능했지만, 리렌더링 시 상태가 초기화되는 문제 존재

3. **리액트의 내부 구현**
   - 리액트의 내부 상태 관리 시스템이 클래스 인스턴스의 생명주기와 밀접하게 연관
   - 컴포넌트의 인스턴스가 생성될 때마다 상태를 저장할 수 있는 메모리 공간 할당
   - 함수형 컴포넌트는 매 렌더링마다 새로 호출되어 상태를 유지할 수 없었음

4. **컴포넌트 생명주기와의 연관성**
   - 상태 변경은 컴포넌트의 생명주기와 밀접하게 연관
   - 클래스 컴포넌트의 생명주기 메서드들이 상태 관리와 자연스럽게 연결
   - 함수형 컴포넌트에서는 이러한 생명주기 개념을 구현하기 어려웠음

#### 클래스 컴포넌트의 주요 한계점

```js
// 9-1.js
componentDidMount() {
  this.props.updateCurrentPage(routeName);
  this.didFocusSubscription = this.props.navigation.addListener('focus', () => {/*
네비게이션에 포커스 핸들러 추가 */});
  this.didBlurSubscription = this.props.navigation.addListener('blur', () => {/* 
네비게이션에 블러 핸들러 추가 */});
}

componentWillUnmount() {
  if (this.didFocusSubscription != null) {
    this.didFocusSubscription();
  }
  if (this.didBlurSubscription != null) {
    this.didBlurSubscription();
  }
  if (this._screenCloseTimer != null) {
    clearTimeout(this._screenCloseTimer);
    this._screenCloseTimer = null;
  }
}

componentDidUpdate(prevProps) {
  if (this.props.currentPage != routeName) return;

  if (this.props.errorResponse != prevProps.errorResponse) {/* 에러 응답 처리
*/}
  else if (this.props.logoutResponse != prevProps.logoutResponse) {/* 로그아웃
응답 처리 */}
  else if (this.props.navigateByType != prevProps.navigateByType) {/* 
navigateByType 변경 처리 */}

  // 여기서 다른 prop 변경사항 처리
}
```

위 코드에서 볼 수 있듯이

1. **복잡한 생명주기 메서드**
   - 여러 생명주기 메서드(`componentDidMount`, `componentWillUnmount`, `componentDidUpdate`)를 사용해야 함
   - 코드의 가독성과 유지보수성이 떨어짐
   - 각 생명주기 메서드의 역할과 실행 시점을 정확히 이해해야 함
   - 메서드 간의 의존성으로 인한 버그 발생 가능성이 높음

2. **상태 관리의 분산**
   - 관련 로직이 여러 생명주기 메서드에 분산됨
   - 코드의 응집도가 낮아짐
   - 상태 업데이트 로직의 추적이 어려움

3. **this 바인딩 문제**
   - `this` 컨텍스트 관리가 필요함
   - 메서드 전달 시 `bind` 또는 화살표 함수 사용이 필수
   - 잘못된 `this` 바인딩으로 인한 런타임 에러 발생 가능
   - 개발자가 항상 `this` 컨텍스트를 신경써야 함

4. **상태 로직의 재사용 어려움**
   - 컴포넌트에 직접 묶인 상태 관리 로직
   - 다른 컴포넌트에서 재사용이 어려움
   - `HOC`나 `Render Props` 패턴을 사용해야 하는 복잡성
   - 코드 중복이 발생하기 쉬움

5. **테스트의 어려움**
   - 복잡한 생명주기와 상태 관리로 인한 테스트 작성의 어려움
   - 각 생명주기 메서드의 독립적인 테스트가 어려움
   - 상태 변경에 따른 사이드 이펙트 테스트가 복잡함
   - 테스트 코드의 가독성과 유지보수성이 떨어짐


이러한 문제점들로 인해 리액트 훅이 도입되었습니다. 훅을 사용하면

- 관련 로직을 한 곳에 모을 수 있음
- 상태 관리 로직을 쉽게 재사용할 수 있음
- `this` 바인딩 문제가 없음
- 코드가 더 간결하고 이해하기 쉬워짐
- 테스트가 더 용이해짐

이러한 장점들로 인해 현대 리액트 개발에서는 클래스 컴포넌트 대신 함수형 컴포넌트와 훅을 사용하는 것이 권장됩니다.


#### 리액트 훅의 등장 배경

이러한 문제점들을 해결하기 위해 리액트 훅이 도입되었습니다. 훅은 다음과 같은 장점을 제공합니다:

1. **상태 관리의 단순화**
   - 함수형 컴포넌트에서도 상태 관리 가능
   - 관련 로직을 한 곳에 모을 수 있음
   - 상태 변경 로직의 추적이 용이함

2. **코드 재사용성 향상**
   - 커스텀 훅을 통한 로직 재사용
   - HOC나 Render Props 패턴 없이도 로직 공유 가능
   - 코드 중복 최소화

3. **개발 경험 개선**
   - `this` 바인딩 문제 해결
   - 더 간단하고 직관적인 코드 작성
   - TypeScript와의 더 나은 통합

4. **성능 최적화**
   - 불필요한 리렌더링 방지
   - 메모이제이션을 통한 성능 최적화
   - 더 예측 가능한 렌더링 동작

이러한 장점들로 인해 현대 리액트 개발에서는 클래스 컴포넌트 대신 함수형 컴포넌트와 훅을 사용하는 것이 권장됩니다.


<br/>

## 9-1. `useState` 훅

```ts
// 9.1.1-1.ts
function useState<S>(
  initialState: S | (() => S)
  ): [S, Dispatch<SetStateAction<S>>];
  
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);
```

#### `useState`가 반환하는 튜플

`useState` 훅은 두 개의 요소를 포함하는 튜플을 반환합니다.

1. **상태 값 (State Value)**
   - 첫 번째 요소는 현재 상태 값
   - 제네릭 타입 `S`로 지정된 타입을 가짐
   - 컴포넌트가 리렌더링되어도 유지됨

2. **상태 업데이트 함수 (State Setter)**
   - 두 번째 요소는 상태를 업데이트하는 함수
   - `Dispatch<SetStateAction<S>>` 타입을 가짐
   - 두 가지 방식으로 상태를 업데이트할 수 있음
     ```ts
     // 1. 직접 값을 설정
     setState(newValue);
     
     // 2. 이전 상태를 기반으로 업데이트
     setState(prevState => newValue);
     ```

예시 코드를 통해 살펴보겠습니다.

```tsx
// 9.1.1-2.tsx
function Counter() {
  // [number, Dispatch<SetStateAction<number>>] 타입의 튜플 반환
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      {/* 직접 값 설정 */}
      <button onClick={() => setCount(1)}>1로 설정</button>
      {/* 이전 상태 기반 업데이트 */}
      <button onClick={() => setCount(prev => prev + 1)}>증가</button>
    </div>
  );
}
```

이러한 튜플 구조의 장점

1. **명확한 역할 구분**
   - 상태 값과 업데이트 함수가 명확히 구분됨
   - 각 요소의 역할이 직관적으로 이해됨

2. **타입 안정성**
   - TypeScript와 함께 사용 시 타입 추론이 정확함
   - 잘못된 타입의 값 설정을 컴파일 시점에 방지

3. **일관된 패턴**
   - 모든 상태 관리에 동일한 패턴 적용 가능
   - 코드의 예측 가능성과 유지보수성 향상

```tsx
// 9.1.1-2.tsx
import { useState } from "react";

interface Member {
  name: string;
  age: number;
}

const MemberList = () => {
  const [memberList, setMemberList] = useState<Member[]>([]);
  
  // member의 타입이 Member 타입으로 보장됨
  const sumAge = memberList.reduce((sum, member) => sum + member.age, 0);
  
  const addMember = () => {
  // 🚨 오류: 'Member | { name: string; agee: number; }' 타입은
  // 'Member' 타입에 할당할 수 없음
    setMemberList([
      ...memberList,
      {
        name: "DokgoBaedal",
        agee: 11,
      },
    ]);
  };

  return (
    // ...
  );
};
```

#### `sumAge`가 `NaN`이 되는 이유

1. **타입 오류**
   - 새로 추가되는 멤버 객체의 속성명이 `agee`로 잘못 작성됨
   - 올바른 속성명은 `age`여야 함
   - TypeScript를 사용하더라도 이 오류를 컴파일 시점에 잡아내기 어려움

2. **런타임 동작**
   - `member.age`로 접근할 때 `agee` 속성은 `undefined`
   - `undefined + number` 연산의 결과는 `NaN`
   - `reduce` 함수가 `NaN`을 누적하게 됨

3. **해결 방법**
   ```tsx
   const addMember = () => {
     setMemberList([
       ...memberList,
       {
         name: "DokgoBaedal",
         age: 11, // 올바른 속성명으로 수정
       },
     ]);
   };
   ```

4. **예방 방법**
   - TypeScript의 타입 정의를 활용
   - 객체 리터럴의 속성명을 상수로 관리
   - ESLint 규칙을 통한 오타 방지

```tsx
import { useState } from "react";

interface Member {
  name: string;
  age: number;
}

const MemberList = () => {
  const [memberList, setMemberList] = useState<Member[]>([]);
  
  // member의 타입이 Member 타입으로 보장
  const sumAge = memberList.reduce((sum, member) => sum + member.age, 0);
  
  const addMember = () => {
  // 🚨 오류: 'Member | { name: string; agee: number; }' 타입은
  // 'Member' 타입에 할당할 수 없음
    setMemberList([
      ...memberList,
      {
        name: "DokgoBaedal",
        agee: 11,
      },
    ]);
  };

  return (
    // ...
  );
};
```

## 9-2. 의존성 배열을 사용하는 훅

## 9-2-1. `useEffect` 훅

`useEffect`는 리액트 컴포넌트에서 사이드 이펙트를 처리하기 위한 훅입니다. 컴포넌트의 렌더링 이후에 실행되어야 하는 코드를 처리하는데 사용됩니다.

```ts
// 9.1.2-1.ts
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
type DependencyList = ReadonlyArray<any>;
type EffectCallback = () => void | Destructor;
```

#### `useEffect` 타입 정의 분석

1. **함수 시그니처**
   ```ts
   function useEffect(effect: EffectCallback, deps?: DependencyList): void
   ```
   - `effect`: 실행할 사이드 이펙트 함수
   - `deps`: 의존성 배열 (선택적 매개변수)
   - 반환 타입: `void` (아무것도 반환하지 않음)

2. **EffectCallback 타입**
   ```ts
   type EffectCallback = () => void | Destructor
   ```
   - 사이드 이펙트를 수행하는 함수
   - 아무것도 반환하지 않거나 (`void`)
   - 정리(cleanup) 함수를 반환할 수 있음 (`Destructor`)
   - 예시:
     ```tsx
     // void를 반환하는 경우
     useEffect(() => {
       console.log('Effect executed');
     }, []);

     // Destructor를 반환하는 경우
     useEffect(() => {
       const subscription = someAPI.subscribe();
       return () => {
         subscription.unsubscribe();
       };
     }, []);
     ```

3. **DependencyList 타입**
   ```ts
   type DependencyList = ReadonlyArray<any>
   ```
   - 의존성 배열의 타입
   - `ReadonlyArray`: 읽기 전용 배열
   - `any`: 어떤 타입의 값이든 포함 가능
   - 예시:
     ```tsx
     // 다양한 타입의 의존성
     useEffect(() => {
       // ...
     }, [
       count,           // number
       name,           // string
       { id: 1 },      // object
       [1, 2, 3],      // array
       () => {},       // function
     ]);
     ```

4. **타입 안정성 고려사항**
   ```tsx
   // 9.1.2-7.ts
   interface User {
     id: number;
     name: string;
   }

   const UserProfile: React.FC<{ user: User }> = ({ user }) => {
     useEffect(() => {
       // user 객체의 타입이 보장됨
       console.log(user.name);
     }, [user]); // User 타입의 객체를 의존성으로 사용

     return <div>{user.name}</div>;
   };
   ```
   - TypeScript와 함께 사용 시 타입 안정성 확보
   - 의존성 배열의 값들이 올바른 타입을 가지도록 보장
   - 잘못된 타입의 값 사용 시 컴파일 에러 발생

5. **실제 사용 예시**
   ```tsx
   // 9.1.2-8.ts
   const [count, setCount] = useState<number>(0);
   const [text, setText] = useState<string>('');

   // 기본적인 사용
   useEffect(() => {
     document.title = `Count: ${count}`;
   }, [count]);

   // 클린업 함수가 있는 경우
   useEffect(() => {
     const timer = setTimeout(() => {
       console.log(text);
     }, 1000);

     return () => {
       clearTimeout(timer);
     };
   }, [text]);

   // 비동기 작업
   useEffect(() => {
     let isMounted = true;

     const fetchData = async () => {
       try {
         const data = await api.getData(count);
         if (isMounted) {
           setText(data);
         }
       } catch (error) {
         if (isMounted) {
           console.error(error);
         }
       }
     };

     fetchData();

     return () => {
       isMounted = false;
     };
   }, [count]);
   ```

#### 의존성 배열과 얕은 비교

1. **얕은 비교의 동작**
   ```tsx
   // 9.1.2-3.ts
   const { id, name } = value;

   useEffect(() => {
     // value.name과 value.id 대신 name, id를 직접 사용한다
     console.log(`Label updated: ${name} (${id})`);
   }, [id, name]);
   ```
   - 리액트는 의존성 배열의 각 항목을 `Object.is()`를 사용하여 비교합니다.
   - 객체나 배열의 경우 참조값만 비교합니다 (얕은 비교).
     ```tsx
     const obj1 = { count: 0 };
     const obj2 = { count: 0 };
     console.log(Object.is(obj1, obj2)); // false
     ```
   - 원시 타입의 경우 값 자체를 비교합니다.
     ```tsx
     console.log(Object.is(0, 0)); // true
     console.log(Object.is('hello', 'hello')); // true
     ```

2. **얕은 비교로 인한 문제**
   ```tsx
   // 9.1.2-4.ts
   const [data, setData] = useState({ count: 0 });

   useEffect(() => {
     // data가 변경될 때마다 실행됨
     console.log('Effect triggered:', data);
   }, [data]); // 🚨 객체의 참조가 변경될 때마다 실행

   const handleClick = () => {
     // 🚨 같은 값이어도 새로운 객체 생성
     setData({ count: 0 }); // 매번 새로운 객체 참조
   };
   ```
   - 객체나 배열을 의존성 배열에 포함할 때 주의해야 합니다.
   - 매 렌더링마다 새로운 참조가 생성되어 불필요한 effect 실행이 발생할 수 있습니다.
   - 해결 방법:
     ```tsx
     // 1. 필요한 값만 의존성 배열에 포함
     const { count } = data;
     useEffect(() => {
       console.log('Effect triggered:', count);
     }, [count]);

     // 2. useMemo를 사용하여 객체 메모이제이션
     const memoizedData = useMemo(() => ({ count: data.count }), [data.count]);
     ```

#### 경쟁 상태(Race Condition) 문제

1. **비동기 작업에서의 경쟁 상태**
   ```tsx
   // 9.1.2-5.ts
   const [data, setData] = useState(null);
   const [id, setId] = useState(1);

   useEffect(() => {
     let isCurrent = true; // 현재 요청이 유효한지 추적

     const fetchData = async () => {
       try {
         const result = await api.getData(id);
         if (isCurrent) { // 요청이 취소되지 않았다면
           setData(result);
         }
       } catch (error) {
         if (isCurrent) {
           console.error('Error fetching data:', error);
         }
       }
     };

     fetchData();

     return () => {
       isCurrent = false; // 컴포넌트가 언마운트되거나 id가 변경되면
     };
   }, [id]);
   ```
   - 빠른 연속 요청 시 이전 요청의 응답이 나중에 도착할 수 있습니다.
   - 이전 요청의 응답이 현재 상태를 덮어쓸 수 있습니다.
   - `isCurrent` 플래그로 요청의 유효성을 추적합니다.

2. **경쟁 상태 해결 방법**
   ```tsx
   // 9.1.2-6.ts
   useEffect(() => {
     const controller = new AbortController();

     const fetchData = async () => {
       try {
         const result = await api.getData(id, {
           signal: controller.signal
         });
         setData(result);
       } catch (error) {
         if (error.name === 'AbortError') {
           console.log('Request cancelled');
         } else {
           console.error('Error fetching data:', error);
         }
       }
     };

     fetchData();

     return () => {
       controller.abort(); // 이전 요청 취소
     };
   }, [id]);
   ```
   - `AbortController`를 사용하여 이전 요청을 명시적으로 취소
   - 요청의 유효성을 추적하는 플래그 사용
   - 에러 처리와 로딩 상태 관리

#### `useEffect` 사용 시 주의사항

1. **의존성 배열 관리**
   - 필요한 의존성만 포함하여 불필요한 effect 실행 방지
   - ESLint 규칙을 준수하여 의존성 누락 방지
   - 객체나 배열을 의존성으로 사용할 때는 주의

2. **클린업 함수 활용**
   ```tsx
   useEffect(() => {
     const subscription = someAPI.subscribe();
     const timer = setTimeout(() => {
       // 작업 수행
     }, 1000);

     return () => {
       subscription.unsubscribe();
       clearTimeout(timer);
     };
   }, []);
   ```
   - 리소스 정리 (구독 해제, 타이머 정리)
   - 메모리 누수 방지
   - 이전 effect의 정리

3. **비동기 작업 처리**
   - 경쟁 상태 방지를 위한 적절한 처리
   - 에러 처리와 로딩 상태 관리
   - 클린업 함수를 통한 요청 취소

## 9-2-2. `useLayoutEffect` 훅

`useLayoutEffect`는 `useEffect`와 유사하지만, DOM 업데이트가 완료된 후에 동기적으로 실행됩니다. 주로 레이아웃 측정이나 DOM 조작이 필요한 경우에 사용됩니다.

```ts
// 9.1.2-4.ts
type DependencyList = ReadonlyArray<any>;

function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
```

#### `useEffect` vs `useLayoutEffect` 실행 순서

1. **`useEffect`의 경우**
   ```jsx
   // 9.1.2-5.jsx
   const [name, setName] = useState("");

   useEffect(() => {
     // 매우 긴 시간이 흐른 뒤 아래의 setName()을 실행한다고 생각하자
     setName("배달이");
   }, []);

   return (
     <div>
       {`안녕하세요, ${name}님!`}
     </div>
   );
   ```
   실행 순서:
   1. 컴포넌트 렌더링
   2. 화면에 "안녕하세요, 님!" 표시
   3. `useEffect` 실행
   4. `setName("배달이")` 호출
   5. 컴포넌트 리렌더링
   6. 화면에 "안녕하세요, 배달이님!" 표시

2. **`useLayoutEffect`의 경우**
   ```jsx
   // 9.1.2-6.jsx
   const [name, setName] = useState("");

   useLayoutEffect(() => {
     // DOM 업데이트 직후 동기적으로 실행
     setName("배달이");
   }, []);

   return (
     <div>
       {`안녕하세요, ${name}님!`}
     </div>
   );
   ```
   실행 순서:
   1. 컴포넌트 렌더링
   2. DOM 업데이트
   3. `useLayoutEffect` 동기 실행
   4. `setName("배달이")` 호출
   5. 컴포넌트 리렌더링
   6. 화면에 "안녕하세요, 배달이님!" 표시

#### `useLayoutEffect` 사용 예시

1. **DOM 측정 및 조작**
   ```jsx
   // 9.1.2-7.jsx
   const MeasureExample = () => {
     const [width, setWidth] = useState(0);
     const elementRef = useRef(null);

     useLayoutEffect(() => {
       // DOM이 업데이트된 직후에 요소의 크기를 측정
       const { width } = elementRef.current.getBoundingClientRect();
       setWidth(width);
     }, []);

     return (
       <div ref={elementRef}>
         이 요소의 너비는 {width}px 입니다.
       </div>
     );
   };
   ```

2. **레이아웃 깜빡임 방지**
   ```jsx
   // 9.1.2-8.jsx
   const Tooltip = ({ text }) => {
     const [position, setPosition] = useState({ top: 0, left: 0 });
     const tooltipRef = useRef(null);

     useLayoutEffect(() => {
       // 툴크의 위치를 계산하고 설정
       const { top, left } = calculatePosition(tooltipRef.current);
       setPosition({ top, left });
     }, [text]);

     return (
       <div
         ref={tooltipRef}
         style={{
           position: 'absolute',
           top: position.top,
           left: position.left,
         }}
       >
         {text}
       </div>
     );
   };
   ```

3. **스크롤 위치 복원**
   ```jsx
   // 9.1.2-9.jsx
   const ScrollRestore = () => {
     const [scrollPosition, setScrollPosition] = useState(0);
     const containerRef = useRef(null);

     useLayoutEffect(() => {
       // 스크롤 위치를 즉시 복원
       containerRef.current.scrollTop = scrollPosition;
     }, [scrollPosition]);

     return (
       <div ref={containerRef} style={{ height: '300px', overflow: 'auto' }}>
         {/* 컨텐츠 */}
       </div>
     );
   };
   ```

#### `useLayoutEffect` 사용 시 주의사항

1. **성능 고려**
   - 동기적으로 실행되므로 무거운 연산은 피해야 함
   - 가능한 `useEffect` 사용을 권장
   - DOM 측정이나 조작이 꼭 필요한 경우에만 사용

2. **서버 사이드 렌더링**
   - 서버 사이드 렌더링 환경에서는 `useLayoutEffect`가 경고를 발생
   - 서버 사이드 렌더링이 필요한 경우 `useEffect` 사용 권장

3. **적절한 사용 사례**
   - DOM 요소의 크기나 위치 측정
   - 레이아웃 깜빡임 방지
   - 스크롤 위치 복원
   - DOM 조작이 필요한 애니메이션

## 9-2-3. `useMemo` 훅 과 `useCallback` 훅

```ts
// 9.1.2-3.ts
type DependencyList = ReadonlyArray<any>;

function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
```

#### 메모이제이션의 개념

메모이제이션은 이전에 계산한 결과를 저장해두고, 동일한 입력에 대해 다시 계산하지 않고 저장된 결과를 재사용하는 최적화 기법입니다.

1. **`useMemo`를 사용한 값 메모이제이션**
   ```tsx
   // 9.1.2-10.tsx
   const ExpensiveComponent = ({ data }: { data: number[] }) => {
     // 복잡한 계산을 메모이제이션
     const sortedData = useMemo(() => {
       console.log('데이터 정렬 중...');
       return [...data].sort((a, b) => a - b);
     }, [data]);

     return (
       <div>
         {sortedData.map(item => (
           <div key={item}>{item}</div>
         ))}
       </div>
     );
   };
   ```

2. **`useCallback`을 사용한 함수 메모이제이션**
   ```tsx
   // 9.1.2-11.tsx
   const ParentComponent = () => {
     const [count, setCount] = useState(0);
     const [text, setText] = useState('');

     // 이벤트 핸들러를 메모이제이션
     const handleClick = useCallback(() => {
       setCount(c => c + 1);
     }, []); // 의존성이 없으므로 항상 동일한 함수 참조

     return (
       <div>
         <button onClick={handleClick}>증가</button>
         <ChildComponent onButtonClick={handleClick} />
       </div>
     );
   };
   ```

#### 메모이제이션의 필요성

1. **불필요한 재계산 방지**
   ```tsx
   // 9.1.2-12.tsx
   const UserList = ({ users }: { users: User[] }) => {
     // 필터링과 정렬이 매 렌더링마다 실행됨
     const filteredUsers = users
       .filter(user => user.isActive)
       .sort((a, b) => a.name.localeCompare(b.name));

     // useMemo를 사용하여 의존성이 변경될 때만 재계산
     const memoizedUsers = useMemo(() => {
       return users
         .filter(user => user.isActive)
         .sort((a, b) => a.name.localeCompare(b.name));
     }, [users]);

     return (
       <div>
         {memoizedUsers.map(user => (
           <UserItem key={user.id} user={user} />
         ))}
       </div>
     );
   };
   ```

2. **자식 컴포넌트의 불필요한 리렌더링 방지**
   ```tsx
   // 9.1.2-13.tsx
   const ChildComponent = memo(({ onButtonClick }: { onButtonClick: () => void }) => {
     console.log('ChildComponent 렌더링');
     return <button onClick={onButtonClick}>클릭</button>;
   });

   const ParentComponent = () => {
     const [count, setCount] = useState(0);

     // 함수가 매 렌더링마다 새로 생성됨
     const handleClick = () => {
       setCount(c => c + 1);
     };

     // useCallback으로 메모이제이션된 함수
     const memoizedHandleClick = useCallback(() => {
       setCount(c => c + 1);
     }, []);

     return (
       <div>
         <p>Count: {count}</p>
         <ChildComponent onButtonClick={memoizedHandleClick} />
       </div>
     );
   };
   ```

#### 메모이제이션 사용 시 주의사항

1. **적절한 의존성 배열 관리**
   ```tsx
   // 9.1.2-14.tsx
   const Component = ({ data, onUpdate }: Props) => {
     // 🚨 잘못된 사용: 불필요한 메모이제이션
     const memoizedValue = useMemo(() => {
       return data.value + 1;
     }, [data]); // data 객체 전체를 의존성으로 사용

     // ✅ 올바른 사용: 필요한 값만 의존성으로 사용
     const { value } = data;
     const memoizedValue = useMemo(() => {
       return value + 1;
     }, [value]);
   };
   ```

2. **메모이제이션의 비용 고려**
   ```tsx
   // 9.1.2-15.tsx
   const Component = ({ items }: { items: number[] }) => {
     // 🚨 불필요한 메모이제이션
     const sum = useMemo(() => {
       return items.reduce((a, b) => a + b, 0);
     }, [items]);

     // ✅ 단순한 계산은 메모이제이션하지 않음
     const sum = items.reduce((a, b) => a + b, 0);
   };
   ```

3. **객체와 함수의 참조 안정성**
   ```tsx
   // 9.1.2-16.tsx
   const Component = () => {
     const [count, setCount] = useState(0);

     // 🚨 매 렌더링마다 새로운 객체 생성
     const config = {
       count,
       onUpdate: () => setCount(c => c + 1)
     };

     // ✅ useMemo로 객체 메모이제이션
     const memoizedConfig = useMemo(() => ({
       count,
       onUpdate: () => setCount(c => c + 1)
     }), [count]);

     return <ChildComponent config={memoizedConfig} />;
   };
   ```

#### 메모이제이션 최적화 전략

1. **계산 비용이 큰 작업**
   - 복잡한 데이터 변환
   - 무거운 필터링/정렬
   - 큰 배열의 처리

2. **자주 변경되지 않는 값**
   - 설정 객체
   - 이벤트 핸들러
   - 파생된 상태

3. **자식 컴포넌트의 props**
   - 함수 참조
   - 객체 참조
   - 배열 참조

## 9-3. `useRef` 훅

`useRef`는 리액트 컴포넌트에서 DOM 요소나 값을 참조하기 위한 훅입니다. 렌더링에 영향을 주지 않으면서 값을 유지할 수 있습니다.

#### `useRef`의 타입 정의

```tsx
// 9.1.3-2.ts
function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T | null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;

interface MutableRefObject<T> {
  current: T;
}

interface RefObject<T> {
  readonly current: T | null;
}
```

#### `useRef`의 주요 사용 사례

1. **DOM 요소 참조**
   ```tsx
   // 9.1.3-1.tsx
   import { useRef } from "react";

   const MyComponent = () => {
     // HTMLInputElement 타입의 ref 생성
     const ref = useRef<HTMLInputElement>(null);
     
     const onClick = () => {
       // ref.current가 존재할 때만 focus() 메서드 호출
       ref.current?.focus();
     };
     
     return (
       <>
         <button onClick={onClick}>ref에 포커스!</button>
         {/* ref를 input 요소에 연결 */}
         <input ref={ref} />
       </>
     );
   };
   ```

2. **렌더링에 영향을 주지 않는 값 저장**
   ```tsx
   // 9.1.3-10.tsx
   type BannerProps = {
     autoplay: boolean;
   };

   const Banner: React.FC<BannerProps> = ({ autoplay }) => {
     // 자동 재생 일시 정지 상태를 저장하는 ref
     const isAutoPlayPause = useRef(false);
     
     if (autoplay) {
       // 터치 포인트가 없고 자동 재생이 일시 정지되지 않은 경우에만 자동 재생 유지
       const keepAutoPlay = !touchPoints[0] && !isAutoPlayPause.current;
     }

     return (
       <>
         {autoplay && (
           <button
             aria-label="자동 재생 일시 정지"
             // isAutoPlayPause는 렌더링에는 영향을 미치지 않고 로직에만 영향을 주므로
             // 상태로 사용해서 불필요한 렌더링을 유발할 필요가 없다
             onClick={() => { isAutoPlayPause.current = true }}
           />
         )}
       </>
     );
   };
   ```

#### 자식 컴포넌트에 `ref` 전달하기

1. **잘못된 `ref` 전달 방식**
   ```tsx
   // 9.1.3-3.tsx
   import { useRef } from "react";

   const Component = () => {
     const ref = useRef<HTMLInputElement>(null);
     return <MyInput ref={ref} />;
   };

   interface Props {
     ref: RefObject<HTMLInputElement>;
   }

   /**
    * 🚨 경고: MyInput: `ref`는 prop이 아닙니다. 접근하려고 하면
    * `undefined`가 반환됩니다.
    * 자식 컴포넌트 내에서 동일한 값에 접근해야 하는 경우,
    * 다른 prop으로 전달해야 합니다.
    */
   const MyInput = ({ ref }: Props) => {
     return <input ref={ref} />;
   };
   ```

2. **올바른 `ref` 전달 방식**
   ```tsx
   // 9.1.3-4.tsx
   interface Props {
     name: string;
   }

   // forwardRef를 사용하여 ref를 자식 컴포넌트로 전달
   const MyInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
     return (
       <div>
         <label>{props.name}</label>
         <input ref={ref} />
       </div>
     );
   });
   ```

#### `forwardRef` 타입 분석

1. **`forwardRef` 함수 타입**
   ```tsx
   // 9.1.3-5.ts
   function forwardRef<T, P = {}>(
     render: ForwardRefRenderFunction<T, P>
   ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
   ```
   - `T`: ref가 가리킬 요소의 타입 (예: HTMLInputElement)
   - `P`: 컴포넌트의 props 타입 (예: { name: string })

2. **`ForwardRefRenderFunction` 인터페이스**
   ```tsx
   // 9.1.3-6.ts
   interface ForwardRefRenderFunction<T, P = {}> {
     // props와 ref를 받아 ReactElement를 반환하는 함수
     (props: P, ref: ForwardedRef<T>): ReactElement | null;
     displayName?: string | undefined;
     defaultProps?: never | undefined;
     propTypes?: never | undefined;
   }
   ```

3. **`ForwardedRef` 타입**
   ```tsx
   // 9.1.3-7.ts
   type ForwardedRef<T> =
     | ((instance: T | null) => void)  // 콜백 함수 형태의 ref
     | MutableRefObject<T | null>      // useRef로 생성된 ref
     | null;                           // ref가 전달되지 않은 경우
   ```

#### `useRef` 사용 시 주의사항

1. **렌더링과의 관계**
   - `ref.current` 값 변경은 리렌더링을 트리거하지 않음
   - 렌더링 중에 `ref.current` 값을 읽거나 쓰면 안 됨
   - `useEffect`나 이벤트 핸들러에서 `ref.current` 접근

2. **초기화 시점**
   - `useRef`는 컴포넌트의 전체 생명주기 동안 유지됨
   - `null`로 초기화된 ref는 마운트 후에만 값이 설정됨
   - 타입 안정성을 위해 적절한 타입 지정 필요

3. **메모리 관리**
   - 컴포넌트가 언마운트되면 ref도 함께 정리됨
   - 클린업이 필요한 경우 `useEffect`의 반환 함수에서 처리

4. **성능 최적화**
   - 불필요한 리렌더링을 방지하기 위해 상태 대신 ref 사용
   - DOM 조작이 필요한 경우에만 ref 사용
   - 이전 값과 현재 값을 비교할 때 유용

5. **타입 안정성**
   - 제네릭을 사용하여 ref의 타입을 명시적으로 지정
   - `null` 초기값에 대한 안전한 처리
   - TypeScript의 타입 추론 활용


#### `useImperativeHandle`

`useImperativeHandle`은 부모 컴포넌트에서 자식 컴포넌트의 ref를 통해 접근할 수 있는 메서드를 커스터마이징할 수 있게 해주는 훅입니다.

1. **자식 컴포넌트에서의 사용**
   ```tsx
   // 9.1.3-8.ts
   // <form> 태그의 submit 함수만 따로 뽑아와서 정의한다
   type CreateFormHandle = Pick<HTMLFormElement, "submit">;

   type CreateFormProps = {
     defaultValues?: CreateFormValue;
   };

   const JobCreateForm: React.ForwardRefRenderFunction<CreateFormHandle, CreateFormProps> = (props, ref) => {
     // useImperativeHandle Hook을 사용해서 submit 함수를 커스터마이징한다
     useImperativeHandle(ref, () => ({
       submit: () => {
         /* submit 작업을 진행 */
       }
     }));
     
     // ...
   }
   ```
   - `Pick<HTMLFormElement, "submit">`: HTMLFormElement에서 submit 메서드만 선택하여 타입 정의
   - `useImperativeHandle`: 부모 컴포넌트에 노출할 메서드를 정의
   - 커스터마이징된 submit 메서드를 통해 폼 제출 로직을 캡슐화

2. **부모 컴포넌트에서의 사용**
   ```tsx
   // 9.1.3-9.ts
   const CreatePage: React.FC = () => {
     // `CreateFormHandle` 형태를 가진 자식의 ref를 불러온다
     const refForm = useRef<CreateFormHandle>(null);
     
     const handleSubmitButtonClick = () => {
       // 불러온 ref의 타입에 따라 자식 컴포넌트에서 정의한 함수에 접근할 수 있다
       refForm.current?.submit();
     };
     
     // ...
   };
   ```
   - `useRef<CreateFormHandle>`: 자식 컴포넌트에서 정의한 타입의 ref 생성
   - `refForm.current?.submit()`: 자식 컴포넌트에서 커스터마이징한 submit 메서드 호출
   - 타입 안정성을 통해 자식 컴포넌트의 메서드에 안전하게 접근

#### `useRef`의 여러가지 특징

1. **렌더링에 영향을 주지 않는 값 저장**
   ```tsx
   type BannerProps = {
     autoplay: boolean;
   };

   const Banner: React.FC<BannerProps> = ({ autoplay }) => {
     // 렌더링에 영향을 주지 않는 ref를 사용
     const isAutoPlayPause = useRef(false);

     if (autoplay) {
       // 터치 포인트가 없고 자동 재생이 일시 정지되지 않은 경우에만 자동 재생 유지
       const keepAutoPlay = !touchPoints[0] && !isAutoPlayPause.current;
     }

     return (
       <>
         {autoplay && (
           <button
             aria-label="자동 재생 일시 정지"
             // isAutoPlayPause는 렌더링에는 영향을 미치지 않고 로직에만 영향을 주므로
             // 상태로 사용해서 불필요한 렌더링을 유발할 필요가 없다
             onClick={() => { isAutoPlayPause.current = true }}
           />
         )}
       </>
     );
   };
   ```
   - `isAutoPlayPause.current` 값 변경은 리렌더링을 트리거하지 않음
   - 상태로 사용하면 불필요한 리렌더링이 발생할 수 있는 경우에 적합
   - 컴포넌트의 생명주기 동안 값이 유지됨

2. **DOM 요소 참조와 안전한 접근**
   ```tsx
   const Label: React.FC<{ text: string }> = ({ text }) => {
     // 렌더링에 영향을 주지 않는 ref를 사용
     const labelRef = useRef<HTMLLabelElement>(null);

     // labelRef.current는 렌더링에 영향을 주지 않으므로
     // 렌더링 중에 안전하게 접근할 수 있다
     console.log(labelRef.current?.textContent);

     return <label ref={labelRef}>{text}</label>;
   };
   ```
   - `useRef<HTMLLabelElement>`: HTML label 요소에 대한 타입이 지정된 ref
   - `labelRef.current?.textContent`: 옵셔널 체이닝을 통한 안전한 접근
   - DOM 요소의 속성에 안전하게 접근 가능

#### `useRef` 사용 시 주요 특징

1. **값의 지속성**
   - 컴포넌트가 리렌더링되어도 값이 유지됨
   - `current` 속성을 통해 값에 접근하고 수정 가능
   - 값 변경이 리렌더링을 트리거하지 않음

2. **타입 안정성**
   - 제네릭을 통한 타입 지정으로 타입 안정성 보장
   - DOM 요소 참조 시 정확한 타입 지정 가능
   - `null` 초기값에 대한 안전한 처리

3. **성능 최적화**
   - 불필요한 리렌더링을 방지하기 위해 상태 대신 ref 사용
   - DOM 조작이 필요한 경우에만 ref 사용
   - 이전 값과 현재 값을 비교할 때 유용

4. **메모리 관리**
   - 컴포넌트가 언마운트되면 ref도 함께 정리됨
   - 클린업이 필요한 경우 `useEffect`와 함께 사용
   - 메모리 누수 방지를 위한 적절한 정리 필요

## 9-4. 커스텀 훅

커스텀 훅은 리액트의 기본 훅들을 조합하여 재사용 가능한 로직을 만드는 방법입니다. "use"로 시작하는 함수를 만들어 사용합니다.

### 9-4-1. 커스텀 훅 만들기

1. **기본적인 커스텀 훅 구현**
   ```tsx
   // 9.2.1-1.js
   import { useState } from "react";

   const useInput = (initialValue) => {
     // 상태와 상태 변경 함수를 생성
     const [value, setValue] = useState(initialValue);
     
     // 입력값 변경 핸들러
     const onChange = (e) => {
       setValue(e.target.value);
     };

     // 상태값과 변경 핸들러를 객체로 반환
     return { value, onChange };
   };
   ```

2. **커스텀 훅 사용 예시**
   ```tsx
   // 9.2.1-2.jsx
   const MyComponent = () => {
     // 커스텀 훅 사용
     const { value, onChange } = useInput("");
     
     return (
       <div>
         <h1>{value}</h1>
         <input onChange={onChange} value={value} />
       </div>
     );
   };

   export default App;
   ```


### 9-4-2. 타입스크립트로 커스텀 훅 강화하기

1. **타입이 없는 경우의 문제점**
   ```tsx
   // 9.2.2-1.ts
   import { useState, useCallback } from "react";

   // 🚨 Parameter 'initialValue' implicitly has an 'any' type.ts(7006)
   const useInput = (initialValue) => {
     const [value, setValue] = useState(initialValue);

     // 🚨 Parameter 'e' implicitly has an 'any' type.ts(7006)
     const onChange = useCallback((e) => {
       setValue(e.target.value);
     }, []);

     return { value, onChange };
   };

   export default useInput;
   ```

2. **타입스크립트로 강화된 버전**
   ```tsx
   // 9.2.2-2.ts
   import { useState, useCallback, ChangeEvent } from "react";

   // ✅ initialValue에 string 타입을 정의
   const useInput = (initialValue: string) => {
     const [value, setValue] = useState(initialValue);

     // ✅ 이벤트 객체인 e에 ChangeEvent<HTMLInputElement> 타입을 정의
     const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
       setValue(e.target.value);
     }, []);

     return { value, onChange };
   };

   export default useInput;
   ```

#### 커스텀 훅의 장점

1. **로직 재사용**
   - 여러 컴포넌트에서 동일한 로직을 쉽게 재사용
   - 코드 중복을 줄이고 유지보수성 향상
   - 관심사의 분리를 통한 코드 구조화

2. **타입 안정성**
   - TypeScript를 통한 타입 체크
   - 컴파일 시점에서 오류 발견
   - IDE의 자동 완성 지원

3. **테스트 용이성**
   - 독립적인 로직 단위로 테스트 가능
   - 컴포넌트와 분리된 테스트 작성
   - 재사용 가능한 테스트 케이스

4. **상태 관리의 캡슐화**
   - 관련된 상태와 로직을 한 곳에 모음
   - 컴포넌트의 복잡도 감소
   - 명확한 인터페이스 제공

#### 커스텀 훅 사용 시 주의사항

1. **네이밍 규칙**
   - 반드시 "use"로 시작
   - 목적을 명확히 나타내는 이름 사용
   - 일관된 네이밍 컨벤션 유지

2. **의존성 관리**
   - 필요한 의존성만 포함
   - 불필요한 리렌더링 방지
   - 메모이제이션 적절히 사용

3. **에러 처리**
   - 적절한 에러 처리 로직 포함
   - 타입 안정성 보장
   - 사용자 피드백 제공

4. **문서화**
   - 사용 방법 명확히 문서화
   - 타입 정의와 함께 사용 예시 제공
   - 주석을 통한 코드 설명