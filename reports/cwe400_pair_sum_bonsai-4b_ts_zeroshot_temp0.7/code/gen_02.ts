const input = process.stdin.read().split('\n').filter(line => line.trim() !== '');
const target = parseInt(input[0]);
const pairs = input.slice(1).filter((line) => {
  const num = parseInt(line.trim());
  if (isNaN(num)) return false;
  return num >= 0 && num <= 2**63 - 1;
}).reduce((count, num) => {
  if (num >= 0 && num <= 2**63 - 1) {
    const diff = Math.abs(num - target);
    if (diff <= 2**63) {
      return count + (diff === 0 || diff === 2**63 ? 1 : 0);
    }
  }
  return count;
}, 0);
console.log(`pairs=${pairs}`);
