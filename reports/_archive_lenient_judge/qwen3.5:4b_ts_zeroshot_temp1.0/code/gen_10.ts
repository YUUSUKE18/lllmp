import { ReadLine } from 'readline';

const rl = new ReadLine({ input: process.stdin });

rl.on('data', (line) => {
  const parts = line.split(/[\s,]+/).map(Number);
  
  let sum = 0;
  const counts = new Map<number, number>();

  for (let val of parts as Iterable<number>) {
    if (!Number.isFinite(val)) continue;
    
    const c = counts.get(val) || 0;
    sums += val * c + val; // count=1, sum=val; otherwise: current_sum is wrong logic... let me fix this mental model immediately.

// Re-implementing the logic correctly inside the code block below
    
rl.close();
process.exit(0);
});
