---
title: 기초
layout: docs
permalink: /docs/handbook/2/basic-types.html
oneline: "TypeScript 학습의 첫 단계: 기본 타입들."
preamble: >
  <p>핸드북의 첫 번째 페이지에 오신 것을 환영합니다. TypeScript를 처음 접하신다면 '<a href='https://www.typescriptlang.org/docs/handbook/intro.html#get-started'>시작하기</a>' 가이드 중 하나부터 시작하시는 것을 권장합니다.</a>
---

JavaScript의 모든 값은 다양한 연산을 실행했을 때 관찰할 수 있는 일련의 동작들을 가지고 있습니다.
이는 추상적으로 들릴 수 있지만, 간단한 예시로 `message`라는 변수에 대해 실행할 수 있는 몇 가지 연산을 살펴보겠습니다.

```js
// 'message'의 'toLowerCase' 속성에 접근하고
// 이를 호출하는 예시
message.toLowerCase();

// 'message'를 직접 호출하는 예시
message();
```

이를 분석해보면, 첫 번째 실행 가능한 코드 라인은 `toLowerCase`라는 속성에 접근한 다음 이를 호출합니다.
두 번째 라인은 `message`를 직접 호출하려고 시도합니다.

하지만 `message`의 값을 모른다고 가정하면 - 이는 매우 일반적인 상황입니다 - 이 코드를 실행했을 때 어떤 결과를 얻을지 확실하게 말할 수 없습니다.
각 연산의 동작은 처음에 어떤 값을 가지고 있었는지에 전적으로 의존합니다.

- `message`는 호출 가능한가요?
- `toLowerCase`라는 속성을 가지고 있나요?
- 만약 가지고 있다면, `toLowerCase`는 호출 가능한가요?
- 이 두 값이 모두 호출 가능하다면, 무엇을 반환하나요?

이러한 질문들에 대한 답은 보통 JavaScript를 작성할 때 우리가 머릿속에 기억해두는 것들이며, 모든 세부사항을 올바르게 기억하기를 희망해야 합니다.

`message`가 다음과 같이 정의되었다고 가정해봅시다.

```js
const message = "Hello World!"; // message는 문자열 "Hello World!"입니다
```

아마 짐작하시겠지만, `message.toLowerCase()`를 실행하면 동일한 문자열을 소문자로만 변환한 결과를 얻을 것입니다.

그렇다면 두 번째 코드 라인은 어떨까요?
JavaScript에 익숙하시다면, 이것이 예외와 함께 실패한다는 것을 아실 것입니다:

```txt
TypeError: message is not a function
```

이런 실수를 피할 수 있다면 좋을 것입니다.

코드를 실행할 때, JavaScript 런타임이 무엇을 할지 선택하는 방법은 값의 _타입_ - 즉 어떤 종류의 동작과 기능을 가지고 있는지 - 을 파악하는 것입니다.
이것이 바로 `TypeError`가 암시하는 부분입니다 - 문자열 `"Hello World!"`는 함수로 호출될 수 없다고 말하고 있습니다.

`string`과 `number`와 같은 일부 원시 값들의 경우, `typeof` 연산자를 사용하여 런타임에 그들의 타입을 식별할 수 있습니다.
하지만 함수와 같은 다른 것들의 경우, 그들의 타입을 식별할 수 있는 해당하는 런타임 메커니즘이 없습니다.
예를 들어, 다음 함수를 고려해보세요:

```js
function fn(x) {
  return x.flip(); // x 객체의 flip 메서드를 호출합니다
}
```

코드를 읽어보면 이 함수가 호출 가능한 `flip` 속성을 가진 객체가 주어졌을 때만 작동한다는 것을 _관찰할_ 수 있지만, JavaScript는 코드가 실행되는 동안 확인할 수 있는 방식으로 이 정보를 표면화하지 않습니다.
순수 JavaScript에서 `fn`이 특정 값으로 무엇을 하는지 알 수 있는 유일한 방법은 이를 호출하고 무슨 일이 일어나는지 보는 것입니다.
이런 종류의 동작은 코드가 실행되기 전에 무엇을 할지 예측하기 어렵게 만들며, 이는 코드를 작성하는 동안 코드가 무엇을 할지 알기 더 어렵다는 것을 의미합니다.

