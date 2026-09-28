const input = process.stdin.read().split('\n').filter(line => line.trim() !== '');
const target = parseInt(input[0], 10);
const numbers = input.slice(1).map(line => parseInt(line, 10));

const pairs = numbers.filter((num, index) => {
  const found = numbers.filter((n, i) => i !== index && n + num === target);
  return found.length > 0;
});

console.log(`pairs=${pairs.length}`);
