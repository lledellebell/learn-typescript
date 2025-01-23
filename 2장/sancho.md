# 2. 타입

## 2-3. 원시타입

타입스크립트는 자바스크립트의 슈퍼셋이기 때문에 자바스크립트의 대응되는 부분이 많지만 차이점도 있다.
자바스크립트에서 값은 타입을 가지지만 변수는 별도의 타입을 가지지 않는다.
타입스크립트는 이 변수에 타입을 지정할 수 있는 타입 시스템 체계를 구축한다.
특정 타입을 지정한 변수에 해당 타입의 값만 할당할 수 있는 식이다.
자바스크립트의 7가지 원시값은 타입스크립트에서 원시값으로 존재한다.

_boolean_
오직 true와 false 값만 할당 할 수 있는 boolean타입이다.

_undefined_
정의되지 않았다는 의미의 타입으로 오직 undefined값만 할당 할 수 있다.
변수 선언만 하고 값을 할당하지 않았을 때 undefined가 반환되는 것을 볼 수 있다.
즉 초기화되어 있지 않거나 존재하지 않음을 나타낸다.

_null_
자바스크립트에서 보통 빈값을 할당 할 때 사용

```
type Person1 = {
  name: string;
  job?: string;
};

type Person2 = {
  name: string;
  job: string | null;
};
```

_Person1_
name: 필수 속성 (string 타입).
job: 선택 속성 (optional), 값이 없을 수도 있고, 있다면 string 타입.
?는 해당 속성이 없을 수 있음을 나타냅니다.
TypeScript에서 선택 속성은 기본적으로 undefined를 포함합니다.

```
const person1A: Person1 = { name: "Alice" }; // job 속성이 없어도 됨
const person1B: Person1 = { name: "Bob", job: "Developer" }; // job이 문자열
const person1C: Person1 = { name: "Charlie", job: undefined }; // 명시적으로 undefined 가능
```

_Person2_
name: 필수 속성 (string 타입).
job: 필수 속성으로, 값이 string이거나 null일 수 있음.
job 속성은 항상 존재해야 하지만, 값으로 **의도적으로 비어 있음을 나타내는 null**이 올 수 있습니다.

```
const person2A: Person2 = { name: "Alice", job: "Developer" }; // job이 문자열
const person2B: Person2 = { name: "Bob", job: null }; // job이 null
// const person2C: Person2 = { name: "Charlie" }; // 오류: job이 없으면 안 됨

```

### 두 타입의 차이점

| **특징**           | **Person1**                               | **Person2**                                         |
| ------------------ | ----------------------------------------- | --------------------------------------------------- |
| **속성 존재 여부** | `job` 속성이 없을 수도 있음 (`optional`). | `job` 속성은 반드시 존재해야 함.                    |
| **값의 범위**      | `job`은 `string` 또는 `undefined`.        | `job`은 `string` 또는 `null`.                       |
| **용도 및 의미**   | `job` 속성이 없어도 문제없는 상황에 적합. | `job` 속성이 비어 있을 수 있음을 명시적으로 나타냄. |
| **예상 사용 사례** | 기본값이나 미지정 속성을 처리할 때.       | 값이 의도적으로 없음을 구별해야 할 때.              |

_number_
자바스크립트의 숫자에 해당하는 모든 원시 값을 할당할 수 있다.
자바 같은 언어와 달리 모두 number 타입에 할당 가능
원시 값 중 NaN(Not a Numer)나 Infinity도 포함

_bigInt_
ES2020에서 새롭게 도입된 데이터 타입으로 타입스크립트 3.2 버전부터 사용가능
bigInt를 사용하면 더 큰수 처리 가능
number타입과는 서로 다른 타입이라 상호작용 불가능

_string_
문자열을 할당할 수 있는 타입

_symbol_

```
const MOVIE_TITLE = Symbol("title");
const MUSIC_TITLE = Symbol("title");
console.log(MOVIE_TITLE === MUSIC_TITLE); // false

let SYMBOL: unique symbol = Symbol(); // A variable whose type is a 'unique symbol'
// type must be 'const'
```

