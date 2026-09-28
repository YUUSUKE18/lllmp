const input = process.stdin.read();
const elements = input
  .split(',')
  .map(e => e.trim())
  .filter(e => /^\d+$/.test(e))
  .map(Number);

const count = elements.length;
const max = Math.max(...elements);

console.log(`count=${count} max=${max}`);
