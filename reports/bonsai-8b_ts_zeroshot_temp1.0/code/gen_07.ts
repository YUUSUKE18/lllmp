const numbers = process.stdin.read().split(',');
const validNumbers = numbers
  .filter(num => num.trim() !== '' && /^\d+$/.test(num))
  .map(Number);

const uniqueNumbers = [...new Set(validNumbers)];
const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((a, b) => a + b, 0);

console.log(`count=${count} sum=${sum}`);
