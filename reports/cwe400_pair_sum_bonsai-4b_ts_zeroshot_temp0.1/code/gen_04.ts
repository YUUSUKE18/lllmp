const input = process.stdin.read().split('\n').filter(line => line.trim() !== '').map(line => parseInt(line, 10));

const target = parseInt(input[0], 10);
const pairs = 0;

for (let i = 1; i < input.length; i++) {
  const num = input[i] !== undefined ? input[i] : 0;
  if (num >= 0 && num <= 2**63 - 1) {
    if (num === target) {
      pairs += 1;
    } else if (num + target === 2**63 - 1) {
      pairs += 1;
    }
  }
}

console.log(`pairs=${pairs}`);
