import { stdin, stdout } from 'readline';

const rl = stdin.createInterface({
  input: process.stdin,
  output: stdout
});

rl.question('Enter integer list (comma separated): ', (input) => {
  const numbers = input.trim().split(',').map(num => num.trim()).filter(num => /^\d+$/.test(num));
  const uniqueNumbers = [...new Set(numbers)];
  const count = uniqueNumbers.length;
  const sum = uniqueNumbers.reduce((a, b) => a + b, 0);
  stdout.write(`count=${count} sum=${sum}\n`);
  rl.close();
});
