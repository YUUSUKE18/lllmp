const input = process.stdin.read();
const numbers = input
  .split(',')
  .map(num => num.trim())
  .filter(num => !isNaN(Number(num)))
  .filter(num => Number(num) !== 0)
  .map(num => Number(num));

const uniqueNumbers = [...new Set(numbers)];
const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((a, b) => a + b, 0);

console.log(`count=${count} sum=${sum}`);
