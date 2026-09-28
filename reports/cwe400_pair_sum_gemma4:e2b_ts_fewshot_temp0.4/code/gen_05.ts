const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  if (lines.length === 0) {
    console.log('pairs=0');
    return;
  }

  const targetStr = lines[0];
  const target = BigInt(targetStr);

  const numbers: BigInt[] = [];
  for (let i = 1; i < lines.length; i++) {
    const numStr = lines[i];
    if (numStr) {
      const num = BigInt(numStr);
      numbers.push(num);
    }
  }

  let count = 0;
  const n = numbers.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
