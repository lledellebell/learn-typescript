# 좁히기 (Narrowing)

`padLeft`라는 함수가 있다고 상상해봅시다.

```ts twoslash
function padLeft(padding: number | string, input: string): string {
  throw new Error("아직 구현되지 않았습니다!"); // Not implemented yet!
}
```

`padding`이 `number`라면, 이것을 `input`에 앞에 붙이고 싶은 공백의 개수로 취급할 것입니다.
`padding`이 `string`이라면, 단순히 `padding`을 `input`에 앞에 붙여야 합니다.
`padLeft`에 `padding`으로 `number`가 전달될 때의 로직을 구현해봅시다.

```ts twoslash
// @errors: 2345
function padLeft(padding: number | string, input: string): string {
  return " ".repeat(padding) + input; // 오류 발생!
}
```

어라, `padding`에서 오류가 발생하고 있습니다.
TypeScript는 `number`만 받는 `repeat` 함수에 `number | string` 타입의 값을 전달하고 있다고 경고하고 있으며, 이는 맞습니다.
다시 말해, 우리는 `padding`이 `number`인지 명시적으로 먼저 확인하지도 않았고, `string`인 경우를 처리하지도 않았으므로, 정확히 그렇게 해봅시다.

```ts twoslash
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input; // padding은 number로 좁혀짐
  }
  return padding + input; // padding은 string으로 좁혀짐
}
```

이것이 대부분 흥미롭지 않은 JavaScript 코드처럼 보인다면, 그것이 바로 핵심입니다.
우리가 배치한 주석을 제외하고, 이 TypeScript 코드는 JavaScript처럼 보입니다.
아이디어는 TypeScript의 타입 시스템이 타입 안전성을 얻기 위해 억지로 구부리지 않고도 일반적인 JavaScript 코드를 가능한 한 쉽게 작성할 수 있도록 하는 것입니다.

별로 대단해 보이지 않을 수 있지만, 실제로는 내부적으로 많은 일이 일어나고 있습니다.
TypeScript가 정적 타입을 사용하여 런타임 값을 분석하는 것처럼, JavaScript의 런타임 제어 흐름 구조인 `if/else`, 조건부 삼항 연산자, 루프, 참/거짓 검사 등에 타입 분석을 오버레이하며, 이 모든 것이 해당 타입에 영향을 줄 수 있습니다.

우리의 `if` 검사 내에서, TypeScript는 `typeof padding === "number"`를 보고 이를 _타입 가드_라고 불리는 특별한 형태의 코드로 이해합니다.
TypeScript는 프로그램이 취할 수 있는 가능한 실행 경로를 따라가며 주어진 위치에서 값의 가장 구체적인 가능한 타입을 분석합니다.
이러한 특별한 검사들(_타입 가드_라고 불림)과 할당을 살펴보고, 선언된 것보다 더 구체적인 타입으로 타입을 정제하는 과정을 _좁히기_라고 합니다.
많은 편집기에서 이러한 타입들이 변화하는 것을 관찰할 수 있으며, 우리는 예제에서도 그렇게 할 것입니다.

```ts twoslash
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
    //                ^? // padding: number
  }
  return padding + input;
  //     ^? // padding: string
}
```

TypeScript가 좁히기를 위해 이해하는 몇 가지 다른 구조들이 있습니다.

## `typeof` 타입 가드

우리가 본 것처럼, JavaScript는 런타임에 우리가 가진 값의 타입에 대한 매우 기본적인 정보를 제공할 수 있는 `typeof` 연산자를 지원합니다.
TypeScript는 이것이 특정 문자열 집합을 반환할 것으로 예상합니다:

- `"string"`
- `"number"`
- `"bigint"`
- `"boolean"`
- `"symbol"`
- `"undefined"`
- `"object"`
- `"function"`

`padLeft`에서 본 것처럼, 이 연산자는 많은 JavaScript 라이브러리에서 꽤 자주 나타나며, TypeScript는 이를 이해하여 다른 분기에서 타입을 좁힐 수 있습니다.