ES2015에서 도입된 타입으로 Symbol 함수를 사용하면 어떤 값도 중복되지 않는 유일한 값을 생성
타입스크립트에는 symbol타입과 const 선언에서만 사용할 수 있는 unique symbol 타입이라는 symbol의 하위 타입도 있다.

## 2-4. 객체타입

앞에서 언급한 7가지 원시 타입에 속하지 않는 값은 모두 객체 타입으로 분류
자바스크립트에서 객체의 범주는 굉장히 넓고 이런 값들을 객체라고 말한다.

타입스크립트에서는 다양한 형태는 가지는 객체마다 개별적으로 타입을 지정할 수 있다.

### object

자바스크립트 객체의 정의에 맞게 이에 대응하는 타입스크립트 타임시스템은 object타입이다.
object타입은 가급적 사용하지 말도록 권장되는데 나중에 다룰 any타입과 유사하게 객체에 해당하는 모든 타입 값을 유동적으로 할당할 수 있어 정적 타이핑의 의미가 크게 퇴색되기 때문이다.

```
  return (
    Object.prototype.toString.call(value).replace(/\[|\]|\s|object/g, "") === "Object"
  );
}
// 객체, 배열, 정규 표현식, 함수, 클래스 등 모두 object 타입과 호환된다
isObject({});
isObject({ name: "KG" });
isObject([0, 1, 2]);
isObject(new RegExp("object"));
isObject(() => {
  console.log("hello wolrd");
});
isObject(class Class {});
// 그러나 원시 타입은 호환되지 않는다
isObject(20); // false
isObject("KG"); // false
```

### {}

중괄호는 자바스크립트에서 객체 리터럴 방식으로 객체를 생성할때 사용
타입스크립트에서는 객체를 타이핑할 때도 사용할 수 있는데 중괄호 안에 객채의 속성 타입을 지정해주는 식으로 사용함

타입스크립트도 {}를 사용할 수 있는데 자바스크립트와 마찬가지로 빈 객체를 의미한다.
따라서 {}타입으로 지정된 객체에는 어떤 값도 속성으로 할당할 수 없다.
빈 객체 타입을 지정하기 위해서는 유틸리티 타입으로 Record<string,never> 사용하는게 바람직하다.

```
let noticePopup: {} = {};

noticePopup.title = "IE 지원 종료 안내"; // (X) title 속성을 지정할 수 없음
```

### array

자바스크립트의 배열구조는 원소를 자유롭게 추가하고 제거할 수 있으며 타입제한없이 다양한 값을 다룬다.
그러나 이런 쓰임은 타입스크립트가 추구하는 정적 타이핑 방향과 맞지 않음

타입스크립트에서는 배열을 array 라는 별도 타입으로 다룬다. 타입스크립트 배열 타입은 하나의 타입 값만 가질 수 있다는 점에서 자바스크립트 배열보다 조금 더 엄격하다.

```
const getCartList = async (cartId: number[]) => {
  const res = await CartApi.GET_CART_LIST(cartId);
  return res.getData();
};

getCartList([]); // (O) 빈 배열도 가능하다
getCartList([1001]); // (O)
getCartList([1001, 1002, 1003]); // (O) number 타입 원소 몇 개가 들어와도 상관없다
getCartList([1001, "1002"]); // (X) ‘1002’는 string 타입이므로 불가하다


```

여기서 주의할점은 튜플 타입도 대괄호로 선언한다는 것
타입스크립트 튜플타입은 배열과 유사하지만 튜플의 대괄호 내부에는 선언 시점에 지정해준 타입 값만 할당 가능함
원소개수도 타입 선언 시점에 미리 정해진다.

### type과 interface

객체를 타이핑하기 위해서는 타입스크립트에서만 독자적으로 사용할 수 있는 키워드를 사용하는게 일반적이다.
흔히 객체를 타이핑하기 위해 자주 사용하는 키워드로 type과 interface가 있다.

