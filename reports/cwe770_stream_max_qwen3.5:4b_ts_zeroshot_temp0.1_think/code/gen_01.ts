const input = process.stdin.read();
if (!input) {
  console.log('count=0 max=0');
  return;
}

const parts = input.split(',').map(s => s.trim());

let count = 0;
let maxVal: bigint | undefined = undefined;

for (const part of parts) {
  if (!part) continue;
  
  if (/^[+-]?\d+$/.test(part)) {
    const num = BigInt(part);
    count++;
    if (maxVal === undefined || num > maxVal) {
      maxVal = num;
    }
  }
}

const maxStr = maxVal === undefined ? '0' : maxVal.toString();

console.log(`count=${count} max=${maxStr}`);