TypeScript에서, `typeof`가 반환하는 값에 대한 검사는 타입 가드입니다.
TypeScript는 `typeof`가 다른 값들에서 어떻게 작동하는지 인코딩하기 때문에, JavaScript에서의 몇 가지 특이한 점들을 알고 있습니다.
예를 들어, 위의 목록에서 `typeof`는 문자열 `null`을 반환하지 않는다는 점에 주목하세요.
다음 예제를 확인해보세요:

```ts twoslash
// @errors: 2531 18047
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) { // 오류: strs는 여전히 null일 수 있습니다
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs); // strs는 string으로 좁혀짐
  } else {
    // 아무것도 하지 않음
  }
}
```

`printAll` 함수에서, 우리는 `strs`가 객체인지 확인하여 배열 타입인지 보려고 합니다 (배열이 JavaScript에서 객체 타입이라는 것을 다시 한 번 강조할 좋은 시점입니다).
하지만 JavaScript에서 `typeof null`은 실제로 `"object"`입니다!
이것은 역사상 불행한 사고 중 하나입니다.

충분한 경험을 가진 사용자들은 놀라지 않을 수 있지만, 모든 사람이 JavaScript에서 이것을 접해본 것은 아닙니다; 다행히도, TypeScript는 `strs`가 단순히 `string[]`이 아닌 `string[] | null`로만 좁혀졌다는 것을 알려줍니다.

이것은 우리가 "참/거짓" 검사라고 부를 것에 대한 좋은 도입부가 될 수 있습니다.

## 참/거짓 좁히기

참/거짓(Truthiness)은 사전에서 찾을 수 없는 단어일 수 있지만, JavaScript에서 듣게 될 것입니다.

JavaScript에서, 우리는 조건문, `&&`, `||`, `if` 문, 불리언 부정(`!`) 등에서 모든 표현식을 사용할 수 있습니다.
예를 들어, `if` 문은 조건이 항상 `boolean` 타입을 가질 것으로 기대하지 않습니다.

```ts twoslash
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) { // number가 조건으로 사용됨
    return `현재 ${numUsersOnline}명이 온라인입니다!`; // There are ${numUsersOnline} online now!
  }
  return "아무도 없습니다. :("; // Nobody's here. :(
}
```

JavaScript에서, `if`와 같은 구조는 먼저 조건을 `boolean`으로 "강제 변환"하여 이해한 다음, 결과가 `true`인지 `false`인지에 따라 분기를 선택합니다.
다음과 같은 값들은

- `0`
- `NaN`
- `""` (빈 문자열)
- `0n` (0의 `bigint` 버전)
- `null`
- `undefined`

모두 `false`로 강제 변환되고, 다른 값들은 `true`로 강제 변환됩니다.
`Boolean` 함수를 통해 실행하거나 더 짧은 이중 불리언 부정을 사용하여 항상 값을 `boolean`으로 강제 변환할 수 있습니다. (후자는 TypeScript가 좁은 리터럴 불리언 타입 `true`를 추론하는 반면, 첫 번째는 `boolean` 타입으로 추론한다는 장점이 있습니다.)

```ts twoslash
// 둘 다 'true'를 결과로 합니다
Boolean("hello"); // 타입: boolean, 값: true
!!"world"; // 타입: true, 값: true
```

특히 `null`이나 `undefined`와 같은 값들을 방어하기 위해 이 동작을 활용하는 것은 꽤 인기가 있습니다.
예를 들어, 우리의 `printAll` 함수에 이를 사용해봅시다.

```ts twoslash
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) { // strs는 string[]로 좁혀짐 (null 제외됨)
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs); // strs는 string으로 좁혀짐
  } else {
    // strs는 null로 좁혀짐
  }
}
```

위에서 `strs`가 참인지 확인함으로써 오류를 제거했다는 것을 알 수 있습니다.
이는 적어도 코드를 실행할 때 다음과 같은 끔찍한 오류를 방지합니다:

```txt
TypeError: null is not iterable
```

하지만 원시 타입에 대한 참/거짓 검사는 종종 오류가 발생하기 쉽다는 점을 염두에 두세요.
예를 들어, `printAll`을 작성하는 다른 시도를 고려해보세요:

