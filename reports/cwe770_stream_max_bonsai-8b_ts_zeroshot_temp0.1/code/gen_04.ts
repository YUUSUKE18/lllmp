const input = process.stdin.read().trim();
const elements = input.split(',').filter(e => e.trim() !== '').map(e => parseInt(e, 10));
const count = elements.length;
const max = elements.reduce((a, b) => a > b ? a : b);
console.log(`count=${count} max=${max}`);
