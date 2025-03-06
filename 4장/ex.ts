// ------------------------------------------------ 
// 기본 타입(🐦)
// ------------------------------------------------
type Bird = {
    name: string;
    type: string;
    size?: string;
    fly?: () => string;
    swim?: () => string;
};

// ------------------------------------------------ 
// 타입 확장하기(🐤,🦅,🦆,🐧) 
// ㄴ 인터섹션 타입(&)을 사용해 새로운 타입을 만드는 방법으로 
//    🐦 타입의 기본 구조를 재활용하여 속성을 추가하여 타입을 구체화합니다.
// ------------------------------------------------
type Sparrow = Bird & {
    type: "Sparrow";
    size: "small";
    fly: () => string;
};

type Eagle = Bird & {
    type: "Eagle";
    size: "large";
    fly: () => string;
};

type Duck = Bird & {
    type: "Duck";
    size?: "medium";
    swim: () => string;
    fly?: () => string;
};

type Penguin = Bird & {
    type: "Penguin";
    size?: "large";
    swim: () => string;
    fly?: never;
};

// ------------------------------------------------
// 타입 가드
// ㄴ 확장된 타입 중 특정 타입(예: bird is 🐤)을 식별하는 함수로,
//    조건이 '참'인 경우 해당 타입으로 안전하게 좁혀줍니다.
// ------------------------------------------------
const isSparrow = (bird: Bird): bird is Sparrow => {
    return (
        bird.type === "Sparrow" &&      // bird.type이 "Sparrow"인지 확인
        bird.size === "small" &&        // bird.size가 "small"인지 확인
        typeof bird.fly === "function"  // 선택적 속성인 bird.fly의 기대값이 '함수 타입'인지 확인 (정확성을 위해 typeof 사용)
    );
};

const isEagle = (bird: Bird): bird is Eagle => {
    return (
        bird.type === "Eagle" &&
        bird.size === "large" &&
        typeof bird.fly === "function"
    );
};
const isDuck = (bird: Bird): bird is Duck => {
    return (
        bird.type === "Duck" &&
        typeof bird.swim === "function"
    );
};

const isPenguin = (bird: Bird): bird is Penguin => {
    return (
        bird.type === "Penguin" &&
        typeof bird.swim === "function" &&
        bird.fly === undefined
    );
};

// ------------------------------------------------ 
// 타입 좁히기
// ㄴ `유니온 타입(|)`과 `타입 가드(`isSparrow`, `isEagle` 등)`를 활용하여
//    매개변수로 전달된 `bird` 객체가 🐤,🦅,🦆,🐧 타입 중 하나인지 확인하고, 
//    해당 타입으로 타입을 좁혀서 반환하는 역할을 합니다.
// ㄴ 반환 되는 타입: Sparrow | Eagle | Duck | Penguin | undefined
// ------------------------------------------------
const narrowBirdType = (
    bird: Bird
): Sparrow | Eagle | Duck | Penguin | undefined => {
    if (isSparrow(bird)) return bird;
    if (isEagle(bird)) return bird;
    if (isDuck(bird)) return bird;
    if (isPenguin(bird)) return bird;

    return undefined;
};

// ------------------------------------------------
// Bird 배열을 확장하는 함수
// ㄴ 기존 Bird 배열(birds)과 새로 추가되는 Bird 배열(newBirds)을 병합하여 확장합니다.
// ㄴ 제네릭 타입 T(`T extends Bird`)를 사용함으로써 
//    T가 Bird 타입 또는 Bird의 하위 타입임을 보장합니다.
// ------------------------------------------------
const extendBirdTypes = <T extends Bird>(birds: Bird[], newBirds: T[]): Bird[] => {
    return [...birds, ...newBirds];
};

// Bird를 설명하는 함수
const describeBird = (bird: Bird): string => {
    const specificBird = narrowBirdType(bird);

    if (!specificBird) {
        // narrowBirdType이 undefined를 반환할 경우 처리
        return `🐦 ${bird.name}는 특수한 기능 없이 그냥 새입니다.`;
    }

    if (isSparrow(specificBird)) {
        return `🐤 ${specificBird.name}는 작은 크기의 참새입니다. 날기: ${specificBird.fly()}`;
    } else if (isEagle(specificBird)) {
        return `🦅 ${specificBird.name}는 큰 독수리입니다. 날기: ${specificBird.fly()}`;
    } else if (isDuck(specificBird)) {
        return `🦆 ${specificBird.name}는 오리입니다. 날기: ${specificBird.fly?.() || "비행 불가"
            }, 수영: ${specificBird.swim()}`;
    } else if (isPenguin(specificBird)) {
        return `🐧 ${specificBird.name}는 펭귄입니다. 수영: ${specificBird.swim()}`;
    }

    return `🐦 ${bird.name}는 특수한 기능 없이 그냥 새입니다.`;
};

