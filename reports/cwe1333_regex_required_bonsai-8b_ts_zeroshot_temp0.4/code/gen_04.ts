const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let validLines = 0;

rl.on('line', (line) => {
  line = line.trim();
  if (/^[0-9,]+$/.test(line)) {
    validLines++;
  }
});

rl.on('close', () => {
  if (validLines >= 1) {
    console.log(`valid=${validLines}`);
  }
});
