import { stdin, process } from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', line => {
  const trimmedLine = line.trim();
  const regex = /^(\d+)(?:,\d+)*$/;
  
  if (regex.test(trimmedLine)) {
    const validLines = trimmedLine.split(',').filter(Boolean);
    const validCount = validLines.length;
    
    if (validCount > 0) {
      console.log(`valid=${validCount}`);
    }
  }
});
