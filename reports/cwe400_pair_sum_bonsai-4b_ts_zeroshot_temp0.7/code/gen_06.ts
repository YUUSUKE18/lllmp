const input = process.stdin.read().split('\n').filter(line => line.trim() !== '');
const target = parseInt(input[0], 10);
const numbers = input.slice(1).map(line => parseInt(line, 10));

const pairs = numbers.reduce((count, num) => {
  if (target === 0) return 0;
  const found = num >= 0 ? num >= target : -num >= -target;
  if (found === true) {
    const index = numbers.findIndex(n => n === found);
    if (index > -1) {
      return count + 1;
    }
  }
  return count;
}, 0);

console.log(`pairs=${pairs}`);
