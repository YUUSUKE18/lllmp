const input = process.stdin.read();
let text: string;

if (typeof input === 'string') {
  text = input.trim();
} else if (input !== null) {
  text = input.toString().trim();
} else {
  console.log('count=0 sum=0');
  return;
}

if (!text) {
  console.log('count=0 sum=0');
  return;
}

const parts = text.split(',');
let count = 0n;
let sum = 0n;

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed) continue;

  const colonIndex = trimmed.indexOf(':');
  if (colonIndex === -1) continue;

  const valStr = trimmed.slice(0, colonIndex).trim();
  const cntStr = trimmed.slice(colonIndex + 1).trim();

  // Validate value is integer (allow negative)
  if (!/^-?\d+$/.test(valStr)) continue;
  // Validate count is non-negative integer
  if (!/^\d+$/.test(cntStr)) continue;

  const val = BigInt(valStr);
  const cnt = BigInt(cntStr);

  count += cnt;
  sum += val * cnt;
}

console.log(`count=${count} sum=${sum}`);
