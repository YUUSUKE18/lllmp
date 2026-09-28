const input = process.stdin.read().split('\n');
const target = parseInt(input[0].trim(), 10);
const nums: number[] = [];
for (let i = 1; i < input.length; i++) {
  const line = input[i].trim();
  if (line === '') continue;
  const val = parseInt(line, 10);
  if (!isNaN(val)) {
    nums.push(val);
  }
}
let count = 0n;
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if ((BigInt(nums[i]) + BigInt(nums[j])) === BigInt(target)) {
      count++;
    }
  }
}
console.log(`pairs=${count}`);
