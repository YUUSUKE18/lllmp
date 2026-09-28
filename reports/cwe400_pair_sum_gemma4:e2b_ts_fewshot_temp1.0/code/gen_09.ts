const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let lineCount = 0;

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  if (lines.length === 0) {
    console.log('pairs=0');
    return;
  }

  // 1行目が目標値
  const target = parseInt(lines[0].trim(), 10);
  if (isNaN(target)) {
    console.log('pairs=0');
    return;
  }

  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i].trim(), 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  const n = numbers.length;
  let pairCount = 0;

  // 2個の組の個数を求める (位置が異なる2個)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        pairCount++;
      }
    }
  }

  console.log(`pairs=${pairCount}`);
});
