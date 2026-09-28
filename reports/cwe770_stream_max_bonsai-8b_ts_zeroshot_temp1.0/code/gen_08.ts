const input = process.stdin.read().trim();
const elements = input.split(',').filter(e => !e.trim() && /^\d+$/.test(e)).map(Number);

const count = elements.length;
const max = elements.reduce((a, b) => a > b ? a : b, -Infinity);

console.log(`count=${count} max=${max}`);
