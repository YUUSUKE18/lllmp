const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
  return;
}

// Remove all whitespace to handle "whitespace ignored" robustly
// This includes spaces, tabs, newlines.
const cleanInput = input.replace(/\s/g, '');
const parts = cleanInput.split(',');
let count = BigInt(0);
let sum = BigInt(0);

for (const part of parts) {
  if (!part) continue;
  // Match value:count format. Value can be negative (-?), Count must be non-negative digits.
  const match = part.match(/^(-?\d+):\d+$/);
  if (match) {
    const val = BigInt(match[1]);
    const cnt = BigInt(match[2]);
    sum += val * cnt;
    count += cnt;
  }
}

console.log(`count=${count} sum=${sum}`);
