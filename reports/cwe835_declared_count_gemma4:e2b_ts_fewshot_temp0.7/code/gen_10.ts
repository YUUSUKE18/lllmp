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
  let count = 0;
  let sum = 0;

  for (const line of lines) {
    if (line === "") continue;
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
      count++;
      sum += num;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