// ------------------------------------------------ 
// 테스트 
// ------------------------------------------------ 
const sparrow: Sparrow = {
    name: "작은 참새",
    type: "Sparrow",
    size: "small",
    fly: () => "참새 날기! 🐤",
};

const eagle: Eagle = {
    name: "황금 독수리",
    type: "Eagle",
    size: "large",
    fly: () => "독수리 높이 날기! 🦅",
};

const duck: Duck = {
    name: "흰뺨오리",
    type: "Duck",
    swim: () => "오리 수영! 🦆",
    fly: () => "오리 날기! 🦆",
};

const penguin: Penguin = {
    name: "남극 펭귄",
    type: "Penguin",
    swim: () => "펭귄 수영! 🐧",
};

// 테스트: Bird 배열 생성
let birds: Bird[] = [sparrow, eagle, duck, penguin];

// Bird 배열 확장
birds = extendBirdTypes(birds, [
    { name: "추가 참새", type: "Sparrow", size: "small", fly: () => "나는 참새! 🐤" },
    { name: "추가 독수리", type: "Eagle", size: "large", fly: () => "나는 독수리! 🦅" },
]);

// Bird 설명 출력
const descriptions = birds.map(describeBird);
console.log(descriptions);

/***
 * [LOG]: ["🐤 작은 참새는 작은 크기의 참새입니다. 날기: 참새 날기! 🐤", "🦅 황금 독수리는 큰 독수리입니다. 날기: 독수리 높이 날기! 🦅", "🦆 흰뺨오리는 오리입니다. 날기: 오리 날기! 🦆, 수영: 오리 수영! 🦆", "🐧 남극 펭귄는 펭귄입니다. 수영: 펭귄 수영! 🐧", "🐤 추가 참새는 작은 크기의 참새입니다. 날기: 나는 참새! 🐤", "🦅 추가 독수리는 큰 독수리입니다. 날기: 나는 독수리! 🦅"] 
 * [LOG]: ["🐤 작은 참새는 작은 크기의 참새입니다. 날기: 참새 날기! 🐤", "🦅 황금 독수리는 큰 독수리입니다. 날기: 독수리 높이 날기! 🦅", "🦆 흰뺨오리는 오리입니다. 날기: 오리 날기! 🦆, 수영: 오리 수영! 🦆", "🐧 남극 펭귄는 펭귄입니다. 수영: 펭귄 수영! 🐧", "🐤 추가 참새는 작은 크기의 참새입니다. 날기: 나는 참새! 🐤", "🦅 추가 독수리는 큰 독수리입니다. 날기: 나는 독수리! 🦅"] 
 * [LOG]: ["🐤 작은 참새는 작은 크기의 참새입니다. 날기: 참새 날기! 🐤", "🦅 황금 독수리는 큰 독수리입니다. 날기: 독수리 높이 날기! 🦅", "🦆 흰뺨오리는 오리입니다. 날기: 오리 날기! 🦆, 수영: 오리 수영! 🦆", "🐧 남극 펭귄는 펭귄입니다. 수영: 펭귄 수영! 🐧", "🐤 추가 참새는 작은 크기의 참새입니다. 날기: 나는 참새! 🐤", "🦅 추가 독수리는 큰 독수리입니다. 날기: 나는 독수리! 🦅"] 
 * [LOG]: ["🐤 작은 참새는 작은 크기의 참새입니다. 날기: 참새 날기! 🐤", "🦅 황금 독수리는 큰 독수리입니다. 날기: 독수리 높이 날기! 🦅", "🦆 흰뺨오리는 오리입니다. 날기: 오리 날기! 🦆, 수영: 오리 수영! 🦆", "🐧 남극 펭귄는 펭귄입니다. 수영: 펭귄 수영! 🐧", "🐤 추가 참새는 작은 크기의 참새입니다. 날기: 나는 참새! 🐤", "🦅 추가 독수리는 큰 독수리입니다. 날기: 나는 독수리! 🦅"] 
 */
