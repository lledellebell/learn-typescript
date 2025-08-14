---
title: 일상적인 타입들
layout: docs
permalink: /docs/handbook/2/everyday-types.html
oneline: "언어의 원시 타입들."
---

이 장에서는 JavaScript 코드에서 찾을 수 있는 가장 일반적인 값의 타입들을 다루고, TypeScript에서 이러한 타입들을 설명하는 해당 방법들을 설명하겠습니다.
이것은 완전한 목록이 아니며, 향후 장에서는 다른 타입들을 명명하고 사용하는 더 많은 방법들을 설명할 것입니다.

타입들은 타입 주석뿐만 아니라 훨씬 더 많은 _장소_에 나타날 수도 있습니다.
타입들 자체에 대해 배우면서, 새로운 구조를 형성하기 위해 이러한 타입들을 참조할 수 있는 장소들에 대해서도 배우게 될 것입니다.

JavaScript나 TypeScript 코드를 작성할 때 마주칠 수 있는 가장 기본적이고 일반적인 타입들을 검토하는 것부터 시작하겠습니다.
이것들은 나중에 더 복잡한 타입들의 핵심 구성 요소가 될 것입니다.

## 원시 타입들: `string`, `number`, 그리고 `boolean`

JavaScript에는 매우 일반적으로 사용되는 세 가지 [원시 타입](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)이 있습니다: `string`, `number`, 그리고 `boolean`.
각각은 TypeScript에서 해당하는 타입을 가지고 있습니다.
예상하시겠지만, 이것들은 해당 타입의 값에 JavaScript `typeof` 연산자를 사용했을 때 보게 될 것과 같은 이름들입니다:

- `string`은 `"Hello, world"`와 같은 문자열 값을 나타냅니다
- `number`는 `42`와 같은 숫자를 위한 것입니다. JavaScript는 정수를 위한 특별한 런타임 값을 가지지 않으므로, `int`나 `float`에 해당하는 것이 없습니다 - 모든 것은 단순히 `number`입니다
- `boolean`은 `true`와 `false` 두 값을 위한 것입니다

> 타입 이름 `String`, `Number`, 그리고 `Boolean`(대문자로 시작하는)은 합법적이지만, 코드에서 매우 드물게 나타날 특별한 내장 타입들을 참조합니다. 타입에는 _항상_ `string`, `number`, 또는 `boolean`을 사용하세요.

## 배열

`[1, 2, 3]`과 같은 배열의 타입을 지정하려면, `number[]` 구문을 사용할 수 있습니다; 이 구문은 모든 타입에 대해 작동합니다 (예: `string[]`은 문자열의 배열이고, 기타 등등).
이것이 `Array<number>`로 작성된 것을 볼 수도 있는데, 이는 같은 의미입니다.
_제네릭_을 다룰 때 `T<U>` 구문에 대해 더 배우게 될 것입니다.

