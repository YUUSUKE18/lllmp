import { Readable } from 'stream';

const input = process.stdin.readable();
const lines = [];

input.on('line', line => {
  if (line.trim() === '') return;
  lines.push(line.trim());
});

input.on('end', () => {
  let target = 0;
  let numbers = [];
  let validNumbers = 0;

  for (let line of lines) {
    const numStr = line;
    const num = parseInt(numStr, 10);
    if (isNaN(num)) continue;

    validNumbers++;
    numbers.push(num);

    if (validNumbers === 1) {
      target = num;
    } else if (validNumbers === 2) {
      target = numbers[0] + numbers[1];
    } else if (validNumbers > 2) {
      target = numbers[0] + numbers[1] + numbers[2];
    }
  }

  const pairs = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        pairs.push([i, j]);
      }
    }
  }

  const count = pairs.length;
  console.log(`pairs=${count}`);
});