이런 관점에서 보면, _타입_은 `fn`에 어떤 값들을 전달할 수 있고 어떤 값들이 충돌을 일으킬지를 설명하는 개념입니다.
JavaScript는 오직 _동적_ 타이핑만을 진정으로 제공합니다 - 코드를 실행해서 무슨 일이 일어나는지 보는 것입니다.

대안은 _정적_ 타입 시스템을 사용하여 코드가 실행되기 _전에_ 코드가 무엇을 할 것으로 예상되는지 예측하는 것입니다.

## 정적 타입 검사

앞서 `string`을 함수로 호출하려고 했을 때 얻었던 `TypeError`를 다시 생각해보세요.
_대부분의 사람들_은 코드를 실행할 때 어떤 종류의 오류도 받고 싶어하지 않습니다 - 그것들은 버그로 간주됩니다!
그리고 새로운 코드를 작성할 때, 우리는 새로운 버그를 도입하지 않기 위해 최선을 다합니다.

약간의 코드를 추가하고, 파일을 저장하고, 코드를 다시 실행하고, 즉시 오류를 본다면, 문제를 빠르게 격리할 수 있을지도 모릅니다; 하지만 항상 그런 것은 아닙니다.
기능을 충분히 철저하게 테스트하지 않았을 수도 있고, 그래서 발생할 수 있는 잠재적인 오류를 실제로 마주치지 않을 수도 있습니다!
또는 운이 좋아서 오류를 목격했다고 하더라도, 대규모 리팩토링을 하고 많은 다른 코드를 추가해서 파헤쳐야 할 상황에 처할 수도 있습니다.

이상적으로는, 코드가 실행되기 _전에_ 이러한 버그를 찾는 데 도움이 되는 도구가 있으면 좋을 것입니다.
그것이 바로 TypeScript와 같은 정적 타입 검사기가 하는 일입니다.
_정적 타입 시스템_은 프로그램을 실행할 때 우리의 값들이 가질 모양과 동작을 설명합니다.
TypeScript와 같은 타입 검사기는 이 정보를 사용하여 일이 잘못될 수 있을 때 우리에게 알려줍니다.

```ts twoslash
// @errors: 2349
const message = "hello!"; // message는 문자열입니다

message(); // 오류: 이 식은 호출할 수 없습니다
```

TypeScript로 마지막 샘플을 실행하면 코드를 처음 실행하기 전에 오류 메시지를 받게 됩니다.

## 예외가 아닌 실패