> `[number]`는 다른 것이라는 점에 주목하세요; [튜플](/docs/handbook/2/objects.html#tuple-types) 섹션을 참조하세요.

## `any`

TypeScript에는 특정 값이 타입 검사 오류를 일으키지 않기를 원할 때마다 사용할 수 있는 특별한 타입인 `any`가 있습니다.

값이 `any` 타입일 때, 그것의 모든 속성에 접근할 수 있고 (이는 차례로 `any` 타입이 될 것입니다), 함수처럼 호출할 수 있고, 모든 타입의 값에 (또는 값으로부터) 할당할 수 있고, 또는 구문적으로 합법적인 거의 모든 다른 것을 할 수 있습니다:

```ts twoslash
let obj: any = { x: 0 }; // obj는 any 타입의 객체입니다
// 다음 코드 라인들 중 어느 것도 컴파일러 오류를 발생시키지 않습니다.
// `any`를 사용하면 모든 추가 타입 검사가 비활성화되며, 
// TypeScript보다 환경을 더 잘 안다고 가정됩니다.
obj.foo(); // 존재하지 않는 메서드 호출
obj(); // 객체를 함수처럼 호출
obj.bar = 100; // 새로운 속성 할당
obj = "hello"; // 문자열로 재할당
const n: number = obj; // number 타입 변수에 할당
```

`any` 타입은 특정 코드 라인이 괜찮다고 TypeScript를 설득하기 위해 긴 타입을 작성하고 싶지 않을 때 유용합니다.

### `noImplicitAny`

타입을 지정하지 않고, TypeScript가 컨텍스트에서 추론할 수 없을 때, 컴파일러는 일반적으로 `any`로 기본 설정됩니다.

하지만 이것을 피하고 싶을 것입니다. `any`는 타입 검사가 되지 않기 때문입니다.
암시적 `any`를 오류로 플래그하려면 컴파일러 플래그 [`noImplicitAny`](/tsconfig#noImplicitAny)를 사용하세요.

## 변수에 대한 타입 주석

`const`, `var`, 또는 `let`을 사용하여 변수를 선언할 때, 변수의 타입을 명시적으로 지정하기 위해 타입 주석을 선택적으로 추가할 수 있습니다:

```ts twoslash
let myName: string = "Alice"; // myName은 string 타입입니다
//        ^^^^^^^^ 타입 주석
```

> TypeScript는 `int x = 0;`과 같은 "왼쪽에 타입" 스타일 선언을 사용하지 않습니다.
> 타입 주석은 항상 타입이 지정되는 것 _뒤에_ 옵니다.

하지만 대부분의 경우, 이것은 필요하지 않습니다.
가능한 곳에서는, TypeScript가 코드의 타입을 자동으로 _추론_하려고 시도합니다.
예를 들어, 변수의 타입은 초기화자의 타입을 기반으로 추론됩니다:

```ts twoslash
// 타입 주석이 필요하지 않습니다 -- 'myName'은 'string' 타입으로 추론됩니다
let myName = "Alice";
```

대부분의 경우 추론 규칙을 명시적으로 배울 필요가 없습니다.
시작하는 경우, 생각하는 것보다 더 적은 타입 주석을 사용해보세요 - TypeScript가 무슨 일이 일어나고 있는지 완전히 이해하는 데 얼마나 적게 필요한지 놀랄 수도 있습니다.

## 함수

함수는 JavaScript에서 데이터를 전달하는 주요 수단입니다.
TypeScript를 사용하면 함수의 입력 값과 출력 값 모두의 타입을 지정할 수 있습니다.

### 매개변수 타입 주석

함수를 선언할 때, 각 매개변수 뒤에 타입 주석을 추가하여 함수가 받아들이는 매개변수의 타입을 선언할 수 있습니다.
매개변수 타입 주석은 매개변수 이름 뒤에 옵니다:

```ts twoslash
// 매개변수 타입 주석
function greet(name: string) {
  //                 ^^^^^^^^ name은 string 타입입니다
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

매개변수에 타입 주석이 있을 때, 해당 함수에 대한 인수들이 검사됩니다:

```ts twoslash
// @errors: 2345
declare function greet(name: string): void;
// ---cut---
// 실행되면 런타임 오류가 될 것입니다!
greet(42); // 오류: string 타입을 기대했지만 number를 받았습니다
```

> 매개변수에 타입 주석이 없더라도, TypeScript는 여전히 올바른 수의 인수를 전달했는지 확인합니다.

### 반환 타입 주석

반환 타입 주석도 추가할 수 있습니다.
반환 타입 주석은 매개변수 목록 뒤에 나타납니다:

```ts twoslash
function getFavoriteNumber(): number {
  //                        ^^^^^^^^ 반환 타입은 number입니다
  return 26;
}
```

변수 타입 주석과 마찬가지로, TypeScript가 `return` 문을 기반으로 함수의 반환 타입을 추론하기 때문에 일반적으로 반환 타입 주석이 필요하지 않습니다.
위 예제의 타입 주석은 아무것도 변경하지 않습니다.
일부 코드베이스는 문서화 목적으로, 우발적인 변경을 방지하기 위해, 또는 단순히 개인적인 선호로 반환 타입을 명시적으로 지정합니다.

#### Promise를 반환하는 함수

Promise를 반환하는 함수의 반환 타입에 주석을 달고 싶다면, `Promise` 타입을 사용해야 합니다:

```ts twoslash
async function getFavoriteNumber(): Promise<number> {
  return 26; // Promise<number>를 반환합니다
}
```

### 익명 함수

익명 함수는 함수 선언과 약간 다릅니다.
함수가 TypeScript가 어떻게 호출될지 결정할 수 있는 위치에 나타날 때, 해당 함수의 매개변수는 자동으로 타입이 주어집니다.

다음은 예제입니다:

```ts twoslash
// @errors: 2551
const names = ["Alice", "Bob", "Eve"]; // 문자열 배열

// 함수에 대한 문맥적 타이핑 - 매개변수 s는 string 타입으로 추론됩니다
names.forEach(function (s) {
  console.log(s.toUpperCase()); // s는 string으로 추론되므로 toUpperCase() 사용 가능
});

// 문맥적 타이핑은 화살표 함수에도 적용됩니다
names.forEach((s) => {
  console.log(s.toUpperCase()); // s는 string으로 추론됩니다
});
```

매개변수 `s`에 타입 주석이 없었음에도 불구하고, TypeScript는 `forEach` 함수의 타입과 배열의 추론된 타입을 함께 사용하여 `s`가 가질 타입을 결정했습니다.

이 과정을 _문맥적 타이핑_이라고 합니다. 함수가 발생한 _문맥_이 어떤 타입을 가져야 하는지 알려주기 때문입니다.

추론 규칙과 마찬가지로, 이것이 어떻게 일어나는지 명시적으로 배울 필요는 없지만, 이것이 _일어난다는_ 것을 이해하면 타입 주석이 필요하지 않을 때를 알아차리는 데 도움이 될 수 있습니다.
나중에, 값이 발생하는 문맥이 그 타입에 어떻게 영향을 줄 수 있는지에 대한 더 많은 예제를 보게 될 것입니다.

## 객체 타입

원시 타입 외에, 마주치게 될 가장 일반적인 타입은 _객체 타입_입니다.
이는 속성을 가진 모든 JavaScript 값을 참조하며, 이는 거의 모든 것입니다!
객체 타입을 정의하려면, 단순히 그 속성들과 그들의 타입을 나열합니다.

예를 들어, 다음은 점과 같은 객체를 받는 함수입니다:

```ts twoslash
// 매개변수의 타입 주석은 객체 타입입니다
function printCoord(pt: { x: number; y: number }) {
  //                      ^^^^^^^^^^^^^^^^^^^^^^^^ x와 y 속성을 가진 객체 타입
  console.log("좌표의 x 값은 " + pt.x + "입니다");
  console.log("좌표의 y 값은 " + pt.y + "입니다");
}
printCoord({ x: 3, y: 7 }); // x: 3, y: 7인 객체 전달
```

여기서, 우리는 두 개의 속성 - `x`와 `y` - 을 가진 타입으로 매개변수에 주석을 달았으며, 둘 다 `number` 타입입니다.
속성을 구분하기 위해 `,` 또는 `;`를 사용할 수 있으며, 마지막 구분자는 어느 쪽이든 선택사항입니다.

각 속성의 타입 부분도 선택사항입니다.
타입을 지정하지 않으면, `any`로 가정됩니다.

### 선택적 속성

객체 타입은 일부 또는 모든 속성이 _선택적_임을 지정할 수도 있습니다.
이를 위해, 속성 이름 뒤에 `?`를 추가합니다:

```ts twoslash
function printName(obj: { first: string; last?: string }) {
  // last는 선택적 속성입니다
}
// 둘 다 OK
printName({ first: "Bob" }); // last 속성 없이 호출
printName({ first: "Alice", last: "Alisson" }); // last 속성과 함께 호출
```

JavaScript에서, 존재하지 않는 속성에 접근하면 런타임 오류가 아닌 `undefined` 값을 얻게 됩니다.
이 때문에, 선택적 속성에서 _읽을_ 때, 사용하기 전에 `undefined`를 확인해야 합니다.

```ts twoslash
// @errors: 18048
function printName(obj: { first: string; last?: string }) {
  // 오류 - 'obj.last'가 제공되지 않았다면 충돌할 수 있습니다!
  console.log(obj.last.toUpperCase());
  if (obj.last !== undefined) {
    // OK - undefined 체크 후 안전하게 사용
    console.log(obj.last.toUpperCase());
  }

  // 현대 JavaScript 구문을 사용한 안전한 대안:
  console.log(obj.last?.toUpperCase()); // 옵셔널 체이닝 사용
}
```

## 유니온 타입

TypeScript의 타입 시스템을 사용하면 다양한 연산자를 사용하여 기존 타입으로부터 새로운 타입을 구축할 수 있습니다.
이제 몇 가지 타입을 작성하는 방법을 알았으므로, 흥미로운 방식으로 그것들을 _결합_하기 시작할 때입니다.

### 유니온 타입 정의하기

타입을 결합하는 첫 번째 방법은 _유니온_ 타입입니다.
유니온 타입은 두 개 이상의 다른 타입으로부터 형성된 타입으로, 그 타입들 중 _어느 하나_가 될 수 있는 값을 나타냅니다.
우리는 이러한 각 타입을 유니온의 _멤버_라고 부릅니다.

문자열이나 숫자에서 작동할 수 있는 함수를 작성해봅시다:

```ts twoslash
// @errors: 2345
function printId(id: number | string) {
  console.log("Your ID is: " + id); // id는 number 또는 string입니다
}
// OK
printId(101); // number 전달
// OK
printId("202"); // string 전달
// Error
printId({ myID: 22342 }); // 오류: 객체는 허용되지 않습니다
```

> 유니온 멤버의 구분자는 첫 번째 요소 앞에 허용되므로, 다음과 같이 작성할 수도 있습니다:
> ```ts twoslash
> function printTextOrNumberOrBool(
>   textOrNumberOrBool:
>     | string    // 문자열 또는
>     | number    // 숫자 또는
>     | boolean   // 불리언
> ) {
>   console.log(textOrNumberOrBool);
> }
> ```

### 유니온 타입 작업하기

유니온 타입과 일치하는 값을 _제공하는_ 것은 쉽습니다 - 단순히 유니온의 멤버 중 하나와 일치하는 타입을 제공하면 됩니다.
유니온 타입의 값을 _가지고 있다면_, 어떻게 작업할까요?

TypeScript는 유니온의 _모든_ 멤버에 대해 유효한 경우에만 연산을 허용합니다.
예를 들어, `string | number` 유니온이 있다면, `string`에서만 사용 가능한 메서드를 사용할 수 없습니다:

```ts twoslash
// @errors: 2339
function printId(id: number | string) {
  console.log(id.toUpperCase()); // 오류: number에는 toUpperCase가 없습니다
}
```

해결책은 타입 주석 없이 JavaScript에서 하는 것과 같은 방식으로 코드로 유니온을 _좁히는_ 것입니다.
_좁히기_는 TypeScript가 코드의 구조를 기반으로 값에 대해 더 구체적인 타입을 추론할 수 있을 때 발생합니다.

예를 들어, TypeScript는 `string` 값만이 `typeof` 값 `"string"`을 가질 것이라는 것을 알고 있습니다:

```ts twoslash
function printId(id: number | string) {
  if (typeof id === "string") {
    // 이 분기에서, id는 'string' 타입입니다
    console.log(id.toUpperCase()); // 안전하게 string 메서드 사용
  } else {
    // 여기서, id는 'number' 타입입니다
    console.log(id); // number 값 출력
  }
}
```

또 다른 예는 `Array.isArray`와 같은 함수를 사용하는 것입니다:

```ts twoslash
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // 여기서: 'x'는 'string[]'입니다
    console.log("Hello, " + x.join(" and ")); // 배열 메서드 사용
  } else {
    // 여기서: 'x'는 'string'입니다
    console.log("Welcome lone traveler " + x); // 문자열로 처리
  }
}
```

`else` 분기에서는 특별한 작업을 할 필요가 없다는 점에 주목하세요 - `x`가 `string[]`이 아니었다면, `string`이었을 것입니다.

때때로 모든 멤버가 공통점을 가진 유니온을 가질 수 있습니다.
예를 들어, 배열과 문자열 모두 `slice` 메서드를 가지고 있습니다.
유니온의 모든 멤버가 공통으로 가진 속성이 있다면, 좁히기 없이 그 속성을 사용할 수 있습니다:

```ts twoslash
// 반환 타입은 number[] | string으로 추론됩니다
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3); // 둘 다 slice 메서드를 가지고 있습니다
}
```

> 타입들의 _유니온_이 그 타입들의 속성의 _교집합_을 가지는 것처럼 보이는 것이 혼란스러울 수 있습니다.
> 이것은 우연이 아닙니다 - _유니온_이라는 이름은 타입 이론에서 나왔습니다.
> _유니온_ `number | string`은 각 타입의 _값들의 유니온_을 취함으로써 구성됩니다.
> 각 집합에 대한 해당 사실을 가진 두 집합이 주어졌을 때, 그 사실들의 _교집합_만이 집합들 자체의 _유니온_에 적용된다는 점에 주목하세요.
> 예를 들어, 모자를 쓴 키 큰 사람들의 방과 모자를 쓴 스페인어 사용자들의 방이 있다면, 그 방들을 결합한 후, _모든_ 사람에 대해 알 수 있는 유일한 것은 그들이 모자를 쓰고 있다는 것입니다.

## 타입 별칭

우리는 타입 주석에 직접 작성하여 객체 타입과 유니온 타입을 사용해왔습니다.
이것은 편리하지만, 같은 타입을 한 번 이상 사용하고 단일 이름으로 참조하고 싶은 것이 일반적입니다.

_타입 별칭_은 정확히 그것입니다 - 모든 _타입_에 대한 _이름_입니다.
타입 별칭의 구문은 다음과 같습니다:

```ts twoslash
type Point = {
  x: number; // x 좌표
  y: number; // y 좌표
};

// 이전 예제와 정확히 동일합니다
function printCoord(pt: Point) {
  console.log("좌표의 x 값은 " + pt.x + "입니다");
  console.log("좌표의 y 값은 " + pt.y + "입니다");
}

printCoord({ x: 100, y: 100 }); // Point 타입 객체 전달
```