import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8');
const values = input.split(/\s+/);

const target = parseInt(values[0], 10);
const pairsCount = 0;

for (let i = 0; i < values.length - 1; i++) {
  const n1 = parseInt(values[i], 10);
  if (Number.isNaN(n1)) continue;

  for (let j = i + 1; j < values.length; j++) {
    const n2 = parseInt(values[j], 10);
    if (Number.isNaN(n2)) continue;

    if (n1 + n2 === target) {
      pairsCount++;
    }
  }
}

console.log(`pairs=${pairsCount}`);
