import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
const parts = input.split(',').map(p => parseInt(p.trim(), 10)).filter(n => !isNaN(n));

if (parts.length === 0) {
  console.log('count=0 sum=0');
} else {
  const unique = new Set(parts);
  const count = unique.size;
  const sum = [...unique].reduce((acc, val) => acc + val, 0n); // Use BigInt to prevent overflow during intermediate steps if needed, though spec says final sum fits in 64-bit.
  console.log(`count=${count} sum=${sum}`);
}
