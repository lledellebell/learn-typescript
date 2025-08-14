# TypeScript 학습 가이드

## 목차

- [1. 들어가며](#1-들어가며)
- [1.1 웹 개발의 역사](#11-웹-개발의-역사)
  - [1.1.1 자바스크립트의 탄생](#111-자바스크립트의-탄생)
  - [1.1.2 자바스크립트 표준, ECMAScript의 탄생](#112-자바스크립트-표준-ecmascript의-탄생)
  - [1.1.3 웹사이트에서 웹어플리케이션으로의 전환](#113-웹사이트에서-웹어플리케이션으로의-전환)
  - [1.1.4 개발 생태계의 발전](#114-개발-생태계의-발전)
  - [1.1.5 개발 협업의 필요성 증가](#115-개발-협업의-필요성-증가)
- [1.2 웹자바스크립트의 한계](#12-웹자바스크립트의-한계)
  - [1.2.1 동적 타입 언어](#121-동적-타입-언어)
  - [1.2.2 동적 타이핑 시스템 한계](#122-동적-타이핑-시스템-한계)
  - [1.2.3 한계 극복을 위한 해결 방안](#123-한계-극복을-위한-해결-방안)
  - [1.2.4 타입스크립트의 등장](#124-타입스크립트의-등장)
- [1.3 타입스크립트 소개](#13-타입스크립트-소개)
  - [1.3.1 타입스크립트란?](#131-타입스크립트란)
  - [1.3.2 타입스크립트의 주요 특징](#132-타입스크립트의-주요-특징)
  - [1.3.3 타입스크립트 버전 역사](#133-타입스크립트-버전-역사)
- [1.4 타입스크립트 개발 환경 설정](#14-타입스크립트-개발-환경-설정)
  - [1.4.1 Node.js 및 npm 설치](#141-nodejs-및-npm-설치)
  - [1.4.2 TypeScript 설치](#142-typescript-설치)
  - [1.4.3 tsconfig.json 설정](#143-tsconfigjson-설정)
  - [1.4.4 IDE 설정](#144-ide-설정)
- [1.5 타입스크립트 기본 문법](#15-타입스크립트-기본-문법)
  - [1.5.1 기본 타입](#151-기본-타입)
  - [1.5.2 인터페이스와 타입 별칭](#152-인터페이스와-타입-별칭)
  - [1.5.3 함수](#153-함수)
  - [1.5.4 클래스](#154-클래스)
  - [1.5.5 제네릭](#155-제네릭)
  - [1.5.6 타입 추론](#156-타입-추론)
  - [1.5.7 타입 호환성](#157-타입-호환성)
- [1.6 타입스크립트와 자바스크립트 비교](#16-타입스크립트와-자바스크립트-비교)
  - [1.6.1 코드 비교 예제](#161-코드-비교-예제)
  - [1.6.2 타입 안정성의 이점](#162-타입-안정성의-이점)
- [1.7 타입스크립트 생태계](#17-타입스크립트-생태계)
  - [1.7.1 프레임워크 및 라이브러리](#171-프레임워크-및-라이브러리)
  - [1.7.2 타입 정의 파일 (@types)](#172-타입-정의-파일-types)
  - [1.7.3 DefinitelyTyped](#173-definitelytyped)
- [1.8 실제 사례 연구](#18-실제-사례-연구)
  - [1.8.1 대규모 프로젝트에서의 TypeScript 도입](#181-대규모-프로젝트에서의-typescript-도입)
  - [1.8.2 도입 효과](#182-도입-효과)
- [1.9 타입스크립트 모범 사례](#19-타입스크립트-모범-사례)
  - [1.9.1 효과적인 타입 설계](#191-효과적인-타입-설계)
  - [1.9.2 any 타입 사용 최소화](#192-any-타입-사용-최소화)
  - [1.9.3 타입 단언의 적절한 사용](#193-타입-단언의-적절한-사용)
  - [1.9.4 점진적 타입 도입](#194-점진적-타입-도입)
- [1.10 부록: 자바스크립트 심화 개념](#110-부록-자바스크립트-심화-개념)
  - [1.10.1 일급함수의 특징](#1101-일급함수의-특징)
  - [1.10.2 동적 타입 언어의 한계를 해결하는 방법](#1102-동적-타입-언어의-한계를-해결하는-방법)

# 1. 들어가며

## 1.1 웹 개발의 역사

<br>

### 1.1.1 자바스크립트의 탄생

- 1995년 넷스케이프(Netscape)에서 브렌던 아이크(Brendan Eich)가 개발.  
- 웹 브라우저에서 동적인 사용자 경험을 제공하기 위한 스크립트 언어로 설계됨.  
- HTML, CSS와 함께 작동하며 간단한 작업을 쉽게 처리하도록 설계됨.
- C와 자바의 문법에서 영감을 받았으나 완전히 동일하지 않음.  
- **프로토타입 기반 상속**을 사용.  
- **일급 함수**(함수를 값처럼 다룰 수 있는 개념)를 지원.  
- 경량 스크립트 언어로 설계됨.

<br>

### 1.1.2 자바스크립트 표준, ECMAScript의 탄생

- **자바스크립트의 호환성 문제와 크로스 브라우징 이슈를 해결하기 위해** 표준화 필요성이 제기됨.  
- 1997년 ECMA 인터내셔널에서 ECMAScript라는 이름으로 표준화가 공식화됨.
- **폴리필과 트랜스파일 도입**  
  - ECMAScript 표준 발전 이후, 최신 기능을 구형 브라우저에서도 사용하기 위해 도입됨.  
  - ES6 이후 Babel과 같은 트랜스파일러와 폴리필이 널리 사용됨.

<br>

### 1.1.3 웹사이트에서 웹어플리케이션으로의 전환

- 웹사이트와 웹어플리케이션을 다르게 지칭하는 이유:
  1. **웹사이트**
      - **정적 웹**: 일반적으로 수집된 데이터 및 정보를 표시하기 위한 정적인 구조를 가짐
      - **단방향 정보 제공**: 사용자가 정보를 읽기만 하고, 상호작용은 거의 없음
      - **콘텐츠 업데이트**: HTML로 작성된 웹 페이지의 모음으로, 콘텐츠가 동적으로 업데이트되지 않는 경우가 많음
  2. **웹어플리케이션**
      - **쌍방향 상호작용**: 사용자와의 상호작용이 가능하며, 데이터를 입력하거나 결과를 출력하는 등 동적인 기능을 제공함.
      - **대규모 웹 서비스**: 기존의 정적 웹사이트 개발 환경은 대규모 웹 서비스를 구축하는 데 적합하지 않으며, 웹어플리케이션은 이를 해결하기 위해 설계되었습니다.

<br>

### 1.1.4 개발 생태계의 발전

- **컴포넌트 베이스 개발론(CBD)** 등장 : '컴포넌트 기반 개발 (Component Based Development, CBD)'은 오래전부터 핵심 공학 분야에서 도입되었지만, 소프트웨어 관점에서의 컴포넌트 기반 개념은 최근에 Object Management Group(OMG)에 의해 발전되었습니다. 이 접근법은 **재사용성** 관점에서 엄청난 이점을 제공합니다.

<br>

> 이 연구는 **도메인 엔지니어링**과 **컴포넌트 기반 소프트웨어 엔지니어링** 간의 밀접한 관계를 분석합니다. 또한, **객체 지향 접근법**과 **컴포넌트 접근법**의 기본적인 차이점도 중요한 논점으로 다뤄집니다.
> 
> 주요 내용은 다음과 같습니다:
> 1. **컴포넌트 기반 소프트웨어의 생명 주기**에 대한 분석.
> 2. **비용 효율성**에 대한 평가.
> 3. **응용 관점**에서 컴포넌트 기반 소프트웨어의 기본적인 연구.
> 
> 이 접근법은 소프트웨어 개발에서 재사용성과 효율성을 극대화하는 데 중점을 둡니다.
> 
> 출처: [Component Based Development](https://ui.adsabs.harvard.edu/abs/2010arXiv1011.2163B/abstract)

<br>

### 1.1.5 개발 협업의 필요성 증가

- **자바스크립트는 유지 보수에 적합한 언어일까?** ❌

<br>

## 1.2 웹자바스크립트의 한계

- 자바스크립트는 동적 타입 언어로 설계되었기 때문에 정적 타입 검사와 같은 기능이 처음부터 포함되지 않았습니다.
- 타입스크립트는 자바스크립트의 **"defective"**한 부분(정적 타입 검사 부족)을 보완하기 위해 등장했다.

> **Defective(Defective는 본질적으로 설계나 구조적인 한계를 지닌 상태를 의미합니다.)**

<br>

### 1.2.1 동적 타입 언어

- **동적 타입 언어란, 변수에 타입을 명시적으로 지정하지 않고, 프로그램이 실행되는 런타임(runtime) 시점에 변수에 할당된 값에 따라 변수의 타입이 결정되는 프로그래밍 언어**

<br>

### 1.2.2 동적 타이핑 시스템 한계

```js
// 1.2.2-1.js
const sumNumber = (a, b) => {
  return a + b;
};

sumNumber(1, 2); // a와 b가 모두 숫자이므로 정상적으로 합산되어 3이 반환됩니다.
```

```js
// 1.2.2-2.js
// ㄴ 런타입에서 예기치 않은 동작을 발생하는 것을 보여주는 예
const sumNumber = (a, b) => {
  return a + b;
};

sumNumber(100); // b가 전달되지 않아 undefined가 되고, number 타입과 undefined를 더하면 결과는 NaN이 됩니다.
sumNumber("a", "b"); // string 타입끼리 덧셈이 이루어져 string 타입인 'ab'가 반환됩니다.
```

- 동적 타이핑 시스템의 한계는 주로 **타입 검증이 런타임에 이루어진다는 점에서 발생**.
  - **상세**:
    1. **타입 안정성 부족**: 함수가 기대하는 매개변수 타입(숫자)을 보장하지 않으므로, 잘못된 입력이 들어와도 에러 없이 실행 됨.
    2. **명확성 부족**: 함수의 의도가 코드만으로 명확하지 않을 수 있음.
    3. **디버깅 어려움**: 타입 오류가 컴파일 단계에서 감지되지 않으므로, 문제를 발견하려면 실행 후 결과를 확인해야 함.

<br>

### 1.2.3 한계 극복을 위한 해결 방안

- 개발자들은 자바스크립트 인터페이스 필요성 느낌. 이에 **JSDoc, 다트, propTypes와 같은 해결 방안이 등장**

<br>

### 1.2.4 타입스크립트의 등장

- 마이크로소프트는 타입스크립트를 공개.
- **타입스크립트는 자바스크립트의 슈퍼셋 언어로, 자바스크립트의 모든 기능을 포함하며 추가적인 기능 제공.**
- **주요 장점**:
  1. **정적 타이핑**: 컴파일 단계에서 오류를 발견하여 코드 안정성 보장.
  2. **IDE 지원**: 타입 정보를 활용한 자동 완성, 오류 탐지, 리팩토링 지원으로 개발 생산성 향상.
  3. **인터페이스 정의**: 코드 구조를 명확히 하여 협업에 유리.
  4. **점진적 도입 가능**: 기존 자바스크립트 코드와 호환되며 유연하게 적용 가능.
- 안정성과 생산성을 높이는 장점으로 많은 개발자와 기업들로부터 긍정적인 반응을 얻음.


![타입스크립트는 자바스크립트의 슈퍼셋 언어](https://d2ms8rpfqc4h24.cloudfront.net/uploads/2021/12/Understand-Typescript.jpg)

<br>

## 1.3 타입스크립트 소개

### 1.3.1 타입스크립트란?

타입스크립트는 자바스크립트의 슈퍼셋(Superset)으로, 정적 타입 시스템을 추가하여 자바스크립트를 확장한 프로그래밍 언어입니다. 마이크로소프트에서 개발하였으며, 2012년에 처음 공개되었습니다.

타입스크립트는 다음과 같은 중요한 특성을 가집니다:

- **자바스크립트의 슈퍼셋**: 모든 유효한 자바스크립트 코드는 타입스크립트 코드이기도 합니다.
- **정적 타이핑**: 컴파일 시점에 타입 검사를 통해 오류를 일찌 발견할 수 있습니다.
- **점진적 타이핑**: 필요에 따라 타입 정보를 추가하거나 생략할 수 있습니다.
- **자바스크립트로 컴파일**: 타입스크립트 코드는 일반 자바스크립트로 컴파일되어 모든 브라우저에서 실행됩니다.

![TypeScript는 JavaScript의 슈퍼셋](https://www.typescriptlang.org/images/index/typescript-definition.png)

> "타입스크립트는 자바스크립트에 타입을 추가한 것입니다." - TypeScript 공식 문서

### 1.3.2 타입스크립트의 주요 특징

타입스크립트는 다음과 같은 주요 특징을 제공합니다:

#### 1. 타입 주석(Type Annotations)

변수, 함수 매개변수, 반환값에 타입을 지정할 수 있습니다:

```typescript
// 변수에 타입 주석 추가
let name: string = "홍길동";
let age: number = 30;
let isActive: boolean = true;

// 함수 매개변수와 반환값에 타입 주석 추가
function greet(person: string): string {
  return `안녕하세요, ${person}!`;
}
```

#### 2. 인터페이스(Interfaces)

객체의 형태를 정의하는 강력한 방법을 제공합니다:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // 선택적 속성(있어도 되고 없어도 됨)
  readonly createdAt: Date; // 읽기 전용 속성
}

function createUser(user: User): void {
  // 사용자 생성 로직
}
```

#### 3. 타입 추론(Type Inference)

타입스크립트는 많은 경우 타입을 명시적으로 선언하지 않아도 자동으로 추론합니다:

```typescript
// 타입스크립트가 'message'를 string 타입으로 추론
// 명시적으로 타입을 지정할 필요가 없음
let message = "Hello, TypeScript";

// 함수 반환 타입도 추론
// 이 함수는 number를 반환한다고 추론됨
function add(a: number, b: number) {
  return a + b;
}
```

#### 4. 제네릭(Generics)

재사용 가능한 컴포넌트를 만들기 위한 타입 매개변수를 제공합니다:

```typescript
// T는 타입 매개변수
function identity<T>(arg: T): T {
  return arg;
}

// 명시적 타입 지정
const result = identity<string>("Hello");

// 타입 추론을 통한 사용
const value = identity(42); // number 타입으로 추론
```

#### 5. 유니온 타입(Union Types)

변수가 여러 타입 중 하나일 수 있음을 표현합니다:

```typescript
// id는 문자열이거나 숫자일 수 있음
function printId(id: string | number) {
  console.log(`ID: ${id}`);
}

printId(101);     // 유효
printId("202");   // 유효
```

### 1.3.3 타입스크립트 버전 역사

타입스크립트는 지속적인 발전을 통해 다양한 기능을 추가해왔습니다.

#### 주요 버전별 발전 과정

- **TypeScript 0.8 (2012년 10월)**: 최초 공개 버전
- **TypeScript 1.0 (2014년 10월)**: 첫 번째 정식 버전, 제네릭 지원
- **TypeScript 2.0 (2016년 9월)**: 널 체크 연산자(`?`), 태그된 유니온 타입 도입
- **TypeScript 3.0 (2018년 7월)**: 프로젝트 참조, 튜플 타입 개선
- **TypeScript 4.0 (2020년 8월)**: 가변 튜플 타입, 레이블된 튜플 요소 도입
- **TypeScript 4.5 (2021년 11월)**: `Awaited` 타입, ES 모듈 지원 개선
- **TypeScript 5.0 (2023년 3월)**: 데코레이터 표준화, const 타입 매개변수 도입
- **TypeScript 5.3 (2023년 11월)**: `import attributes`, `resolution-mode` 지원
- **TypeScript 5.4 (2024년 3월)**: 유니온 타입 추론 개선, `NoInfer` 유틸리티 타입

#### 최신 버전의 주요 기능

- **데코레이터 표준화**: ECMAScript 표준에 맞춤 데코레이터 구현
- **const 타입 매개변수**: 리터럴 타입을 유지하는 제네릭 타입 매개변수
- **모듈 해결 개선**: ESM과 CommonJS 간의 상호 운용성 향상
- **성능 최적화**: 타입 검사 및 컴파일 속도 개선

<br>

## 1.4 타입스크립트 개발 환경 설정

타입스크립트를 사용하기 위한 개발 환경을 설정하는 방법을 알아보겠습니다.

### 1.4.1 Node.js 및 npm 설치

타입스크립트를 사용하기 위해서는 먼저 Node.js와 npm(Node Package Manager)이 필요합니다.

1. [Node.js 공식 웹사이트](https://nodejs.org/)에서 최신 LTS 버전을 다운로드하여 설치합니다.
2. 설치 후 터미널에서 다음 명령어로 설치 여부를 확인합니다:

```bash
# Node.js 버전 확인
node -v

# npm 버전 확인
npm -v
```

### 1.4.2 TypeScript 설치

TypeScript를 설치하는 방법에는 전역 설치와 프로젝트별 로컬 설치 두 가지 방법이 있습니다.

#### 전역 설치 (모든 프로젝트에서 사용 가능)

```bash
npm install -g typescript
```

#### 프로젝트 로컬 설치 (현재 프로젝트에서만 사용)

```bash
# 프로젝트 디렉토리에서 실행
npm install --save-dev typescript
```

#### 설치 확인

```bash
# 전역 설치의 경우
tsc -v

# 로컬 설치의 경우
npx tsc -v
```

### 1.4.3 tsconfig.json 설정

tsconfig.json 파일은 TypeScript 프로젝트의 컴파일 옵션을 정의하는 파일입니다. 프로젝트 루트 디렉토리에 위치해야 합니다.

#### tsconfig.json 생성

```bash
### 1.4.3 tsconfig.json 구성

타입스크립트 프로젝트의 루트 디렉토리에 `tsconfig.json` 파일을 생성하여 컴파일 옵션을 구성할 수 있습니다.

```json
{
  "compilerOptions": {
    "target": "es2016",           /* 컴파일할 ECMAScript 버전 지정 */
    "module": "commonjs",          /* 모듈 코드 생성 방식 지정 */
    "esModuleInterop": true,        /* CommonJS와 ES 모듈 간의 상호 운용성 활성화 */
    "forceConsistentCasingInFileNames": true, /* 파일 이름의 대소문자 일관성 강제 */
    "strict": true,                 /* 모든 엄격한 타입 검사 옵션 활성화 */
    "skipLibCheck": true            /* 모든 .d.ts 파일의 타입 검사 건너뛰기 */
  },
  "include": ["src/**/*"],         /* 컴파일할 파일 포함 패턴 */
  "exclude": ["node_modules", "**/*.spec.ts"] /* 컴파일에서 제외할 파일 패턴 */
}
```

주요 컴파일러 옵션 설명:

- **target**: 컴파일된 JavaScript의 ECMAScript 버전 (es5, es6, es2016, es2020 등)
- **module**: 모듈 코드 생성 방식 (commonjs, es2015, esnext 등)
- **strict**: 모든 엄격한 타입 검사 옵션 활성화
- **outDir**: 컴파일된 파일이 저장될 디렉토리
- **rootDir**: 소스 파일의 루트 디렉토리
- **esModuleInterop**: CommonJS와 ES 모듈 간의 상호 운용성 활성화

### 1.4.4 tsconfig.json 고급 옵션

프로젝트의 요구사항에 따라 다양한 고급 옵션을 활용할 수 있습니다.

#### 모듈 해결 전략

```json
{
  "compilerOptions": {
    "moduleResolution": "node",     /* 모듈 해결 전략 (node, classic, bundler, nodenext) */
    "baseUrl": "./",                /* 상대 경로가 아닌 모듈 이름을 해결하기 위한 기본 디렉토리 */
    "paths": {                      /* baseUrl에 상대적인 모듈 이름 매핑 */
      "@app/*": ["src/app/*"],
      "@core/*": ["src/core/*"],
      "@shared/*": ["src/shared/*"]
    }
  }
}
```

#### 라이브러리와 DOM 타입

```json
{
  "compilerOptions": {
    "lib": ["es2020", "dom", "dom.iterable"], /* 포함할 라이브러리 파일 */
    "types": ["node", "jest"],      /* 포함할 타입 선언 패키지 */
    "typeRoots": ["./node_modules/@types", "./src/types"] /* 타입 정의를 포함하는 폴더 */
  }
}
```

#### 엄격한 타입 검사 옵션

```json
{
  "compilerOptions": {
    "strict": true,                 /* 모든 엄격한 타입 검사 옵션 활성화 */
    "noImplicitAny": true,          /* 암시적 'any' 타입 허용하지 않음 */
    "strictNullChecks": true,       /* null과 undefined를 다른 타입에 할당할 수 없음 */
    "strictFunctionTypes": true,     /* 함수 파라미터 타입 검사 엄격화 */
    "strictBindCallApply": true,     /* bind, call, apply 메서드에 대한 엄격한 검사 */
    "noUncheckedIndexedAccess": true /* 인덱스 접근 시 undefined 포함 가능성 검사 */
  }
}
```

#### 애플리케이션과 라이브러리 설정

**애플리케이션 설정**:
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "outDir": "./dist",            /* 컴파일된 파일이 저장될 디렉토리 */
    "sourceMap": true,              /* 소스맵 파일 생성 */
    "declaration": false            /* .d.ts 파일 생성하지 않음 */
  }
}
```

**라이브러리 설정**:
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "declaration": true,            /* .d.ts 파일 생성 */
    "declarationDir": "./types",    /* .d.ts 파일이 저장될 디렉토리 */
    "emitDeclarationOnly": true,    /* .d.ts 파일만 생성하고 JS 파일은 생성하지 않음 */
    "outDir": "./dist"              /* 컴파일된 파일이 저장될 디렉토리 */
  }
}
```

### 1.4.5 IDE 설정

타입스크립트를 효율적으로 사용하기 위한 추천 IDE 및 설정입니다.

#### Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/)는 마이크로소프트에서 개발한 무료 IDE로, 타입스크립트를 위한 최고의 지원을 제공합니다.

- 타입스크립트 자동 완성
- 인라인 타입 오류 표시
- 코드 네비게이션 및 리팩토링 도구
- 내장 디버거

#### 추천 확장 프로그램

- **ESLint**: 코드 품질 및 스타일 검사
- **Prettier**: 코드 포맷팅
- **Path Intellisense**: 파일 경로 자동 완성
- **TypeScript Hero**: 자동 임포트 관리

<br>

## 1.5 타입스크립트 기본 문법

### 1.5.1 기본 타입

```typescript
let isDone: boolean = false;
// 숫자 타입
let decimal: number = 6;
let hex: number = 0xf00d;      // 16진수
let binary: number = 0b1010;   // 2진수
let octal: number = 0o744;     // 8진수
let big: bigint = 100n;        // BigInt

// 문자열 타입
let color: string = "blue";
let greeting: string = `Hello, my name is ${color}`; // 템플릿 문자열

// 배열 타입
let list: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob", "Charlie"]; // 제네릭 배열 타입

// 튜플 타입
let tuple: [string, number] = ["hello", 10]; // 정확한 타입과 순서가 있는 배열

// 열거형
enum Color {Red, Green, Blue};
let c: Color = Color.Green;  // 1

enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
let direction: Direction = Direction.Up;  // "UP"

// Any 타입 - 어떤 타입이든 허용 (사용 자제 권장)
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;

// Unknown 타입 - any보다 안전한 대안
let uncertain: unknown = 30;
// uncertain.toFixed(); // 오류: 타입이 unknown이기 때문에 메서드 사용 불가

// Void 타입 - 반환값이 없는 함수에 사용
function warnUser(): void {
  console.log("This is a warning message");
}

// Null과 Undefined
let u: undefined = undefined;
let n: null = null;

// Never 타입 - 절대 반환되지 않는 함수에 사용
function error(message: string): never {
  throw new Error(message);
}
```

### 1.5.2 인터페이스와 타입 별칭

#### 인터페이스(Interface)

인터페이스는 객체의 형태를 정의하는 강력한 방법입니다.

```typescript
// 기본 인터페이스
interface User {
  name: string;
  age: number;
  email?: string;         // 선택적 속성 (optional property)
  readonly id: number;    // 읽기 전용 속성 (readonly property)
}

const user: User = {
  name: "홍길동",
  age: 30,
  id: 1
};

// 인터페이스 확장 (extension)
interface Employee extends User {
  department: string;
  salary: number;
}

const employee: Employee = {
  name: "김직원",
  age: 28,
  id: 2,
  department: "IT",
  salary: 50000
};

// 인덱스 서명 (index signature)
interface Dictionary {
  [key: string]: string;
}

const dict: Dictionary = {
  apple: "사과",
  banana: "바나나",
  cherry: "체리"
};
```

#### 타입 별칭(Type Alias)

타입 별칭은 타입에 새로운 이름을 부여하는 방법입니다.

```typescript
// 기본 타입 별칭
type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 10, y: 20 };

// 유니온 타입과 함께 사용
type ID = string | number;
let id: ID = 101;
id = "202"; // 유효

// 타입 별칭을 통한 함수 타입 정의
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => `Hello, ${name}!`;
```

#### 인터페이스 vs 타입 별칭

인터페이스와 타입 별칭은 비슷하지만 중요한 차이가 있습니다:

- 인터페이스는 확장(extends)이 가능하고, 동일한 이름으로 여러 번 선언하면 자동으로 병합됩니다.
- 타입 별칭은 유니온, 인터섹션, 튜플 등 보다 복잡한 타입을 정의하는 데 유용합니다.

### 1.5.3 함수

타입스크립트에서 함수는 매개변수와 반환값에 타입을 지정할 수 있습니다.

```typescript
// 기본 함수 타입 지정
function add(a: number, b: number): number {
  return a + b;
}

// 선택적 매개변수
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  }
  return firstName;
}

// 기본값 매개변수
function greeting(name: string = "Guest"): string {
  return `Hello, ${name}!`;
}

// 나머지 매개변수
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

// 화살표 함수
const multiply = (a: number, b: number): number => a * b;

// 함수 오버로딩
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value * 2;
}
```

### 1.5.4 클래스

타입스크립트의 클래스는 ES6 클래스 문법에 타입 정보를 추가한 형태입니다.

```typescript
class Person {
  // 속성 선언
  private name: string;
  protected age: number;
  readonly id: number;
  public email: string;
  
  // 생성자
  constructor(name: string, age: number, id: number, email: string) {
    this.name = name;
    this.age = age;
    this.id = id;
    this.email = email;
  }
  
  // 메서드
  greet(): string {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

// 생성자 파라미터 속성을 사용한 더 간결한 방법
class Employee {
  constructor(
    private name: string,
    protected age: number,
    readonly id: number,
    public department: string
  ) {}
  
  getDetails(): string {
    return `${this.name}, ${this.age}, ${this.department}`;
  }
}

// 상속
class Manager extends Employee {
  constructor(
    name: string,
    age: number,
    id: number,
    department: string,
    private reports: number
  ) {
    super(name, age, id, department);
  }
  
  getManagerDetails(): string {
    return `${this.getDetails()}, Reports: ${this.reports}`;
  }
}
```

### 1.5.5 제네릭

제네릭은 다양한 타입에서 작동하는 재사용 가능한 코드를 작성하는 방법입니다.

```typescript
// 제네릭 함수
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("myString");  // 명시적 타입 지정
let output2 = identity(42);                 // 타입 추론

// 제네릭 인터페이스
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "Hello" };
const numberBox: Box<number> = { value: 42 };

// 제네릭 클래스
class Container<T> {
  private item: T;
  
  constructor(item: T) {
    this.item = item;
  }
  
  getItem(): T {
    return this.item;
  }
}

const numberContainer = new Container<number>(123);
const stringContainer = new Container("Hello");  // 타입 추론

// 제네릭 제약
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength("Hello");       // 문자열은 length 속성이 있음
getLength([1, 2, 3]);      // 배열도 length 속성이 있음
// getLength(123);        // 오류: number에는 length 속성이 없음
```

### 1.5.6 타입 추론

타입스크립트는 많은 경우 타입을 명시적으로 선언하지 않아도 자동으로 추론합니다.

```typescript
// 변수 초기화에서 타입 추론
let message = "Hello";  // string으로 추론

// 함수 반환값에서 타입 추론
function multiply(a: number, b: number) {
  return a * b;  // 반환값이 number로 추론됨
}

// 문맥에서 타입 추론
const names = ["Alice", "Bob", "Charlie"];  // string[] 로 추론
names.forEach(name => {
  console.log(name.toUpperCase());  // name이 string으로 추론됨
});

// 객체 리터럴에서 타입 추론
const user = {
  name: "John",
  age: 30,
  isAdmin: true
};  // { name: string; age: number; isAdmin: boolean; } 로 추론
```

### 1.5.7 타입 호환성

타입스크립트는 구조적 타이핑(structural typing)을 사용하며, 타입의 이름이 아닌 구조에 기반하여 호환성을 결정합니다.

```typescript
// 구조적 타이핑 예시
interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// Point 인터페이스를 명시적으로 구현하지 않았지만
// 필요한 구조를 가지고 있으므로 호환됨
const point3D = { x: 10, y: 20, z: 30 };
printPoint(point3D);  // 유효

// 업캐스팅과 다운캐스팅
class Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  breed: string;
  
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
}

let animal: Animal = new Dog("Rex", "German Shepherd");  // 업캐스팅 가능
// let dog: Dog = new Animal("Generic Animal");  // 오류: 다운캠스팅 불가능
```

#### 유니온과 인터섹션 타입

```typescript
// 유니온 타입 (Union Types) - OR
type ID = string | number;
let id: ID = 101;
id = "202";  // 둘 다 유효

// 인터섹션 타입 (Intersection Types) - AND
type Employee = {
  id: number;
  name: string;
};

type Manager = {
  department: string;
  reports: number;
};

type ManagerWithEmployee = Employee & Manager;

const manager: ManagerWithEmployee = {
  id: 123,
  name: "김관리",
  department: "개발팀",
  reports: 5
};  // 모든 필드가 필요함
```

### 1.5.8 타입 내로잉과 타입 가드

타입 내로잉(Type Narrowing)은 더 넓은 타입에서 더 구체적인 타입으로 좁히는 과정입니다. 타입스크립트는 코드의 흐름을 분석하여 타입을 자동으로 좁힐 수 있습니다.

```typescript
// typeof 타입 가드
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    // 이 블록에서 padding은 number 타입
    return Array(padding + 1).join(" ") + value;
  }
  // 이 블록에서 padding은 string 타입
  return padding + value;
}

// instanceof 타입 가드
class Bird {
  fly() {
    console.log("날아갑니다");
  }
}

class Fish {
  swim() {
    console.log("헤엄칩니다");
  }
}

function move(animal: Bird | Fish) {
  if (animal instanceof Bird) {
    // 이 블록에서 animal은 Bird 타입
    animal.fly();
  } else {
    // 이 블록에서 animal은 Fish 타입
    animal.swim();
  }
}

// 사용자 정의 타입 가드
function isFish(pet: Bird | Fish): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function makeMove(pet: Bird | Fish) {
  if (isFish(pet)) {
    // 이 블록에서 pet은 Fish 타입
    pet.swim();
  } else {
    // 이 블록에서 pet은 Bird 타입
    pet.fly();
  }
}
```

### 1.5.9 식별 가능한 유니온

식별 가능한 유니온(Discriminated Unions)은 공통 속성을 사용하여 유니온 타입의 멤버를 구분하는 패턴입니다.

```typescript
// 식별 가능한 유니온 패턴
type Circle = {
  kind: "circle";
  radius: number;
};

type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

type Shape = Circle | Rectangle;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // 이 블록에서 shape은 Circle 타입
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      // 이 블록에서 shape은 Rectangle 타입
      return shape.width * shape.height;
  }
}

// Exhaustive 검사 (완전 검사)
type Triangle = {
  kind: "triangle";
  base: number;
  height: number;
};

// Shape 타입에 Triangle 추가
type ExtendedShape = Shape | Triangle;

function getArea(shape: ExtendedShape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      // 모든 케이스를 처리했는지 컴파일 시점에 확인
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

<br>

## 1.6 타입스크립트와 자바스크립트 비교

### 1.6.1 코드 비교 예제

**JavaScript 예제**:
```js
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}

// 실행 시점에 오류 발생 가능
const result = calculateTotal([
  { price: 100, quantity: 2 },
  { price: '200', quantity: 1 } // 문자열 타입으로 인한 오류
]);
```

**TypeScript 예제**:
```ts
interface Item {
  price: number;
  quantity: number;
}

function calculateTotal(items: Item[]): number {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}

// 컴파일 시점에 오류 감지
const result = calculateTotal([
  { price: 100, quantity: 2 },
  { price: '200', quantity: 1 } // 타입 오류: '200'은 number 타입이 아님
]);
```

### 1.6.2 타입 안정성의 이점

- **컴파일 시점 오류 감지**: 런타임 전에 타입 관련 오류를 발견
- **자동 완성 및 인텔리센스**: 개발 도구에서 더 나은 코드 지원
- **리팩토링 안정성**: 타입 시스템이 코드 변경 시 영향 범위를 명확히 파악하게 도움
- **도구 호환성**: IDE, 린팅, 포맷터와의 원활한 통합으로 개발 경험 향상

<br>

## 1.7 타입스크립트 생태계

타입스크립트 생태계는 프레임워크, 라이브러리, 도구 및 커뮤니티를 포함하는 포괄적인 원소들로 구성되어 있습니다.

### 1.7.1 프레임워크 및 라이브러리

#### 프론트엔드 프레임워크

- **Angular**: 구글이 개발한 프론트엔드 프레임워크로, 처음부터 타입스크립트를 기반으로 개발되었습니다. 엔터프라이즈 애플리케이션 개발에 적합합니다.

- **React**: 페이스북(메타)에서 개발한 인기 있는 UI 라이브러리로, TypeScript와 함께 사용하면 JSX/TSX를 통해 타입 안전성을 크게 향상시킬 수 있습니다.
  ```typescript
  // React와 TypeScript 예시
  interface Props {
    name: string;
    age: number;
  }
  
  const UserProfile: React.FC<Props> = ({ name, age }) => {
    return <div>Name: {name}, Age: {age}</div>;
  };
  ```

- **Vue.js**: 프로그레시브 프레임워크로, Vue 3부터 타입스크립트 지원이 크게 개선되었습니다. 컴포지션 API와 함께 사용하면 타입 안전성을 확보할 수 있습니다.

- **Svelte**: 컴파일 시점에 반응형 코드를 생성하는 프레임워크로, TypeScript를 공식적으로 지원합니다.

#### 백엔드 프레임워크

- **NestJS**: 타입스크립트를 기반으로 한 Node.js 서버사이드 프레임워크로, Angular에서 영감을 받아 데코레이터와 디펜던시 인젝션 패턴을 사용합니다.
  ```typescript
  // NestJS 예시
  @Controller('users')
  export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @Get()
    findAll(): User[] {
      return this.usersService.findAll();
    }
  }
  ```

- **Express.js + TypeScript**: 인기 있는 Node.js 프레임워크인 Express를 타입스크립트와 함께 사용할 수 있습니다.

- **Deno**: Ryan Dahl이 개발한 Node.js의 후속으로, 타입스크립트를 기본으로 지원하는 JavaScript 런타임입니다.

#### 상태 관리 라이브러리

- **Redux Toolkit**: Redux의 공식 툴킷으로, 타입스크립트를 완벽하게 지원합니다.

- **MobX**: 반응형 상태 관리 라이브러리로, 타입스크립트와 함께 사용하면 타입 안전성을 크게 향상시킬 수 있습니다.

### 1.7.2 타입 정의 파일 (@types)

JavaScript 라이브러리를 타입스크립트에서 사용하기 위해서는 해당 라이브러리의 타입 정의가 필요합니다. 대부분의 인기 있는 라이브러리는 `@types/` 네임스페이스 아래에 타입 정의가 제공됩니다.

```bash
# 라이브러리의 타입 정의 설치 예시
npm install --save-dev @types/react     # React의 타입 정의
npm install --save-dev @types/node      # Node.js의 타입 정의
npm install --save-dev @types/express   # Express.js의 타입 정의
npm install --save-dev @types/jest      # Jest 테스팅 프레임워크의 타입 정의
```

#### 타입 정의 파일의 구조

타입 정의 파일은 `.d.ts` 확장자를 가지며, 라이브러리의 API를 타입스크립트가 이해할 수 있도록 정의합니다.

```typescript
// node_modules/@types/react/index.d.ts 파일의 일부 예시
declare namespace React {
  interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> { }
  
  interface FC<P = {}> {
    (props: P & { children?: ReactNode }): ReactElement | null;
    displayName?: string;
  }
  
  // ... 나머지 정의들
}
```

### 1.7.3 DefinitelyTyped

[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)는 타입스크립트 타입 정의를 위한 대형 오픈소스 저장소입니다. 이 프로젝트는 수천 개의 JavaScript 라이브러리에 대한 타입 정의를 제공합니다.

- **역할**: 타입스크립트 커뮤니티가 함께 관리하는 중앙 저장소로, 일관된 품질의 타입 정의를 제공합니다.
- **기여 방법**: 누구나 타입 정의를 기여하거나 개선할 수 있으며, 풀 리퀘스트(PR)를 통해 검토 후 병합됩니다.
- **설치**: npm을 통해 `@types/` 네임스페이스로 설치할 수 있습니다.

### 1.7.4 타입스크립트 도구 및 플러그인

#### 코드 품질 도구

- **ESLint + TypeScript ESLint**: 코드 품질을 검사하고 타입스크립트 관련 문제를 발견하는 도구입니다.
  ```bash
  npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
  ```

- **Prettier**: 코드 포맷팅 도구로, 타입스크립트 코드의 일관성을 유지하는 데 도움을 줍니다.

#### 테스팅 프레임워크

- **Jest**: 페이스북에서 개발한 테스팅 프레임워크로, 타입스크립트와 함께 사용할 수 있습니다.
  ```typescript
  // Jest와 TypeScript 테스트 예시
  describe('sum function', () => {
    it('adds two numbers correctly', () => {
      expect(sum(1, 2)).toBe(3);
    });
  });
  ```

- **Cypress**: E2E 테스팅 프레임워크로, 타입스크립트를 지원합니다.

#### 빌드 도구

- **Webpack + ts-loader**: 타입스크립트 코드를 빌드하기 위한 대표적인 조합입니다.

- **Vite**: 최신 빌드 도구로, 타입스크립트를 기본으로 지원하며 빠른 빌드 속도를 자랑합니다.

- **esbuild**: 고성능 JavaScript 번들러로, 타입스크립트를 기본 지원합니다.

### 1.7.5 타입스크립트 API

타입스크립트는 타입 조작을 위한 다양한 유틸리티 타입을 제공합니다.

```typescript
// 유틸리티 타입 예시

// Partial: 모든 프로퍼티를 선택적으로 만듬
type User = { name: string; age: number; email: string };
type PartialUser = Partial<User>; // { name?: string; age?: number; email?: string }

// Required: 모든 프로퍼티를 필수로 만듬
type PartialUser = { name?: string; age?: number };
type RequiredUser = Required<PartialUser>; // { name: string; age: number }

// Pick: 특정 프로퍼티만 선택
type User = { name: string; age: number; email: string };
type NameAndEmail = Pick<User, 'name' | 'email'>; // { name: string; email: string }

// Omit: 특정 프로퍼티를 제외
type User = { name: string; age: number; email: string };
type UserWithoutEmail = Omit<User, 'email'>; // { name: string; age: number }

// Record: 키/값 쌍의 집합 생성
type PageInfo = Record<'home' | 'about' | 'contact', { title: string; url: string }>;
// { home: { title: string; url: string }, about: { title: string; url: string }, contact: { title: string; url: string } }
```
- 지속적으로 업데이트되고 개선됨

<br>

## 1.8 실제 사례 연구
### 1.8.1 대규모 프로젝트에서의 TypeScript 도입

- **Airbnb**: 코드베이스를 JavaScript에서 TypeScript로 마이그레이션하여 버그 30% 감소
- **Microsoft**: Visual Studio Code를 TypeScript로 개발하여 개발 생산성 향상
- **Slack**: 클라이언트 코드를 TypeScript로 전환하여 코드 품질 개선

### 1.8.2 도입 효과

- **버그 감소**: 런타임 오류 25-30% 감소 (여러 기업 사례 기준)
- **개발 속도**: 초기 개발은 약간 느려질 수 있으나, 장기적으로 유지보수 속도 향상
- **개발자 경험**: 자동 완성, 타입 추론 등으로 개발자 만족도 증가
- **문서화**: 코드 자체가 문서 역할을 하여 팀 협업 개선

<br>

## 1.9 타입스크립트 마이그레이션 가이드

자바스크립트 프로젝트를 타입스크립트로 마이그레이션하는 과정은 점진적으로 진행하는 것이 좋습니다. 이 가이드는 성공적인 마이그레이션을 위한 전략과 팁을 제공합니다.

### 1.9.1 점진적 마이그레이션 전략

#### 1. 환경 준비

```bash
# TypeScript 설치
npm install --save-dev typescript @types/node

# tsconfig.json 생성
npx tsc --init
```

#### 2. 자바스크립트와 타입스크립트 파일 혼합 사용 설정

```json
// tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,           /* JavaScript 파일 컴파일 허용 */
    "checkJs": true,           /* JavaScript 파일에 오류 보고 */
    "noEmit": true,            /* 컴파일된 결과물 생성하지 않음 (타입 검사만 수행) */
    "strict": false            /* 처음에는 엄격한 모드 비활성화 */
  },
  "include": ["src/**/*"]
}
```

#### 3. JSDoc 주석을 활용한 점진적 타이핑

```javascript
// @ts-check

/**
 * 사용자 정보를 나타내는 객체
 * @typedef {Object} User
 * @property {string} name - 사용자 이름
 * @property {number} age - 사용자 나이
 */

/**
 * 사용자 인사를 반환하는 함수
 * @param {User} user - 사용자 객체
 * @returns {string} 인사말
 */
function greetUser(user) {
  return `안녕하세요, ${user.name}님! 당신은 ${user.age}세입니다.`;
}
```

#### 4. 파일 확장자 변경 전략

1. `.js` 파일을 `.ts` 파일로 변경
2. React 프로젝트의 경우 `.jsx` 파일을 `.tsx` 파일로 변경

#### 5. 디렉토리 단위 마이그레이션

중요도와 영향도에 따라 순차적으로 마이그레이션하는 것이 좋습니다:

1. 코어 로직 또는 도메인 모델부터 시작
2. 유틸리티 함수와 헬퍼 함수
3. UI 컴포넌트
4. 테스트 코드

### 1.9.2 자주 겹치는 마이그레이션 이슈와 해결책

#### 1. any 타입 과도한 사용

```typescript
// 나쁨 예시
function processData(data: any) {
  return data.someProperty.nested.value; // 안전하지 않음
}

// 개선된 예시
interface DataShape {
  someProperty?: {
    nested?: {
      value?: string
    }
  }
}

function processData(data: DataShape) {
  return data.someProperty?.nested?.value; // 안전한 접근
}
```

#### 2. 라이브러리 타입 정의 문제

```bash
# 타입 정의 파일 설치
npm install --save-dev @types/lodash @types/react @types/node
```

#### 3. 타입 선언 파일 생성

```typescript
// src/types/global.d.ts
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  import React from 'react';
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module '*.json' {
  const value: any;
  export default value;
}
```

#### 4. 점진적 엄격한 타입 검사 적용

```json
// 단계 1: 기본 검사
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}

// 단계 2: null 검사 추가
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// 단계 3: 모든 엄격한 검사 활성화
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 1.9.3 마이그레이션 성공 사례

- **Slack**: 클라이언트 코드를 TypeScript로 전환하여 새로운 기능 개발 속도 30% 향상
- **Airbnb**: 점진적 마이그레이션을 통해 런타임 오류 40% 감소
- **Lyft**: 웹 애플리케이션 마이그레이션 후 코드 품질 및 개발자 경험 개선

<br>

## 1.10 타입스크립트 모범 사례

### 1.10.1 효과적인 타입 설계

- **구체적인 타입 사용**: `any` 대신 구체적인 타입 사용
- **유니온 타입 활용**: 가능한 모든 케이스를 명시적으로 처리
- **인터페이스 확장**: 코드 재사용성을 높이기 위해 인터페이스 확장 활용
- **제네릭 활용**: 재사용 가능한 컴포넌트 설계에 제네릭 활용

### 1.10.2 any 타입 사용 최소화

```ts
// 나쁜 예
function processData(data: any): any {
  return data.length; // 런타임 오류 가능성 있음
}

// 좋은 예
function processData<T extends { length: number }>(data: T): number {
  return data.length; // 타입 안전성 보장
}
```

### 1.10.3 타입 단언의 적절한 사용

```ts
// 피해야 할 패턴
const element = document.getElementById('root') as HTMLElement; // 항상 존재한다고 가정

// 더 안전한 패턴
const element = document.getElementById('root');
if (element) {
  // element가 null이 아닐 때만 실행
  (element as HTMLElement).style.color = 'red';
}
```

### 1.10.4 점진적 타입 도입

- **allowJs 옵션**: JavaScript와 TypeScript 파일 혼합 사용 허용
- **단계적 마이그레이션**: 중요한 부분부터 점진적으로 타입 추가
- **noImplicitAny**: 암시적 any 타입 사용 시 오류 발생 설정
- **strict 모드**: 점진적으로 strict 모드 활성화하여 타입 안전성 강화

<br>

## 더 나아가서

### 일급함수의 특징

1. **함수를 변수에 할당할 수 있다.**
   ```js
   const sayHello = function() {
     console.log("안녕하세요!");
   };
   sayHello(); // 출력: 안녕하세요!
   ```

2. **함수를 다른 함수의 인자로 전달할 수 있다.**
   ```js
   function executeFunction(func) {
     func();
   }
   executeFunction(() => console.log("함수가 전달되었습니다!"));
   // 출력: 함수가 전달되었습니다!
   ```

3. **함수를 반환값으로 사용할 수 있다.**
   ```js
   function createMultiplier(multiplier) {
     return function(number) {
       return number * multiplier;
     };
   }
   const double = createMultiplier(2);
   console.log(double(5)); // 출력: 10
   ```

4. **함수를 데이터 구조(배열, 객체 등)에 저장할 수 있다.**
   ```js
   const operations = {
     add: (a, b) => a + b,
     subtract: (a, b) => a - b
   };
   console.log(operations.add(10, 5)); // 출력: 15
   console.log(operations.subtract(10, 5)); // 출력: 5
   ```

<br>

### 동적 타입 언어의 한계를 해결하는 방법

1. **명시적 타입 검증**  
   - 함수 내부에서 매개변수의 타입을 확인하고, 잘못된 타입이 들어오면 에러를 던질 수 있습니다.
     ```js
     const sumNumber = (a, b) => {
         if (typeof a !== "number" || typeof b !== "number") {
             throw new Error("숫자만 입력해야 합니다.");
         }
         return a + b;
     };
     ```

2. **정적 타이핑 도입**  
   - TypeScript와 같은 정적 타이핑 언어를 사용하면, 컴파일 단계에서 타입 오류를 방지할 수 있습니다.
     ```ts
     const sumNumber = (a: number, b: number): number => {
         return a + b;
     };
     ```
