const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const target = parseInt(process.stdin.read().trim(), 10);
  let pairs = 0;
  const nums: number[] = [];
  let index = 0;
  for (const line of process.stdin.read().split("\n")) {
    if (line.trim() === "") continue;
    const num = parseInt(line.trim(), 10);
    if (Number.isNaN(num)) continue;
    nums.push(num);
    if (nums.length === 2) {
      if (nums[0] + nums[1] === target) {
        pairs++;
      }
      nums.splice(0, 2);
    }
  }
  console.log(`pairs=${pairs}`);
});
