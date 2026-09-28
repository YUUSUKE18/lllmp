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

  const targetLine = lines[0];
  const target = parseInt(targetLine, 10);
  let numbers: number[] = [];

  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i], 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  const n = numbers.length;
  let count = 0;

  if (n >= 2) {
    // 2つの組の総数を数える
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (numbers[i] + numbers[j] === target) {
          count++;
        }
      }
    }
  }

  console.log(`pairs=${count}`);
});
