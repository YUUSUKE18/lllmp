const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
  return;
}

const parts = input.split(',');
let totalSum: bigint = 0n;
let totalCount: bigint = 0n;

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed) continue;

  // Match value:count format. 
  // Value can be integer (possibly negative), Count must be non-negative integer.
  // Regex ensures strict format and non-negative count.
  const match = trimmed.match(/^(-?\d+):(\d+)$/);
  if (!match) continue;

  const val = BigInt(match[1]);
  const count = BigInt(match[2]);

  totalCount += count;
  totalSum += val * count;
}

console.log(`count=${totalCount} sum=${totalSum}`);
