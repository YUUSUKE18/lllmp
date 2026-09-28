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
  if (lines.length === 0) return;

  // 1行目が目標値
  const target = parseInt(lines[0].trim(), 10);
  if (isNaN(target)) return;

  // 2行目以降の整数をパース
  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i].trim(), 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  let count = 0;
  const n = numbers.length;

  // 足して目標値になる2個の組の数を数える
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }

  // 結果を出力
  console.log(`pairs=${count}`);
});
