const numbers = process.stdin.read().split(/\n/).filter(n => /^\d+$/.test(n)).map(Number);
const target = numbers[0];

const pairs = [];

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      pairs.push([i, j]);
    }
  }
}

console.log(`pairs=${pairs.length}`);
