const input = process.stdin.read().split('\n').filter(line => line.trim() !== '');
const target = parseInt(input[0], 10);
const numbers = input.slice(1).map(line => parseInt(line, 10));

let pairCount = 0;
for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      pairCount++;
    }
  }
}

console.log(`pairs=${pairCount}`);
