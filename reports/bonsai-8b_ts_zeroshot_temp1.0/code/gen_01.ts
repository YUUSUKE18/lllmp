const input = process.stdin.read();
const numbers = input
  .split(',')
  .map(num => num.trim())
  .filter(num => /^\d+$/.test(num))
  .map(Number);

const uniqueNumbers = [...new Set(numbers)];
const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((a, b) => a + b, 0);

console.log(`count=${count} sum=${sum}`);
