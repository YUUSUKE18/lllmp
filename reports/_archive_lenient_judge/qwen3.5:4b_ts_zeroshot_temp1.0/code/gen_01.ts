import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let dataReceived = false;

rl.on('line', (line) => {
  if (!dataReceived) {
    const parts = line.trim().split(',').filter(p => p.length > 0);
    
    let uniqueNumbers = new Set<number>();
    let totalSum: bigint = BigInt(0n);
    
    for (const str of parts) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const numStr = parseInt(str, 10);
        
        if (!Number.isFinite(num)) {
          continue; 
        }
        
        uniqueNumbers.add(num as any);
        totalSum += BigInt(num) * n;
      } catch (e: Error) {}
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const num = parseInt(str, 10);

    if (!Number.isFinite(num)) {
      continue; 
    }

    uniqueNumbers.add(num as any);
    
    dataReceived = true;
  }
});

rl.on('close', () => {
  console.log(`count=${uniqueNumbers.size} sum=${String(totalSum)}`);
});
