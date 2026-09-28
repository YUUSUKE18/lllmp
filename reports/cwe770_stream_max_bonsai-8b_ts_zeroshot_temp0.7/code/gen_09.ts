const input = process.stdin.read().trim();
const elements = input.split(',').map(e => e.trim()).filter(e => e !== '' && !isNaN(parseInt(e, 10)));

const count = elements.length;
const max = elements.reduce((a, b) => a > b ? a : b, -Infinity);

console.log(`count=${count} max=${max}`);
