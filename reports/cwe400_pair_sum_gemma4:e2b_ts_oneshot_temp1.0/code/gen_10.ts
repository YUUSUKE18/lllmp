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

  const target = parseInt(lines[0].trim(), 10);
  const numbers: number[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  let pairCount = 0;
  const n = numbers.length;

  if (n >= 2) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (numbers[i] + numbers[j] === target) {
          pairCount++;
        }
      }
    }
  }

  console.log(`pairs=${pairCount}`);
});
