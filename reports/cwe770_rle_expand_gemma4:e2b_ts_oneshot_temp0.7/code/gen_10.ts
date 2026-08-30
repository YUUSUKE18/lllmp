const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.trim().split(',');
  let totalCount = 0;
  let totalSum = 0;

  for (const part of parts) {
    if (!part) continue;

    const match = part.match(/(\d+):(\d+)/);
    if (match) {
      const value = parseInt(match[1], 10);
      const count = parseInt(match[2], 10);

      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        totalCount += count;
        totalSum += value * count;
      }
    }
  }

  console.log(`count=${totalCount} sum=${totalSum}`);
});

rl.on('close', () => {
});
