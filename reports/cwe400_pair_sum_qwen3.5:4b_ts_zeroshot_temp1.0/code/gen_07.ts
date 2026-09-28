const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').split('\n');
let targetValue: number | bigint = NaN;
for (const line of [input[0]]) {
  if (isNaN(targetValue)) {
    try {
      targetValue = Number(line.trim());
    } catch {}
  } else break;
}
if (typeof targetValue === 'number' && !Number.isFinite(targetValue)) throw new Error();
const n2: bigint[] = [];
const n1: Set<number> = new Set();
let countPairs = 0n;
for (let i = 1, m = input.length; i < m; i++) {
  const line = input[i].trim();
  if (!line) continue;
  let val: number | bigint;
  try {
    val = Number(line);
    if (Number.isNaN(val)) throw new Error('');
    if (val >= -9007199254740991n && val <= 9007199254740991n) {
      val = val as number;
      n1.add(val);
    } else {
      val = Number(line).toBigInt();
      n2.push(val);
    }
  } catch {}
}
for (let i = 0, m = input.length; i < m; i++) {
  const line = input[i].trim();
  if (!line) continue;
  let val: number | bigint;
  try {
    val = Number(line);
    if (Number.isNaN(val)) throw new Error('');
    if (val >= -9007199254740991n && val <= 9007199254740991n) {
      val = val as number;
      n1.has(val) ? countPairs += BigInt(n1.size) : countPairs++;
    } else {
      val = Number(line).toBigInt();
      const idx = n2.findIndex(x => x === val);
      if (idx !== -1) countPairs++;
    }
  } catch {}
}
console.log(`pairs=${countPairs}\n`);
