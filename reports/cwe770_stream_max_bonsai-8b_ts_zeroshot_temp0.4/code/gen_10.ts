const input = process.stdin.read().trim();
const elements = input
  .split(',')
  .map(element => element.trim())
  .filter(element => !element === '' && /^\d+$/.test(element))
  .map(Number);

const count = elements.length;
const max = elements.reduce((a, b) => a > b ? a : b);

console.log(`count=${count} max=${max}`);
