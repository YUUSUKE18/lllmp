const input = process.stdin.read().trim();
if (!input) {
  console.log('count=0 sum=0\n');
  process.exit(0);
}

const parts = input.split(',').map(s => s.trim()).filter(Boolean);
let count = 0n;
let sum = 0n;

for (const p of parts) {
  const colonIndex = p.indexOf(':');
  if (colonIndex === -1) continue;

  const valueStr = p.substring(0, colonIndex).trim();
  const repeatCountStr = p.substring(colonIndex + 1).trim();

  const value = BigInt(parseInt(valueStr, 10));
  const repeatCount = Number(repeatCountStr);

  if (isNaN(repeatCount) || repeatCount < 0) continue;

  count += repeatCountn;
  sum += value * BigInt(repeatCount);
}

console.log(`count=${count.toString()} sum=${sum.toString()}\n`);
