const lines = process.stdin.read().trim().split('\n');

const target = parseInt(lines[0], 10);
const numbers = lines.slice(1).map(Number);

let count = 0;

for (let i = 0; i < numbers.length - 1; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
