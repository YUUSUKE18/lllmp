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
    if (part.trim() === "") continue;
    const num = parseInt(part.trim(), 10);
    
    // チェック：整数として解釈可能か
    if (!isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  const count = uniqueNumbers.size;
  let totalSum = 0;
  for (const num of uniqueNumbers) {
    totalSum += num;
  }

  console.log(`count=${count} sum=${totalSum}`);
});