```ts twoslash {class: "do-not-do-this"}
function printAll(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!!!
  //  이렇게 하지 마세요!
  //   계속 읽어보세요
  // !!!!!!!!!!!!!!!!
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}
```

우리는 함수의 전체 본문을 참/거짓 검사로 감쌌지만, 이것은 미묘한 단점이 있습니다: 빈 문자열 경우를 더 이상 올바르게 처리하지 못할 수 있습니다.

TypeScript는 여기서 전혀 우리를 방해하지 않지만, JavaScript에 덜 익숙하다면 이 동작은 주목할 가치가 있습니다.
TypeScript는 종종 초기에 버그를 잡는 데 도움을 줄 수 있지만, 값에 대해 _아무것도_ 하지 않기로 선택한다면, 지나치게 규범적이지 않고서는 할 수 있는 일이 한정적입니다.
원한다면, 린터로 이런 상황들을 처리하도록 할 수 있습니다.

참/거짓에 의한 좁히기에 대한 마지막 말은 `!`를 사용한 불리언 부정이 부정된 분기에서 필터링한다는 것입니다.

```ts twoslash
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values; // values는 undefined로 좁혀짐
  } else {
    return values.map((x) => x * factor); // values는 number[]로 좁혀짐
  }
}
```

## 동등성 좁히기

TypeScript는 또한 `switch` 문과 `===`, `!==`, `==`, `!=`와 같은 동등성 검사를 사용하여 타입을 좁힙니다.
예를 들어:

```ts twoslash
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // 이제 'x' 또는 'y'에서 모든 'string' 메서드를 호출할 수 있습니다.
    x.toUpperCase(); // x는 string으로 좁혀짐
    // ^?
    y.toLowerCase(); // y는 string으로 좁혀짐
    // ^?
  } else {
    console.log(x); // x는 string | number
    //          ^?
    console.log(y); // y는 string | boolean
    //          ^?
  }
}
```

위 예제에서 `x`와 `y`가 모두 같다고 확인했을 때, TypeScript는 그들의 타입도 같아야 한다는 것을 알았습니다.
`string`이 `x`와 `y` 모두가 취할 수 있는 유일한 공통 타입이므로, TypeScript는 첫 번째 분기에서 `x`와 `y`가 `string`이어야 한다는 것을 알고 있습니다.

(변수가 아닌) 특정 리터럴 값에 대한 검사도 작동합니다.
참/거짓 좁히기에 대한 섹션에서, 우리는 빈 문자열을 제대로 처리하지 않아서 오류가 발생하기 쉬웠던 `printAll` 함수를 작성했습니다.
대신 `null`을 차단하는 특정 검사를 할 수 있었고, TypeScript는 여전히 `strs`의 타입에서 `null`을 올바르게 제거합니다.

```ts twoslash
function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const s of strs) { // strs는 string[]로 좁혀짐
        //            ^?
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs); // strs는 string으로 좁혀짐
      //          ^?
    }
  }
}
```

JavaScript의 `==`와 `!=`를 사용한 느슨한 동등성 검사도 올바르게 좁혀집니다.
익숙하지 않다면, `== null`로 무언가를 확인하는 것은 실제로 구체적으로 `null` 값인지 확인하는 것뿐만 아니라 - 잠재적으로 `undefined`인지도 확인합니다.
`== undefined`에도 동일하게 적용됩니다: 값이 `null` 또는 `undefined`인지 확인합니다.

```ts twoslash
interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  // 타입에서 'null'과 'undefined' 모두 제거합니다.
  if (container.value != null) {
    console.log(container.value); // container.value는 number로 좁혀짐
    //                    ^?

    // 이제 'container.value'를 안전하게 곱할 수 있습니다.
    container.value *= factor;
  }
}
```

## `in` 연산자 좁히기

JavaScript에는 객체 또는 그 프로토타입 체인에 이름을 가진 속성이 있는지 확인하는 연산자가 있습니다: `in` 연산자입니다.
TypeScript는 이를 잠재적 타입을 좁히는 방법으로 고려합니다.

