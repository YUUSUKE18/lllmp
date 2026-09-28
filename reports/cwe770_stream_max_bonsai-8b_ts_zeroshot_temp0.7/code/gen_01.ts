const input = process.stdin.read();
const nums = input
  .split(',')
  .map(x => x.trim())
  .filter(x => x !== '')
  .map(x => parseInt(x, 10))
  .filter(x => x !== undefined && x !== null);

const count = nums.length;
const max = Math.max(...nums);

console.log(`count=${count} max=${max}`);
