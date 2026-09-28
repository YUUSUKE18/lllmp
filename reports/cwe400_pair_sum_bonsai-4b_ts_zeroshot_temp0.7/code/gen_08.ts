const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let targetValue: number = parseInt(process.stdin.readline().trim());
let numbers: number[] = [];

rl.on('line', (line) => {
  const num = parseInt(line.trim());
  if (!isNaN(num)) {
    numbers.push(num);
  }
});

rl.on('close', () => {
  if (numbers.length >= 2) {
    const pairs = numbers.filter((a, i) => a + b === targetValue).length;
    const validPairs = [];
    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === targetValue) {
          validPairs.push([numbers[i], numbers[j]]);
        }
      }
    }
    const pairCount = validPairs.length;
    console.log(`pairs=${pairCount}`);
  }
});
rl.start();
