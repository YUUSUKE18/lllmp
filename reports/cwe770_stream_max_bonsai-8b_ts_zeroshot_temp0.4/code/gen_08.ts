const input = process.stdin.read().trim();
const elements = input.split(',').map(e => e.trim()).filter(e => !e.length && /^\d+$/.test(e));
const count = elements.length;
const max = elements.reduce((a, b) => a > b ? a : b, Number('-Infinity'));
console.log(`count=${count} max=${max}`);
