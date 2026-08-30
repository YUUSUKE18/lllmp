const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  if (lines.length === 0) {
    console.log('pairs=0');
    return;
  }

  const targetStr = lines[0].trim();
  const target = BigInt(targetStr);
  const numbers: bigint[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const num = BigInt(line);
    numbers.push(num);
  }

  let count = 0n;

  // 2個の組の数を数える
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];
      if (sum === target) {
        count += 1n;
      }
    }
  }

  console.log(`pairs=${count.toString()}`);
});
