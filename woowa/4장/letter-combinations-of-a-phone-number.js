/**
 * 
 * 17. Letter Combinations of a Phone Number
 * - https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 * - keywords: 백트래킹(재귀), 큐, 해시맵
 */

function letterCombinations(digits) {
  if (!digits) return [];

  // 숫자-문자 매핑을 Map()로 구성함으로써
  // 입력된 [키, 값]의 순서를 유지하고, 
  // 숫자형 문자열 키('2', '3' 등)를 문자열로 강제 변환하지 않습니다.
  const digitToLetters = new Map([
    ['2', 'abc'],
    ['3', 'def'],
    ['4', 'ghi'],
    ['5', 'jkl'],
    ['6', 'mno'],
    ['7', 'pqrs'],
    ['8', 'tuv'],
    ['9', 'wxyz']
  ]);

  const result = [];
  
  const backtrack = (index, path) => {
    if (index === digits.length) {
      result.push(path);
      return;
    }
    
    for (const letter of digitToLetters.get(digits[index])) {
      backtrack(index + 1, path + letter);
    }
  };

  backtrack(0, '');
  return result;
}

// 테스트
console.log(letterCombinations("23"));