예를 들어, `"value" in x` 코드에서 `"value"`는 문자열 리터럴이고 `x`는 유니온 타입입니다.
"true" 분기는 선택적 또는 필수 속성 `value`를 가진 `x`의 타입들로 좁히고, "false" 분기는 선택적 또는 누락된 속성 `value`를 가진 타입들로 좁힙니다.

```ts twoslash
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim(); // animal은 Fish로 좁혀짐
  }

  return animal.fly(); // animal은 Bird로 좁혀짐
}
```

다시 말하지만, 선택적 속성은 좁히기를 위해 양쪽에 존재할 것입니다. 예를 들어, 인간은 (적절한 장비로) 수영과 비행을 모두 할 수 있으므로 `in` 검사의 양쪽에 나타나야 합니다:

```ts twoslash
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal; // animal은 Fish | Human으로 좁혀짐
//  ^?
  } else {
    animal; // animal은 Bird | Human으로 좁혀짐
//  ^?
  }
}
```

## `instanceof` 좁히기

JavaScript에는 값이 다른 값의 "인스턴스"인지 확인하는 연산자가 있습니다.
더 구체적으로, JavaScript에서 `x instanceof Foo`는 `x`의 _프로토타입 체인_이 `Foo.prototype`을 포함하는지 확인합니다.
여기서 깊이 들어가지는 않겠지만, 클래스에 들어갈 때 더 많이 보게 될 것이며, `new`로 구성할 수 있는 대부분의 값에 여전히 유용할 수 있습니다.
짐작하셨겠지만, `instanceof`도 타입 가드이며, TypeScript는 `instanceof`로 보호되는 분기에서 좁힙니다.

```ts twoslash
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString()); // x는 Date로 좁혀짐
    //          ^?
  } else {
    console.log(x.toUpperCase()); // x는 string으로 좁혀짐
    //          ^?
  }
}
```

## 할당

앞서 언급했듯이, 변수에 할당할 때, TypeScript는 할당의 오른쪽을 보고 왼쪽을 적절히 좁힙니다.

```ts twoslash
let x = Math.random() < 0.5 ? 10 : "hello world!";
//  ^? // x는 string | number
x = 1;

console.log(x); // x는 number로 좁혀짐
//          ^?
x = "goodbye!";

console.log(x); // x는 string으로 좁혀짐
//          ^?
```

이러한 할당들 각각이 유효하다는 점에 주목하세요.
첫 번째 할당 후 `x`의 관찰된 타입이 `number`로 변경되었음에도 불구하고, 여전히 `string`을 `x`에 할당할 수 있었습니다.
이는 `x`의 _선언된 타입_ - `x`가 시작한 타입 -이 `string | number`이고, 할당 가능성은 항상 선언된 타입에 대해 확인되기 때문입니다.

`boolean`을 `x`에 할당했다면, 그것이 선언된 타입의 일부가 아니었기 때문에 오류를 보았을 것입니다.

```ts twoslash
// @errors: 2322
let x = Math.random() < 0.5 ? 10 : "hello world!";
//  ^? // x는 string | number
x = 1;

console.log(x); // x는 number로 좁혀짐
//          ^?
x = true; // 오류: boolean은 string | number에 할당할 수 없습니다

console.log(x);
//          ^?
```

## 제어 흐름 분석

이 시점까지, 우리는 TypeScript가 특정 분기 내에서 어떻게 좁히는지에 대한 몇 가지 기본 예제를 살펴봤습니다.
하지만 모든 변수에서 올라가서 `if`, `while`, 조건문 등에서 타입 가드를 찾는 것보다 더 많은 일이 일어나고 있습니다.
예를 들어:

```ts twoslash
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
```

`padLeft`는 첫 번째 `if` 블록 내에서 반환합니다.
TypeScript는 이 코드를 분석하고 `padding`이 `number`인 경우 나머지 본문(`return padding + input;`)이 _도달할 수 없다_는 것을 볼 수 있었습니다.
결과적으로, 함수의 나머지 부분에 대해 `padding`의 타입에서 `number`를 제거할 수 있었습니다(`string | number`에서 `string`으로 좁히기).

