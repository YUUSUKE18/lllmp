import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const parts = line.trim().split(',').map((part) => parseInt(part.trim(), 10));
  const seenNumbers = new Set<number>();
  let sum = BigInt(0); // Use BigInt to ensure no overflow during accumulation before casting, though spec says final result fits in 64-bit.

  for (const num of parts) {
    if (!Number.isNaN(num)) {
      seenNumbers.add(num);
      sum += BigInt(num);
    }
  }

  const count = seenNumbers.size;
  // Cast back to number as the problem guarantees the final sum fits in a 64-bit integer range.
  console.log(`count=${Number(count)} sum=${Number(sum)}`);
});
