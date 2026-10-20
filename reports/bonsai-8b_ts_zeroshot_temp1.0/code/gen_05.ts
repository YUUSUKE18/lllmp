const numbers = process.stdin.read().split(',');
const validNumbers = numbers
  .map(n => n.trim())
  .filter(n => !isNaN(n))
  .map(n => parseInt(n, 10));

const uniqueNumbers = [...new Set(validNumbers)];
const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

console.log(`count=${count} sum=${sum}`);