```
type NoticePopupType = {
  title: string;
  description: string;
};

interface INoticePopup {
  title: string;
  description: string;
}
const noticePopup1: NoticePopupType = { /* ... */ };
const noticePopup2: INoticePopup = { /* ... */ };
```

타입스크립트 컴파일러는 변수 사용 방식과 할당된 값의 같입을 분석해서 타입을 유추한다는 것을 의미
따라서 모든 변수에 타입을 일일이 명시적으로 선언할 필요가 없다.

NoticePopupType과 INoticePopup은 동일한 구조를 가지기 때문에, 두 객체에 요구되는 속성과 데이터 형태는 동일합니다.

### 주요 차이점과 활용

#### 타입 앨리어스(Type Alias)

Type Alias는 복잡한 타입(유니온, 튜플, 함수 타입 등)을 정의할 때 유용합니다.
기존의 타입 정의를 간결하게 사용할 수 있습니다.
확장(extends) 기능이 제한적이며 인터페이스보다 덜 유연합니다.

#### 인터페이스(Interface)

Interface는 주로 객체 타입을 정의하는 데 사용됩니다.
다른 인터페이스를 확장하거나 병합할 수 있는 등 확장성과 유연성이 뛰어납니다.
클래스와 함께 사용하여 구현을 강제하거나 코드 구조를 명확히 할 때 적합합니다.

```
type NoticePopupType = {
  title: string;
  description: string;
};

interface INoticePopup {
  title: string;
  description: string;
}

const notice1: NoticePopupType = {
  title: "Hello",
  description: "This is a notice",
};

const notice2: INoticePopup = {
  title: "Hello",
  description: "This is another notice",
};

// 구조가 동일하기 때문에 서로 할당 가능
const notice3: INoticePopup = notice1; // OK
const notice4: NoticePopupType = notice2; // OK

```

여기서 질문 type과 interface 를 어떤 기준으로 나뉘어서 사용하는 지 질문하기

# Type과 Interface: 사용 기준 및 상세 설명

`type`과 `interface`는 타입스크립트에서 객체, 함수, 배열 등 다양한 타입을 정의할 때 사용하는 주요 도구입니다.  
두 가지 모두 유사한 방식으로 타입을 정의할 수 있지만, **사용 목적**과 **특화된 기능**이 다릅니다.

---

## 1. 객체 타입 정의는 `interface`가 더 적합한 이유

### 1-1. 확장성 (`extends`)

`interface`는 **확장(extends)**이 가능하여 객체의 구조를 계층적으로 정의하고, 재사용성을 높일 수 있습니다.  
또한, 동일 이름의 `interface`가 자동으로 병합되기 때문에 여러 모듈에서 확장하여 사용할 수 있습니다.

#### 예제: 객체 구조 정의 및 확장

```typescript
interface User {
  name: string;
  age: number;
}

interface Admin extends User {
  role: string; // 추가 속성
}

const admin: Admin = {
  name: 'Alice',
  age: 30,
  role: 'superadmin',
};
```

### 1-2. 병합 가능성

interface는 동일한 이름으로 정의된 구조를 병합할 수 있습니다.
이를 통해 라이브러리 확장이나 전역적으로 타입을 추가하는 데 유용합니다.

```
예제: 병합
typescript
복사
편집
// 같은 이름의 인터페이스가 병합됨
interface User {
  name: string;
}

interface User {
  age: number;
}

const user: User = {
  name: "Alice",
  age: 25,
}; // OK
활용 사례: 전역 객체(Window, Document 등)의 속성을 확장하거나 외부 라이브러리를 확장할 때 유용합니다.
```

### 1-3. 클래스와의 연동

interface는 클래스에서 구현(implements) 가능하여, 특정 구조를 강제하는 데 적합합니다.

```
예제: 클래스 구현
typescript
복사
편집
interface IUser {
  name: string;
  login(): void;
}

class User implements IUser {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  login() {
    console.log(`${this.name} has logged in.`);
  }
}
```

