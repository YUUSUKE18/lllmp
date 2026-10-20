const input = process.stdin.read().trim();
const numbers = input
  .split(',')
  .map(n => n.trim())
  .filter(n => /^\d+$/.test(n))
  .map(n => parseInt(n, 10))
  .Set()
  .map(n => n);
const count = numbers.length;
const sum = numbers.reduce((a, b) => a + b, 0);
console.log(`count=${count} sum=${sum}`);
