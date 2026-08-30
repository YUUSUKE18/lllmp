import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const parts = line.split(',').map((s) => parseInt(s.trim(), 10));
  
  if (!parts || !Array.isArray(parts)) return;

  // Filter out non-integer values and empty strings, then count unique integers
  let sum: bigint | number = BigInt(0);
  const seen = new Set<number>();

  for (const val of parts) {
    if (isNaN(val)) continue;
    
    const num = Number(val);
    // Check if we've already counted this integer to avoid double counting in the "unique" set logic, 
    // but since sum is requested based on unique integers only once per distinct value:
    if (!seen.has(num)) {
      seen.add(num);
      sum += BigInt(num);
    }
  }

  const count = seen.size;
  
  console.log(`count=${count} sum=${Number(sum)}`);
});
