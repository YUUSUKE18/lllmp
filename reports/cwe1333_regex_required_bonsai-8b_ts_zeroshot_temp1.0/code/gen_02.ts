const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let validLines = 0;

rl.question('Enter line(s) (press Enter to finish):', (input) => {
  const lines = input.trim().split('\n');
  for (const line of lines) {
    const strippedLine = line.trim();
    if (/^\d+,\d+$/.test(strippedLine)) {
      validLines++;
    }
  }
  rl.close();
  process.stdout.write(`valid=${validLines}\n`);
});
