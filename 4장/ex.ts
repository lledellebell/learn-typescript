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
 */

// TS Playground:
// https://www.typescriptlang.org/play/?#code/PTAEFpK6dv4VUAoEpAMdYD57SAGFwoeMAUgvBuBkOwJSpiLU22TIAuAngA4CmoAQgJYBOAJqAC8oAN7JQk0ADsAhgFs2ALlABnBr27SA5gG4JU5uxXrNO-VLXcAXmwD8JjVr0HJAMwA2TB6AJlhAHxqTuauagDu3PI+foHBZi4AvvqUEHTpGZAoaPiggKprgKXjgBqr6MSAJDsANIB8G4Chu9WAYbsVRIDkO-6pgCyMoIAe44AMi4Ccg4Aag7iEAGRkgCLjoIA1A4CVY4Auq6CAEwOAOh2ALWPDk4AznYA7LYApTaCAlD2AqT2APOPL2WBSpMOAGuMY2IA2tYAOE4A+naCANeOAOmszRYA3o6CAWMHAIyDk0AKbOAABq-htQA9AC0zgBU1wCWq4AJpsAJ00AOlSmWxtEYrA4AGUWLJeLwAPbhYRcPiCEZiMJGZSgABERJJ5PCzIsUlUNiZzNU8lkHg8XLCniYKliQiCpmc+mSyDx7FAAFFZNoPBwRDwBKA6eJLIyVMz1Zq2GLLLzbCaPCTtBbue4vFL-DL4vLkIrlRwACIAVwAxgBrKm62n0o34k0BkNclBWvk+ZmKfjcf3yS08yLyV1xOWhSwSmJu2UhJIpRmgAAKbB0-q0YZp+sjhmjLNr9a0Wck1vstvtjrCqhzefdBZcRa8PmkbAAbmxeAqUlicWv4KlcuDth18gVADgtw1AgERJ0CATqXAKgTwwIgAgxlQAI2b3FUoCIZQmoEAu0OAEZ6ivtABargAYQ8sFSpFITyAC41gAu46AADkgAcM7BXSgIAvTWAA1joBzIAn03DGcoCABKjgAgE0UgAxNaAgCBE4AAGuALCTaKYmg66MTAyCBmS0jqKAz5sqSFJUgQj4CCo4ZkA+T4vtxHJxIaUi8GwDD+rw0i+GElgCfw6JVkIWkshJFLMvqdKWKAaBqRp+IwayxI8ZyXSAAOT+RdCpUimX2wjaQKQoivpIyGUZxlgC5fLgiygrCqKdkOU5kiMmSbigKZEpuSIzJuP60iBgw3Bsfp-mgIABIOALsLgCAE4CQLIQlXh3OggAAzYASDUwbBQHDEh9l5MhBAXnkIKgIAIOMLDFcWzBQlhkMuSqsexDCcaoZpanxalCTSInxWJaoanN7rSZIsnyYpyl+ZIpmae5s0WgZCYHYFthJSydq8A63kjFFoADStAjoolWnJal6WZdlYSjV6+gTRxz6xqGIj8TSi0CMtanTaA4NSWEO0KUpBDPUd+I3cy4OPc9r0uTmOM-RlWXSMyANjSxbGg6onbaA2SmQwt1Kw6JerPjWdaM42m0o3JaP7ZdNJmSqX0djzTP4wdL34rFb3qSOUQk2lZPZQZmOi592lpfwbBuFobCCFTQNKgxTGWxcR7kYAEevoLuAAGgAE48igAUY9eAA+ZCO4APzWgI7W7bAQjtcVZHKOxUAfPqdjugIAjy0+283x-GBkiACedgA4NYAAz3AaAhGADdNh6O2pceALg1sLBW+1R1FUjQtEep5FIAGQ0RW1RSAAc1Udp5hOH4Hh+CTFRgA4g6AgAYPYAGmt-qAgC3o4ABquTCiGK7pPoCABgt+z4CoumUp7a3mqAe9I3vDNM4foB6wbRv8KuluMTTk0yOyFLhgAKtjkNhKz4bIMtO-n6dc+x9uZdiUnvS+htZyCH5pYbgcUCBh2fuEKGsN-Coz2mpJ0nF4Ex3WmwFB-AyBoMFhgmkWC4G+DBkGYMBCiGgHQUpTBYQKEIPplLLQtDiG7UYWQpUlgGEX2kPrSBxtqYWzvuuVI4ZQCAAYewAL6OTEKNPICu50CABcJtmgh5EENUGQf2KxQAQg3po2RciCCznCOGXRkxACLPYiKEhQl70TAJ0QAOBOABJGwAtZ1HlfiHV+oA2AAA8GB1n4C+cMjsyBvFmP+M4gALYetlIV+wVpG5EAAht+xwx3CKD1YYgAQ8cmIAF56ChONvhInED8OJBJCUIt++IXwiAADz+OqaE8JNIAg6JhvwAA2gAXSjhYqxKhX79OWuGfpyN+EkKUj09E8y1KqCjvM9EQyaSqD6dTSpU19aqEDJoe8bBpEs2hpo5aE4plSBBlNVQ7BAxwO4IGY5T9rJ1PYLQlIsD4EAEJblsHuYbJ5S1Wx+TQHIV5NJ37sBghA6+bxJ5z1QhhQAGTOABrO56AjHbXAACSiFMnIRQiR9hnkAoAHVWMCAFKm0AgAx0ZgoAD9rACnDUsPAdFHZYMSHwqQLDEHWQIH8gFjzhL+C2kZTFb5QC4v5Q8oF70CVsCJaAQAieOAAFx0AgAbBfQHceCiwWUYlAIAAob0AqElXc6V4YPpeD8IkNlYREgBI8KoDg3KZp4L5aawFQqQWipmQHWoErRBSo9aLOVCrAAOC6AQAo82AVRbq9EBqjX+sDYK7WlqyDWvZfax12DKGqHBm6-5ZqlrCoxT6x2ddE3uuTbKhQ8r9iABIxmNdF43GpFbLJNMr1LFnRLET2e9mSABE+wAkaugEABG94JKay0SFHQCgBAMZbe281yt5BWptZYO1bAHVOpwWw0B+aBUdroa2mSpaG4moLUG6thL9iAFrlwAI7WxtALO+dlaO3oiXSu9lnLtonpIP6-FNaFUkvJegKltLQCMuZayrZ4jynYmtoAGUXAAlQ4ADqXrawbXCga5ahw4Um3jhykIgRVypNCq0A2rmSgSjMYHS+GKPDj5CaUKXlKNSAlGOIIzJtXxu+a+ModHvRYbYHglQgDCNhGIyyQAlmuAAg6yN0a6NUf5KdBTPIGO3UHCp50kpfClhZFG1FoBABJjTBQ1PHaj8ZSFh-g1CVBIzE5YCTzJAAO64ACr6G2abltR3G1CPNLvYyyBtj6Z1mfqB5tjOm4jMkC6Z0AdcLPjVplNdgoCVCnz5l6xzgAKhsAJ+1oA70eeNJLUBvnRwRfdMyO9QWeMtHi8gLUU1FndMmSIHptykFRyE+aKO1mQxR2S7zaQmylSLKpK02pkL6k6Kjj0sIogn6KBNBCMjiwKOef5DvVbfZGOeVFFHcL0oOPN32Nq6rfHQBTtm-N-kS39OrcK6aPBm21PMjug9PbLoyuHf2PpszNR9IXb6YDbZoBdn7O4CwP67EqSLPREKFgBBQcHKOUtYGtMyRanRB4Mk2gEdsD2ZoCH5NdErhg+h9I1tAANNb7MpZO6DWx6Yklk4rSPav2KRjVWqdVNsNSoLjMW3yrbTsyP1Mm5Oov2OG-TD6edi6MyZ9Av3BdoEkML+ooBXMNvrY2vVMvosK9i40ILKhAuzpC0ry4TPmigBy3l29N771Nqfbbqrr5mjm6kMycVS3WdKtVRz5b0uE1HeW6d93Ku-U3ejRLsXgeVDB5+7Fv71s+lAA
