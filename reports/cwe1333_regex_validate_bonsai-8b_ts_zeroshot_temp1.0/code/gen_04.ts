const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let validLines = 0;

rl.on('line', line => {
  const trimmedLine = line.trim();
  const parts = trimmedLine.split(',');
  
  if (parts.length === 0) return;
  
  const allDigits = parts.every(part => /^\d+$/.test(part));
  
  if (allDigits) {
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
