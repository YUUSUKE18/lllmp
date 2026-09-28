import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

let targetValue: bigint | undefined;
let numbers: bigint[] = [];

rl.on("line", (line) => {
  if (targetValue === undefined) {
    const trimmed = line.trim();
    if (trimmed.length > 0 && !isNaN(Number(trimmed))) {
      targetValue = BigInt(trimmed);
    }
  } else {
    const parts = line.split(/\s+/);
    for (const part of parts) {
      if (!isNaN(Number(part))) {
        numbers.push(BigInt(part));
      }
    }
  }

  rl.close();
});

function countPairs(nums: bigint[], target: bigint): number {
  let count = 0n;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
      }
    }
  }
  return Number(count);
}

if (targetValue !== undefined && numbers.length > 0) {
  const result = countPairs(numbers, targetValue);
  console.log(`pairs=${result}`);
}
