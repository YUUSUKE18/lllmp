import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8').trim().split(/\s*,\s*|\s+/).map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));

if (input.length === 0) {
  console.log('count=0 sum=0');
} else {
  const map = new Map<number, number>();
  for (const n of input) {
    if (map.has(n)) {
      map.set(n, map.get(n) + 1);
    } else {
      map.set(n, 1);
    }
  }
  let count = 0;
  let sum = 0;
  for (const [num, val] of map.entries()) {
    count += val;
    sum += num * val;
  }
  console.log(`count=${count} sum=${sum}`);
}
