
function removeStars(s: string): string {
  const result: string[] = [];
  const splits = s.split('');

  for (let i = 0; i < splits.length; i++) {
    if (splits[i] === '*') {
      result.pop();
    } else {
      result.push(splits[i]);
    }
  }
  return result.join('');
}
