const input = process.stdin.read();
const lines = input.trim().split('\n').filter(line => !line.trim());
const target = parseInt(lines[0]);
const numbers = lines.slice(1).map(line => parseInt(line.trim()));

const pairs = numbers.filter(num => num >= 0 && num <= target).length;

console.log(`pairs=${pairs}`);