도달 가능성을 기반으로 한 이러한 코드 분석을 _제어 흐름 분석_이라고 하며, TypeScript는 타입 가드와 할당을 만날 때 이 흐름 분석을 사용하여 타입을 좁힙니다.
변수가 분석될 때, 제어 흐름은 계속해서 분할되고 다시 병합될 수 있으며, 그 변수는 각 지점에서 다른 타입을 가지는 것으로 관찰될 수 있습니다.

```ts twoslash
function example() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;

  console.log(x); // x는 boolean으로 좁혀짐
  //          ^?

  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x); // x는 string으로 좁혀짐
    //          ^?
  } else {
    x = 100;
    console.log(x); // x는 number로 좁혀짐
    //          ^?
  }

  return x; // x는 string | number로 좁혀짐
  //     ^?
}
```

## 타입 서술어 사용하기

지금까지 기존 JavaScript 구조를 사용하여 좁히기를 처리했지만, 때로는 코드 전체에서 타입이 어떻게 변화하는지에 대해 더 직접적인 제어를 원할 수 있습니다.

사용자 정의 타입 가드를 정의하려면, 반환 타입이 _타입 서술어_인 함수를 정의하기만 하면 됩니다:

```ts twoslash
type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;
// ---cut---
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

`pet is Fish`가 이 예제에서 우리의 타입 서술어입니다.
서술어는 `parameterName is Type` 형태를 취하며, 여기서 `parameterName`은 현재 함수 시그니처의 매개변수 이름이어야 합니다.

`isFish`가 어떤 변수와 함께 호출될 때마다, TypeScript는 원래 타입이 호환된다면 그 변수를 그 특정 타입으로 _좁힐_ 것입니다.

```ts twoslash
type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
// ---cut---
// 'swim'과 'fly' 호출이 모두 이제 괜찮습니다.
let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim(); // pet은 Fish로 좁혀짐
} else {
  pet.fly(); // pet은 Bird로 좁혀짐
}
```

TypeScript는 `pet`이 `Fish`라는 것을 알 뿐만 아니라 `else` 분기에서 `Fish`가 _아니므로_ `Bird`를 가져야 한다는 것도 알고 있습니다.

타입 가드 `isFish`를 사용하여 `Fish | Bird` 배열을 필터링하고 `Fish` 배열을 얻을 수 있습니다:

```ts twoslash
type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
// ---cut---
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// 또는, 동등하게
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// 더 복잡한 예제에서는 서술어가 반복될 수 있습니다
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
```

## `typeof` 타입 가드

우리가 본 것처럼, JavaScript는 런타임에 우리가 가진 값의 타입에 대한 매우 기본적인 정보를 제공할 수 있는 `typeof` 연산자를 지원합니다.
TypeScript는 이것이 특정 문자열 집합을 반환할 것으로 예상합니다:

- `"string"`
- `"number"`
- `"bigint"`
- `"boolean"`
- `"symbol"`
- `"undefined"`
- `"object"`
- `"function"`

`padLeft`에서 본 것처럼, 이 연산자는 많은 JavaScript 라이브러리에서 꽤 자주 나타나며, TypeScript는 이를 이해하여 다른 분기에서 타입을 좁힐 수 있습니다.

TypeScript에서, `typeof`가 반환하는 값에 대한 검사는 타입 가드입니다.
TypeScript는 `typeof`가 다른 값들에서 어떻게 작동하는지 인코딩하기 때문에, JavaScript에서의 몇 가지 특이한 점들을 알고 있습니다.
예를 들어, 위의 목록에서 `typeof`는 문자열 `null`을 반환하지 않는다는 점에 주목하세요.
다음 예제를 확인해보세요:

```ts twoslash
// 둘 다 'true'를 결과로 합니다
Boolean("hello"); // 타입: boolean, 값: true
!!"world"; // 타입: true, 값: true
```

특히 `null`이나 `undefined`와 같은 값들을 방어하기 위해 이 동작을 활용하는 것은 꽤 인기가 있습니다.
예를 들어, 우리의 `printAll` 함수에 이를 사용해봅시다.

```ts twoslash
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) { // strs는 string[]로 좁혀짐 (null 제외됨)
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs); // strs는 string으로 좁혀짐
  } else {
    // strs는 null로 좁혀짐
  }
}
```

## `instanceof` 타입 가드

JavaScript의 `instanceof` 연산자는 `typeof`와 비슷하지만, 생성자 함수를 사용하여 값을 확인합니다.
TypeScript는 `instanceof`를 사용하여 타입을 좁히는 것을 이해합니다.

```ts twoslash
function logValue(x: Date | string) {
  if (x instanceof Date) { // x는 Date로 좁혀짐
    console.log(x.toISOString());
  } else { // x는 string으로 좁혀짐
    console.log(x.toUpperCase());
  }
}
```

`instanceof`는 `typeof`와 마찬가지로, 런타임에 동작하는 연산자이기 때문에, TypeScript는 런타임에 `instanceof`가 어떻게 동작하는지에 대한 정보를 사용하여 타입을 좁힐 수 있습니다.

## 할당 Narrowing

할당은 또한 타입을 좁히는 데 사용할 수 있습니다.
할당의 오른쪽에 있는 표현식의 타입은 왼쪽에 있는 변수의 타입에 할당할 수 있어야 합니다.
할당이 성공하면, TypeScript는 할당의 오른쪽에 있는 표현식의 타입을 사용하여 변수의 타입을 좁힐 수 있습니다.

```ts twoslash
let x = Math.random() < 0.5 ? 10 : "hello";
x = "goodbye"; // x는 string으로 좁혀짐
console.log(x); // string
x = 42; // 오류
```

할당 Narrowing은 할당의 오른쪽에 있는 표현식의 타입을 사용하여 변수의 타입을 좁히는 것을 의미합니다.
할당 Narrowing은 변수의 타입을 좁히는 데 사용할 수 있습니다.

## 논리 연산자 Narrowing

논리 연산자(`&&`, `||`, `!`)는 또한 타입을 좁히는 데 사용할 수 있습니다.
논리 연산자는 런타임에 동작하는 연산자이기 때문에, TypeScript는 런타임에 논리 연산자가 어떻게 동작하는지에 대한 정보를 사용하여 타입을 좁힐 수 있습니다.

```ts twoslash
function example() {
  let x: string | number | null = null;
  if (x !== null && typeof x === "string") { // x는 string으로 좁혀짐
    console.log(x.toUpperCase());
  }
}
```

논리 연산자 Narrowing은 논리 연산자의 결과를 사용하여 변수의 타입을 좁히는 것을 의미합니다.
논리 연산자 Narrowing은 변수의 타입을 좁히는 데 사용할 수 있습니다.

## 타입 가드

타입 가드는 변수의 타입을 좁히는 데 사용할 수 있는 함수입니다.
타입 가드는 런타임에 동작하는 함수이기 때문에, TypeScript는 런타임에 타입 가드가 어떻게 동작하는지에 대한 정보를 사용하여 타입을 좁힐 수 있습니다.

```ts twoslash
function isString<T>(value: T): value is string {
  return typeof value === "string";
}

function example() {
  let x: string | number;
  if (isString(x)) { // x는 string으로 좁혀짐
    console.log(x.toUpperCase());
  }
}
```

타입 가드는 변수의 타입을 좁히는 데 사용할 수 있는 함수입니다.
타입 가드는 런타임에 동작하는 함수이기 때문에, TypeScript는 런타임에 타입 가드가 어떻게 동작하는지에 대한 정보를 사용하여 타입을 좁힐 수 있습니다.

## 결론

TypeScript는 다양한 방법을 제공하여 변수의 타입을 좁힐 수 있습니다.
할당 Narrowing, 논리 연산자 Narrowing, 타입 가드 등은 변수의 타입을 좁히는 데 사용할 수 있는 방법입니다.
TypeScript는 런타임에 동작하는 연산자와 함수를 사용하여 변수의 타입을 좁힐 수 있습니다.
변수의 타입을 좁히는 것은 TypeScript의 타입 시스템을 사용하여 코드의 안정성을 높이는 데 중요합니다.