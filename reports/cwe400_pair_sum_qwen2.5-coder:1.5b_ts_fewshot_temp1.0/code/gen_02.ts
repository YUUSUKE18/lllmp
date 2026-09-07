function findPairs(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);
  let i = 0;
  let j = nums.length - 1;
  let count = 0;
  while (i < j) {
    const sum = nums[i] + nums[j];
    if (sum === target) {
      count++;
      while (i < j && nums[i] === nums[i + 1]) i++;
      while (i < j && nums[j] === nums[j - 1]) j--;
      i++;
      j--;
    } else if (sum < target) {
      i++;
    } else {
      j--;
    }
  }
  return count;
}

function main() {
  const input = process.stdin.read().toString("utf8");
  const lines = input.split("\n");
  const target = parseInt(lines[0], 10);
  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const n = parseInt(lines[i], 10);
    if (!isNaN(n)) nums.push(n);
  }
  const result = findPairs(nums, target);
  console.log(`pairs=${result}`);
}

main();
