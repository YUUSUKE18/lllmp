const input = process.stdin.read().trim();
const elements = input.split(',').filter(e => e.trim() && parseInt(e.trim(), 10) !== undefined);
const count = elements.length;
const max = elements.reduce((a, b) => Math.max(a, b), -Infinity);
console.log(`count=${count} max=${max}`);
