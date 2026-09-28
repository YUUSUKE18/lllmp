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
    process.stdout.write('pairs=0\n');
    return;
  }

  const targetLine = lines[0];
  const target = parseInt(targetLine);

  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i]);
    if (!isNaN(num)) {
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
