import { stdin, process } from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let validLines = 0;

rl.on('line', (line) => {
  line = line.trim();
  if (!line) return;

  if (/^\d+,\d+$/.test(line)) {
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
