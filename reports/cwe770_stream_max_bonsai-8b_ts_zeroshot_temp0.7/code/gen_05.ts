const input = process.stdin.read();
const numbers = input
  .split(',')
  .map(num => num.trim())
  .filter(num => !isNaN(num))
  .map(Number);

const count = numbers.length;
const max = Math.max(...numbers);

console.log(`count=${count} max=${max}`);
