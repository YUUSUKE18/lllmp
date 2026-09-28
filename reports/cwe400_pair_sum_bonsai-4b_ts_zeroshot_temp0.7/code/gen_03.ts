const input = process.stdin.read().split('\n');
const target = parseInt(input[0].trim());
const numbers = input
  .filter(line => line.trim() !== '')
  .map(line => parseInt(line.trim(), 10));

const pairs = numbers.filter((num, index) => {
  const found = numbers.filter((n, i) => i !== index && num + n === target);
  return found.length > 0;
});

console.log(`pairs=${pairs.length}`);
