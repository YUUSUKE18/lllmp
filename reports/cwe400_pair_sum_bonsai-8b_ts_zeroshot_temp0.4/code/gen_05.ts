import { stdin, stdout } from 'readline';

const rl = stdin.createInterface({
  input: process.stdin,
  output: stdout
});

rl.on('line', line => {
  const numbers = line
    .split(/\s+/)
    .filter(num => /^\d+$/.test(num))
    .map(Number);

  const total = numbers.reduce((a, b) => a + b, 0);
  const count = 0;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === total) {
        count++;
      }
    }
  }

  rl.close();
  stdout.write(`pairs=${count}\n`);
});
