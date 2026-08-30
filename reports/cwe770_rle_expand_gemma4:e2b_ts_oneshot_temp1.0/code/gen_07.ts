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
  let totalCount = 0;
  let totalSum = 0;

  for (const part of parts) {
    if (!part) continue;
    const [valueStr, countStr] = part.split(':');

    if (valueStr && countStr) {
      const value = parseInt(valueStr, 10);
      const count = parseInt(countStr, 10);

      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        totalCount += count;
        totalSum += value * count;
      }
    }
  }

  console.log(`count=${totalCount} sum=${totalSum}`);
});
