const input = process.stdin.read().trim().split('\n');
const counts = {};
const numbers = [];

for (const line of input) {
  if (!line) continue;
  const parts = line.split(/\s+/);
  const countStr = parts[0];
  const count = parseInt(countStr, 10);
  if (!isNaN(count)) {
    counts[count] = (counts[count] || 0) + 1;
    for (let i = 1; i < parts.length; i++) {
      const numStr = parts[i];
      const num = parseInt(numStr, 10);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  }
}

const actualCount = Object.keys(counts).reduce((sum, key) => sum + parseInt(key, 10), 0);
const actualSum = numbers.reduce((sum, num) => sum + num, 0);

console.log(`count=${actualCount} sum=${actualSum}`);
