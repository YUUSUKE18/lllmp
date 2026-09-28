const stdin = process.stdin;
const input = stdin.read().trim();

const numbers = input
  .split(',')
  .map(num => num.trim())
  .filter(num => !isNaN(num) && num.length > 0)
  .map(Number);

const count = numbers.length;
const max = Math.max(...numbers);

console.log(`count=${count} max=${max}`);
