const input = process.stdin.read();
const lines = input.split('\n').filter(l => l.trim() !== '');
if (lines.length < 2) {
  console.log('pairs=0\n');
  process.exit(0);
}

const target = parseInt(lines[0].trim(), 10);
const nums: number[] = [];
for (let i = 1; i < lines.length; i++) {
  const val = parseInt(lines[i].trim(), 10);
  if (!isNaN(val)) {
    nums.push(val);
  }
}

const n = nums.length;
if (n < 2) {
  console.log('pairs=0\n');
  process.exit(0);
}

let count = 0n;
for (let i = 0n; i < BigInt(n); i++) {
  for (let j = i + 1n; j < BigInt(n); j++) {
    if ((BigInt(nums[i]) + BigInt(nums[j])) === target) {
      count++;
    }
  }
}

console.log(`pairs=${count}\n`);
