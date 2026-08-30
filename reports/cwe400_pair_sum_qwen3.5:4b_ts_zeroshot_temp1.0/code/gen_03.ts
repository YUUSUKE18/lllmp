import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const lines = line.split('\n');
  if (lines.length < 2 || lines[0].trim() === '' || lines[1].trim() === '') return;

  let target: number | undefined;
  let nums: number[] = [];

  for (const l of lines) {
    if (!l.trim()) continue;
    const parts = l.split(/\s+/);
    if (parts.length < 2 || !target && parts[0] !== 'target') return;
    
    if (target === undefined) {
      target = parseInt(parts[0], 10);
      if (isNaN(target)) return;
    } else {
      for (const p of parts.slice(1)) {
        const num = parseInt(p, 10);
        if (!isNaN(num)) {
          nums.push(num);
        }
      }
    }
  }

  // If the first line was target and there's at least one integer
  if (target === undefined) return;

  let count = 0n;
  
  const bigNums = [];
  for (const n of nums) {
    bigNums.push(BigInt(n));
  }

  for (let i = 0; i < bigNums.length; i++) {
    for (let j = i + 1; j < bigNums.length; j++) {
      if (bigNums[i] + bigNums[j] === BigInt(target)) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});

rl.close();
