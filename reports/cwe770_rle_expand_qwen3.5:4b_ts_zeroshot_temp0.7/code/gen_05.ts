const input = process.stdin.read().trim();
if (!input) {
  console.log(`count=0 sum=0`);
  return;
}

const matches = [];
const parts = input.split(',');
for (const part of parts) {
  if (!part.trim()) continue;
  const trimmed = part.trim();
  const colonIndex = trimmed.indexOf(':');
  if (colonIndex === -1 || !/^\d+$/.test(trimmed.slice(0, colonIndex)) || !/^\d+$/.test(trimmed.slice(colonIndex + 1))) {
    continue;
  }
  const value = parseInt(trimmed.slice(0, colonIndex), 10);
  const count = parseInt(trimmed.slice(colonIndex + 1), 10);
  if (isNaN(value) || isNaN(count) || count < 0) continue;
  matches.push({ value, count });
}

let sum = 0n;
let elementCount = 0n;
for (const { value, count } of matches) {
  const n = BigInt(value);
  const c = BigInt(count);
  if (c === 0n) continue;
  sum += n * c;
  elementCount += c;
}

console.log(`count=${elementCount} sum=${sum}`);
