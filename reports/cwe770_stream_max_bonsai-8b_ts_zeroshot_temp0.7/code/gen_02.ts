const input = process.stdin.read().trim();
const elements = input
  .split(',')
  .map(e => e.trim())
  .filter(e => /^\d+$/.test(e))
  .map(Number);

const count = elements.length;
const max = elements
  .map(n => n)
  .reduce((a, b) => a > b ? a : b);

console.log(`count=${count} max=${max}`);
