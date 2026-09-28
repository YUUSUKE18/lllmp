const input = process.stdin.read();
let count = 0;
let maxVal: bigint | null = null;

if (input) {
  const parts = input.split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    
    if (/^-?\d+$/.test(trimmed)) {
      const val = BigInt(trimmed);
      count++;
      if (maxVal === null || val > maxVal) {
        maxVal = val;
      }
    }
  }
}

const finalMax = maxVal ?? 0n;
console.log(`count=${count} max=${String(finalMax)}`);
