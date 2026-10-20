const input = process.stdin.read().trim();
const numbers = input
  .split(',')
  .map(str => str.trim())
  .filter(str => !isNaN(str))
  .map(Number);

const uniqueNumbers = [...new Set(numbers)];
const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

console.log(`count=${count} sum=${sum}`);
