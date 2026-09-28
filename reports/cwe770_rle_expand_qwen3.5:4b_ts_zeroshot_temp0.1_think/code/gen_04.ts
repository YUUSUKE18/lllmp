const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
  return;
}

// Replace newlines with commas to handle multi-line inputs robustly
const text = input.replace(/\n/g, ',');

let count = 0n;
let sum = 0n;

const parts = text.split(',');
for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed) continue;

  // Check for colon
  const colonIndex = trimmed.indexOf(':');
  if (colonIndex === -1) continue;

  const valStr = trimmed.slice(0, colonIndex).trim();
  const cntStr = trimmed.slice(colonIndex + 1).trim();

  // Validate integers
  if (!/^-?\d+$/.test(valStr) || !/^-?\d+$/.test(cntStr)) {
    continue;
  }

  const val = BigInt(valStr);
  const cnt = BigInt(cntStr);

  if (cnt < 0n) continue;

  count += cnt;
  sum += val * cnt;
}

console.log(`count=${count} sum=${sum}`);
