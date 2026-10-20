const input = process.stdin.read().trim();
const numbers = input
  .split(',')
  .filter(num => num.trim() !== '' && !isNaN(num))
  .map(Number);

const uniqueNumbers = [...new Set(numbers)];
const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

console.log(`count=${count} sum=${sum}`);
