const input = process.stdin.read().split('\n').filter(line => line.trim() !== '');
const target = parseInt(input[0]);
const numbers = input.slice(1).map(line => parseInt(line.trim()));

const pairs = numbers.filter((num, index) => {
  const found = numbers.filter((n, i) => i !== index && n + num === target);
  return found.length > 0;
}).length;

console.log(`pairs=${pairs}`);
