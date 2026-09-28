const input = process.stdin.read();
if (!input) {
  console.log('count=0 max=0');
  return;
}

const parts = input.split(',');
let count = 0;
let maxVal: bigint | undefined = undefined;

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed) continue;

  // Check if it's a valid integer (including optional +/- sign)
  if (/^[+-]?\d+$/.test(trimmed)) {
    const num = BigInt(trimmed);
    count++;
    if (maxVal === undefined || num > maxVal) {
      maxVal = num;
    }
  }
}

const finalMax = maxVal ?? BigInt(0);
console.log(`count=${count} max=${finalMax.toString()}`);
