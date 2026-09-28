const input = process.stdin.read().trim();
const elements = input.split(',').map(e => e.trim()).filter(e => !e.length && typeof e === 'number' && !isNaN(e) && e.toString() === e.toString());

const count = elements.length;
const max = elements.reduce((a, b) => a > b ? a : b);

console.log(`count=${count} max=${max}`);
