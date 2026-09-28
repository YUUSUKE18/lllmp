import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const parts = line.split(',').map((s) => parseInt(s.trim(), 10)).filter((n): n is number => !isNaN(n));
  
  if (parts.length === 0) {
    console.log(`count=0 sum=0`);
    return;
  }

  const unique = [...new Set(parts)];
  let count = unique.length;
  let sum = 0n; // Use BigInt for safety, though spec says fits in 64-bit int.
  
  for (const num of unique) {
    if (!Number.isSafeInteger(num)) continue; 
    const bigNum = Number(BigInt(num));
    sum += BigInt(bigNum);
  }

  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {});