지금까지 우리는 런타임 오류와 같은 특정한 것들에 대해 논의해왔습니다 - JavaScript 런타임이 무언가가 말이 안 된다고 생각한다고 알려주는 경우들 말입니다.
이러한 경우들은 [ECMAScript 사양](https://tc39.github.io/ecma262/)이 예상치 못한 상황에 직면했을 때 언어가 어떻게 동작해야 하는지에 대한 명시적인 지침을 가지고 있기 때문에 발생합니다.

예를 들어, 사양은 호출할 수 없는 것을 호출하려고 시도하면 오류를 발생시켜야 한다고 명시합니다.
아마도 "당연한 동작"처럼 들릴 수 있지만, 객체에 존재하지 않는 속성에 접근하는 것도 오류를 발생시켜야 한다고 상상할 수 있습니다.
대신, JavaScript는 다른 동작을 제공하고 `undefined` 값을 반환합니다:

```js
const user = {
  name: "Daniel", // 이름: "Daniel"
  age: 26,        // 나이: 26
};

user.location; // undefined를 반환합니다
```

궁극적으로, 정적 타입 시스템은 "유효한" JavaScript이고 즉시 오류를 발생시키지 않더라도, 시스템에서 오류로 플래그를 지정해야 할 코드에 대해 판단을 내려야 합니다.
TypeScript에서 다음 코드는 `location`이 정의되지 않았다는 오류를 생성합니다:

```ts twoslash
// @errors: 2339
const user = {
  name: "Daniel", // 이름: "Daniel"
  age: 26,        // 나이: 26
};

user.location; // 오류: 'location' 속성이 존재하지 않습니다
```

때로는 이것이 표현할 수 있는 것에 대한 트레이드오프를 의미하지만, 의도는 우리 프로그램의 합법적인 버그를 잡는 것입니다.
그리고 TypeScript는 _많은_ 합법적인 버그를 잡습니다.

예를 들어: 오타,

```ts twoslash
// @noErrors
const announcement = "Hello World!"; // 공지사항

// 오타를 얼마나 빨리 발견할 수 있나요?
announcement.toLocaleLowercase(); // 오타: toLocaleLowercase
announcement.toLocalLowerCase();  // 오타: toLocalLowerCase

// 아마도 이렇게 쓰려고 했을 것입니다...
announcement.toLocaleLowerCase(); // 올바른 메서드명
```

호출되지 않은 함수,

```ts twoslash
// @noUnusedLocals
// @errors: 2365
function flipCoin() {
  // Math.random()을 의도했습니다
  return Math.random < 0.5; // 오류: 함수를 호출하지 않았습니다
}
```

또는 기본적인 논리 오류.

```ts twoslash
// @errors: 2367
const value = Math.random() < 0.5 ? "a" : "b"; // 랜덤하게 "a" 또는 "b"
if (value !== "a") {
  // ...
} else if (value === "b") {
  // 앗, 도달할 수 없는 코드입니다
}
```

## 도구를 위한 타입

TypeScript는 코드에서 실수를 할 때 버그를 잡을 수 있습니다.
그것도 훌륭하지만, TypeScript는 _또한_ 처음부터 그러한 실수를 하는 것을 방지할 수 있습니다.

타입 검사기는 변수와 다른 속성들에서 올바른 속성에 접근하고 있는지와 같은 것들을 확인할 정보를 가지고 있습니다.
이 정보를 가지고 있으면, 사용하고 싶어할 수 있는 속성들을 _제안_하기 시작할 수도 있습니다.

이는 TypeScript가 코드 편집에도 활용될 수 있다는 것을 의미하며, 핵심 타입 검사기는 편집기에서 타이핑할 때 오류 메시지와 코드 완성을 제공할 수 있습니다.
이것이 사람들이 TypeScript의 도구에 대해 이야기할 때 종종 언급하는 부분입니다.

<!-- prettier-ignore -->
```ts twoslash
// @noErrors
// @esModuleInterop
import express from "express"; // Express 프레임워크 가져오기
const app = express(); // Express 앱 생성

app.get("/", function (req, res) {
  res.sen // 자동완성이 send, sendFile 등을 제안합니다
//       ^|
});

app.listen(3000); // 포트 3000에서 서버 시작
```

TypeScript는 도구를 진지하게 받아들이며, 이는 타이핑할 때의 완성과 오류를 넘어섭니다.
TypeScript를 지원하는 편집기는 오류를 자동으로 수정하는 "빠른 수정", 코드를 쉽게 재구성하는 리팩토링, 변수의 정의로 점프하거나 주어진 변수에 대한 모든 참조를 찾는 유용한 탐색 기능을 제공할 수 있습니다.
이 모든 것은 타입 검사기 위에 구축되며 완전히 크로스 플랫폼이므로, [당신이 좋아하는 편집기에서 TypeScript 지원을 사용할 수 있을](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support) 가능성이 높습니다.

## `tsc`, TypeScript 컴파일러

우리는 타입 검사에 대해 이야기해왔지만, 아직 타입 _검사기_를 사용하지는 않았습니다.
우리의 새로운 친구 `tsc`, TypeScript 컴파일러와 친해져봅시다.
먼저 npm을 통해 이를 가져와야 합니다.

```sh
npm install -g typescript
```

> 이는 TypeScript 컴파일러 `tsc`를 전역으로 설치합니다.
> 대신 로컬 `node_modules` 패키지에서 `tsc`를 실행하고 싶다면 `npx`나 유사한 도구를 사용할 수 있습니다.

이제 빈 폴더로 이동해서 첫 번째 TypeScript 프로그램을 작성해봅시다: `hello.ts`:

```ts twoslash
// 세상에 인사합니다.
console.log("Hello world!");
```

여기에는 특별한 것이 없다는 것을 주목하세요; 이 "hello world" 프로그램은 JavaScript에서 "hello world" 프로그램을 위해 작성할 것과 동일하게 보입니다.
이제 `typescript` 패키지에 의해 설치된 `tsc` 명령을 실행하여 타입 검사를 해봅시다.

```sh
tsc hello.ts
```

짜잔!

잠깐, 정확히 "짜잔" _무엇_인가요?
우리는 `tsc`를 실행했는데 아무것도 일어나지 않았습니다!
음, 타입 오류가 없었으므로, 보고할 것이 없었기 때문에 콘솔에 어떤 출력도 받지 못했습니다.

하지만 다시 확인해보세요 - 대신 _파일_ 출력을 받았습니다.
현재 디렉토리를 보면, `hello.ts` 옆에 `hello.js` 파일을 볼 수 있을 것입니다.
이것이 `tsc`가 `.ts` 파일을 처리한 후 우리의 `hello.ts` 파일에서 나온 출력입니다. `tsc`가 이를 일반 JavaScript 파일로 _컴파일_하거나 _변환_합니다.
그리고 내용을 확인하면, TypeScript가 `.ts` 파일을 처리한 후 무엇을 뱉어내는지 볼 수 있습니다:

```js
// 세상에 인사합니다.
console.log("Hello world!");
```

이 경우, TypeScript가 변환할 것이 거의 없었으므로, 우리가 작성한 것과 동일하게 보입니다.
컴파일러는 사람이 작성할 것 같은 깨끗하고 읽기 쉬운 코드를 내보내려고 노력합니다.
항상 그렇게 쉬운 것은 아니지만, TypeScript는 일관되게 들여쓰기를 하고, 코드가 여러 줄에 걸쳐 있을 때를 염두에 두며, 주석을 유지하려고 노력합니다.

타입 검사 오류를 _도입했다면_ 어떨까요?
`hello.ts`를 다시 작성해봅시다:

```ts twoslash
// @noErrors
// 이것은 산업용 범용 인사 함수입니다:
function greet(person, date) {
  console.log(`안녕하세요 ${person}, 오늘은 ${date}입니다!`);
}

greet("Brendan"); // 인수가 하나 부족합니다
```

`tsc hello.ts`를 다시 실행하면, 명령줄에서 오류를 받는다는 것을 주목하세요!

```txt
Expected 2 arguments, but got 1.
```

TypeScript는 우리가 `greet` 함수에 인수를 전달하는 것을 잊었다고 알려주고 있으며, 당연히 그렇습니다.
지금까지 우리는 표준 JavaScript만 작성했지만, 타입 검사는 여전히 우리 코드의 문제를 찾을 수 있었습니다.
TypeScript 고마워요!

## 오류와 함께 내보내기

마지막 예제에서 눈치채지 못했을 수도 있는 한 가지는 우리의 `hello.js` 파일이 다시 변경되었다는 것입니다.
그 파일을 열어보면 내용이 여전히 기본적으로 우리의 입력 파일과 같아 보인다는 것을 알 수 있습니다.
`tsc`가 우리 코드에 대한 오류를 보고했다는 사실을 고려하면 이는 약간 놀라울 수 있지만, 이는 TypeScript의 핵심 가치 중 하나에 기반합니다: 대부분의 경우, _당신이_ TypeScript보다 더 잘 알 것입니다.

앞서 언급했듯이, 타입 검사 코드는 실행할 수 있는 프로그램의 종류를 제한하므로, 타입 검사기가 허용 가능하다고 판단하는 것의 종류에 대한 트레이드오프가 있습니다.
대부분의 경우 그것은 괜찮지만, 그러한 검사가 방해가 되는 시나리오들이 있습니다.
예를 들어, JavaScript 코드를 TypeScript로 마이그레이션하고 타입 검사 오류를 도입하는 자신을 상상해보세요.
결국 타입 검사기를 위해 정리하게 될 것이지만, 그 원래 JavaScript 코드는 이미 작동하고 있었습니다!
TypeScript로 변환하는 것이 왜 실행을 중단시켜야 할까요?

그래서 TypeScript는 당신의 방해가 되지 않습니다.
물론, 시간이 지나면서, 실수에 대해 좀 더 방어적이 되고 TypeScript가 좀 더 엄격하게 작동하게 만들고 싶을 수도 있습니다.
그런 경우, [`noEmitOnError`](/tsconfig#noEmitOnError) 컴파일러 옵션을 사용할 수 있습니다.
`hello.ts` 파일을 변경하고 그 플래그와 함께 `tsc`를 실행해보세요:

```sh
tsc --noEmitOnError hello.ts
```

`hello.js`가 업데이트되지 않는다는 것을 알 수 있을 것입니다.

## 명시적 타입

지금까지, 우리는 TypeScript에게 `person`이나 `date`가 무엇인지 알려주지 않았습니다.
코드를 편집해서 TypeScript에게 `person`은 `string`이고, `date`는 `Date` 객체여야 한다고 알려줍시다.
또한 `date`에서 `toDateString()` 메서드를 사용하겠습니다.

```ts twoslash
function greet(person: string, date: Date) {
  console.log(`안녕하세요 ${person}, 오늘은 ${date.toDateString()}입니다!`);
}
```

우리가 한 것은 `person`과 `date`에 _타입 주석_을 추가하여 `greet`가 어떤 타입의 값들과 함께 호출될 수 있는지 설명하는 것입니다.
그 시그니처를 "`greet`는 `string` 타입의 `person`과 `Date` 타입의 `date`를 받습니다"라고 읽을 수 있습니다.

이를 통해, TypeScript는 `greet`가 잘못 호출되었을 수 있는 다른 경우들에 대해 알려줄 수 있습니다.
예를 들어...

```ts twoslash
// @errors: 2345
function greet(person: string, date: Date) {
  console.log(`안녕하세요 ${person}, 오늘은 ${date.toDateString()}입니다!`);
}

greet("Maddison", Date()); // 오류: Date() 대신 new Date()를 사용해야 합니다
```

어? TypeScript가 우리의 두 번째 인수에 대해 오류를 보고했는데, 왜일까요?

아마도 놀랍게도, JavaScript에서 `Date()`를 호출하면 `string`을 반환합니다.
반면에, `new Date()`로 `Date`를 생성하면 실제로 우리가 기대했던 것을 제공합니다.

어쨌든, 오류를 빠르게 수정할 수 있습니다:

```ts twoslash {4}
function greet(person: string, date: Date) {
  console.log(`안녕하세요 ${person}, 오늘은 ${date.toDateString()}입니다!`);
}

greet("Maddison", new Date()); // 올바른 사용법
```

명심하세요, 우리가 항상 명시적 타입 주석을 작성해야 하는 것은 아닙니다.
많은 경우, TypeScript는 우리가 생략하더라도 타입을 _추론_(또는 "알아낼") 수 있습니다.

```ts twoslash
let msg = "hello there!"; // TypeScript가 string 타입으로 추론합니다
//  ^?
```

TypeScript에게 `msg`가 `string` 타입을 가진다고 말하지 않았음에도 불구하고 그것을 알아낼 수 있었습니다.
이것은 기능이며, 타입 시스템이 결국 같은 타입을 추론할 때는 주석을 추가하지 않는 것이 가장 좋습니다.

> 참고: 이전 코드 샘플의 메시지 버블은 해당 단어 위에 마우스를 올렸을 때 편집기가 보여줄 것입니다.

## 지워진 타입

위의 함수 `greet`를 `tsc`로 컴파일하여 JavaScript를 출력할 때 무슨 일이 일어나는지 살펴봅시다:

```ts twoslash
// @showEmit
// @target: es5
function greet(person: string, date: Date) {
  console.log(`안녕하세요 ${person}, 오늘은 ${date.toDateString()}입니다!`);
}

greet("Maddison", new Date());
```

여기서 두 가지를 주목하세요:

1. 우리의 `person`과 `date` 매개변수는 더 이상 타입 주석을 가지지 않습니다.
2. 우리의 "템플릿 문자열" - 백틱(`` ` ``) 문자를 사용한 문자열 - 이 연결과 함께 일반 문자열로 변환되었습니다.

두 번째 점에 대해서는 나중에 더 자세히 다루겠지만, 지금은 첫 번째 점에 집중해봅시다.
타입 주석은 JavaScript(또는 엄밀히 말하면 ECMAScript)의 일부가 아니므로, TypeScript를 수정 없이 실행할 수 있는 브라우저나 다른 런타임은 실제로 없습니다.
그래서 TypeScript는 처음부터 컴파일러가 필요합니다 - TypeScript 특정 코드를 제거하거나 변환하여 실행할 수 있도록 하는 방법이 필요합니다.
대부분의 TypeScript 특정 코드는 지워지며, 마찬가지로 여기서 우리의 타입 주석은 완전히 지워졌습니다.

> **기억하세요**: 타입 주석은 프로그램의 런타임 동작을 절대 변경하지 않습니다.

## 다운레벨링

위에서 다른 차이점 중 하나는 우리의 템플릿 문자열이 다음에서

```js
`안녕하세요 ${person}, 오늘은 ${date.toDateString()}입니다!`;
```

다음으로 다시 작성되었다는 것입니다

```js
"안녕하세요 ".concat(person, ", 오늘은 ").concat(date.toDateString(), "입니다!");
```

왜 이런 일이 일어났을까요?

템플릿 문자열은 ECMAScript 2015(일명 ECMAScript 6, ES2015, ES6 등 - _묻지 마세요_)라고 불리는 ECMAScript 버전의 기능입니다.
TypeScript는 새로운 버전의 ECMAScript에서 ECMAScript 3이나 ECMAScript 5(일명 ES5)와 같은 이전 버전으로 코드를 다시 작성할 수 있는 능력을 가지고 있습니다.
더 새롭거나 "높은" 버전의 ECMAScript에서 더 오래되거나 "낮은" 버전으로 이동하는 이 과정을 때때로 _다운레벨링_이라고 합니다.

기본적으로 TypeScript는 매우 오래된 ECMAScript 버전인 ES5를 대상으로 합니다.
[`target`](/tsconfig#target) 옵션을 사용하여 좀 더 최신의 것을 선택할 수 있었습니다.
`--target es2015`로 실행하면 TypeScript가 ECMAScript 2015를 대상으로 하도록 변경되어, ECMAScript 2015가 지원되는 곳이면 어디서든 코드가 실행될 수 있어야 한다는 의미입니다.
따라서 `tsc --target es2015 hello.ts`를 실행하면 다음과 같은 출력을 얻습니다:

```js
function greet(person, date) {
  console.log(`안녕하세요 ${person}, 오늘은 ${date.toDateString()}입니다!`);
}
greet("Maddison", new Date());
```

> 기본 대상이 ES5이지만, 현재 브라우저의 대다수는 ES2015를 지원합니다.
> 따라서 특정 고대 브라우저와의 호환성이 중요하지 않다면 대부분의 개발자는 ES2015 이상을 대상으로 안전하게 지정할 수 있습니다.

## 엄격성

다른 사용자들은 타입 검사기에서 다른 것들을 찾고 있습니다.
어떤 사람들은 프로그램의 일부만 검증하는 데 도움이 될 수 있는 더 느슨한 옵트인 경험을 찾고 있으며, 여전히 괜찮은 도구를 가지고 있습니다.
이것이 TypeScript의 기본 경험이며, 여기서 타입은 선택적이고, 추론은 가장 관대한 타입을 취하며, 잠재적으로 `null`/`undefined` 값에 대한 검사는 없습니다.
`tsc`가 오류에 직면해서도 내보내는 것처럼, 이러한 기본값들은 당신의 방해가 되지 않기 위해 설정되어 있습니다.
기존 JavaScript를 마이그레이션하고 있다면, 그것이 바람직한 첫 번째 단계일 수 있습니다.

대조적으로, 많은 사용자들은 TypeScript가 가능한 한 많이 바로 검증하는 것을 선호하며, 그래서 언어는 엄격성 설정도 제공합니다.
이러한 엄격성 설정은 정적 타입 검사를 스위치(코드가 검사되거나 되지 않거나)에서 다이얼에 더 가까운 것으로 바꿉니다.
이 다이얼을 더 높이 돌릴수록, TypeScript가 더 많이 검사해줄 것입니다.
이는 약간의 추가 작업이 필요할 수 있지만, 일반적으로 장기적으로 그 자체로 보상받으며, 더 철저한 검사와 더 정확한 도구를 가능하게 합니다.
가능하다면, 새로운 코드베이스는 항상 이러한 엄격성 검사를 켜야 합니다.

TypeScript는 켜거나 끌 수 있는 여러 타입 검사 엄격성 플래그를 가지고 있으며, 달리 명시되지 않는 한 우리의 모든 예제는 모든 것이 활성화된 상태로 작성될 것입니다.
CLI의 [`strict`](/tsconfig#strict) 플래그나 [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)의 `"strict": true`는 모든 것을 동시에 토글하지만, 개별적으로 옵트아웃할 수 있습니다.
알아야 할 가장 큰 두 가지는 [`noImplicitAny`](/tsconfig#noImplicitAny)와 [`strictNullChecks`](/tsconfig#strictNullChecks)입니다.

## `noImplicitAny`

일부 장소에서, TypeScript는 우리를 위해 타입을 추론하려고 시도하지 않고 대신 가장 관대한 타입인 `any`로 되돌아간다는 것을 기억하세요.
이것이 일어날 수 있는 최악의 일은 아닙니다 - 결국, `any`로 되돌아가는 것은 그냥 일반 JavaScript 경험입니다.

하지만, `any`를 사용하는 것은 종종 처음에 TypeScript를 사용하는 목적을 무너뜨립니다.
프로그램이 더 타입화될수록, 더 많은 검증과 도구를 얻게 되며, 이는 코딩하면서 더 적은 버그에 부딪힌다는 것을 의미합니다.
[`noImplicitAny`](/tsconfig#noImplicitAny) 플래그를 켜면 타입이 암시적으로 `any`로 추론되는 모든 변수에 대해 오류를 발생시킵니다.

## `strictNullChecks`

기본적으로, `null`과 `undefined`와 같은 값들은 다른 모든 타입에 할당 가능합니다.
이는 일부 코드 작성을 더 쉽게 만들 수 있지만, `null`과 `undefined`를 처리하는 것을 잊는 것은 세상의 수많은 버그의 원인입니다 - 일부는 이것을 [10억 달러짜리 실수](https://www.youtube.com/watch?v=ybrQvs4x0Ps)라고 생각합니다!
[`strictNullChecks`](/tsconfig#strictNullChecks) 플래그는 `null`과 `undefined` 처리를 더 명시적으로 만들고, `null`과 `undefined`를 처리하는 것을 _잊었는지_ 걱정하는 것에서 우리를 _구해줍니다_.