const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let input = '';

rl.on('line', (line) => {
  input += line + '\n';
});

rl.on('close', () => {
  const parts = input.trim().split(',');
  const uniqueNumbers = new Set<number>();
  let sum = 0;

  for (const part of parts) {
    if (part === '') continue;
    const num = parseInt(part.trim(), 10);
    if (!isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  const count = uniqueNumbers.size;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  console.log(`count=${count} sum=${sum}`);
});
