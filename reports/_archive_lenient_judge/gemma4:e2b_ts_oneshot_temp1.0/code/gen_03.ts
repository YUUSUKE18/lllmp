const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split(',');
  let uniqueNumbers = new Set<number>();
  let sum = 0;

  for (const part of parts) {
    if (part.trim() === '') continue;
    const num = parseInt(part, 10);
    
    // 整数として解釈できるかチェック
    if (!isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  const count = uniqueNumbers.size;
  let currentSum = 0;
  for (const num of uniqueNumbers) {
    currentSum += num;
  }

  console.log(`count=${count} sum=${currentSum}`);
});
