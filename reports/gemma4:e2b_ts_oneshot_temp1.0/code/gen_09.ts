const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split(',').map(s => s.trim());
  let uniqueNumbers = new Set<number>();
  for (const part of parts) {
    if (part === "") continue;
    const num = parseInt(part, 10);
    if (!isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  const count = uniqueNumbers.size;
  let sum = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
});
