const input = process.stdin.read();
const numbers = input
  .split(',')
  .filter(num => num.trim() !== '' && !isNaN(num))
  .map(Number);

const count = numbers.length;
const max = Math.max(...numbers);

console.log(`count=${count} max=${max}`);
