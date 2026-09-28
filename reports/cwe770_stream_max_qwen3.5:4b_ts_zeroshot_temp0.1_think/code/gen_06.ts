const input = process.stdin.read();
if (!input) {
  console.log('count=0 max=0');
  return;
}

let count = 0;
let maxVal: bigint = 0n;
let hasValue = false;

const parts = input.split(',');

for (const part of parts) {
  const trimmed = part.trim();
  if (/^[+-]?\d+$/.test(trimmed)) {
    const num = BigInt(trimmed);
    count++;
    if (!hasValue || num > maxVal) {
      maxVal = num;
      hasValue = true;
    }
  }
}

if (!hasValue) {
  maxVal = 0n; 
}

console.log(`count=${count} max=${maxVal.toString()}`);
