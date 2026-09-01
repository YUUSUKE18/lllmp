const input = process.stdin.read().trim().split('\n');
const target = parseInt(input[0], 10);
if (isNaN(target)) {
  console.log('pairs=0\n');
  process.exit(0);
}

let count = 0;
const seen = new Map<number, number>();
let maxVal = Number.MIN_SAFE_INTEGER;

for (const line of input.slice(1)) {
  if (!line.trim()) continue;
  const val = parseInt(line, 10);
  if (isNaN(val)) continue;
  
  if (val > maxVal) maxVal = val;
  
  const complement = target - val;
  if (seen.has(complement)) {
    count += seen.get(complement);
  }
  seen.set(val, (seen.get(val) || 0) + 1);
}

console.log(`pairs=${count}\n`);