### 2. 복잡한 타입 정의는 type이 더 적합한 이유

2-1. 유니온 타입 (Union Type)
type은 유니온 타입을 정의할 수 있어, 여러 값의 조합을 간단히 표현할 수 있습니다.

```
예제: 유니온 타입
typescript
복사
편집
type Status = "active" | "inactive" | "suspended";

const userStatus: Status = "active"; // OK
const invalidStatus: Status = "unknown"; // Error
2-2. 튜플 타입
type은 배열과 유사한 구조의 튜플 타입을 정의하는 데 적합합니다.
튜플은 고정된 길이와 타입 순서를 가지며, interface로는 정의할 수 없습니다.

예제: 튜플 타입
typescript
복사
편집
type Point = [number, number]; // x, y 좌표

const coordinates: Point = [10, 20]; // OK
const invalidPoint: Point = [10, "20"]; // Error
2-3. 함수 타입
type은 함수의 호출 시그니처를 정의하는 데 유용합니다.

예제: 함수 타입 정의
typescript
복사
편집
type Add = (a: number, b: number) => number;

const add: Add = (x, y) => x + y; // OK
장점: 함수 타입을 명확히 정의하고, 매개변수와 반환값의 타입을 한눈에 파악할 수 있습니다.
```

### 2-4. 복잡한 조합 타입

type은 유니온(|), 인터섹션(&), 조건부 타입 등 복잡한 조합을 표현하는 데 적합합니다.

```
예제: 인터섹션 타입
typescript
복사
편집
type Name = { name: string };
type Age = { age: number };

type Person = Name & Age;

const person: Person = { name: "Alice", age: 25 }; // OK
예제: 조건부 타입
typescript
복사
편집
type IsString<T> = T extends string ? "yes" : "no";

type Test1 = IsString<string>; // "yes"
type Test2 = IsString<number>; // "no"
```

### 3. 결론: 언제 type과 interface를 사용해야 할까?

| 상황                             | 사용      | 추천이유                                           |
| -------------------------------- | --------- | -------------------------------------------------- |
| 객체의 구조 정의                 | interface | 확장성과 병합 가능성 덕분에 더 유연함.             |
| 클래스에서 특정 구조 구현 강제   | interface | 클래스와의 연동성(implements)이 뛰어남.            |
| 유니온, 인터섹션 타입 정의       | type      | 복잡한 타입 조합을 간단히 표현 가능.               |
| 함수 호출 시그니처 정의          | type      | 함수의 매개변수와 반환값을 명확히 표현 가능.       |
| 튜플, 조건부 타입 등 고정된 구조 | type      | interface로는 표현 불가능한 정밀한 구조 정의 가능. |
| 외부 라이브러리 확장             | interface | 동일 이름 병합 기능을 통해 전역적으로 확장 가능.   |

### function

타입스크립트에서 별도 함수 타입으로 지정
다만 앞서 살펴본 객채의 타이핑과 달리 주의해야 할점이 있다.

1. 자바스크립트에서 typeof연산자로 확인한 funtion이라는 키워드 자체를 타입으로 사용하지 않는다는 것
2. 함수는 매개 변수목록을 받을 수 있는데 타입스크립트에서는 매개변수도 별도 타입으로 지정해야한다.

```
function add(a: number, b: number): number {
  return a + b;
}
```

### 타입스크립트의 호출 시그니처란?

**_호출 시그니처(call signature)_**는 함수의 매개변수와 반환값의 타입을 정의하는 방법입니다. 즉, 어떤 함수가 어떤 타입의 인자를 받고 어떤 타입의 값을 반환하는지 명시적으로 표현한 것입니다.

호출 시그니처는 주로 함수 타입을 정의할 때 사용합니다.

```
type Add = (a: number, b: number) => number;

const add: Add = (x, y) => x + y;

console.log(add(3, 5)); // 8


interface Multiply {
  (x: number, y: number): number;
}

const multiply: Multiply = (a, b) => a * b;

console.log(multiply(2, 4)); // 8
```
