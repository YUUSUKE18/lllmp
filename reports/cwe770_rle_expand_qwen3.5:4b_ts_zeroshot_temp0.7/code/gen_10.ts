const input = process.stdin.read().trim();
if (!input) {
  console.log('count=0 sum=0\n');
  process.exit(0);
}

const parts = input.split(',').filter((p) => p.trim() !== '');
let count = 0;
let sum = BigInt(0);

for (const part of parts) {
  const match = /^(\d+):(\d+)\s*$/.exec(part);
  if (!match) continue;
  
  const val = Number(match[1]);
  const reps = Number(match[2]);
  
  if (isNaN(val) || isNaN(reps) || reps < 0) continue;
  
  count += reps;
  sum += BigInt(val) * BigInt(reps);
}

console.log(`count=${count} sum=${sum}\n`);
