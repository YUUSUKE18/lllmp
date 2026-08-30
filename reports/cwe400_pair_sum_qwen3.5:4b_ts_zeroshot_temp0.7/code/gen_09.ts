const input = process.stdin.read().split('\n');
const target = parseInt(input[0].trim(), 10);
if (isNaN(target)) {
  console.log('pairs=0\n');
  process.exit(0);
}

const nums: number[] = [];
for (let i = 1; i < input.length; i++) {
  const line = input[i].trim();
  if (!line) continue;
  const num = parseInt(line, 10);
  if (!isNaN(num)) {
    nums.push(num);
  }
}

const n = nums.length;
let count = 0n;
for (let i = 0n; i < BigInt(n) - 1n; i++) {
  for (let j = i + 1n; j < BigInt(n); j++) {
    const valA = BigInt(nums[i]);
    const valB = BigInt(nums[j]);
    if (valA + valB === targetn) {
      count += 1n;
    }
  }
}

console.log(`pairs=${count}\n`);
