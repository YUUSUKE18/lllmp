import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const parts = line.split(',').map((p) => p.trim()).filter((p) => p.length > 0);
  let totalCount = 0n;
  let totalCountSum = 0n;

  for (const part of parts) {
    const colonIndex = part.indexOf(':');
    if (colonIndex === -1 || colonIndex !== part.lastIndexOf(':')) continue;

    const valPart = part.slice(0, colonIndex).trim();
    const countPart = part.slice(colonIndex + 1).trim();

    const val = BigInt(valPart);
    const cnt = BigInt(countPart);

    if (val < 0n || cnt < 0n) continue;

    totalSum += val * cnt;
    totalCount += cnt;
  }

  console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
});
