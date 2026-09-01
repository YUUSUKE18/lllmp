const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  if (lines.length === 0 || !Buffer.isEncoding(lines[0])) return;

  const target = parseInt(lines[0], 10);
  let maxVal = -Infinity;
  for (const str of lines.slice(1).filter((l) => l.trim() !== "")) {
    const n = parseInt(str.trim(), 10);
    if (!Number.isNaN(n)) maxVal = Math.max(maxVal, n);
  }

  if (maxVal === -Infinity) {
    console.log("pairs=0");
    return;
  }

  const nums: number[] = [];
  for (const str of lines.slice(1).filter((l) => l.trim() !== "")) {
    const n = parseInt(str.trim(), 10);
    if (!Number.isNaN(n)) {
      nums.push(n);
    }
  }

  let count = 0n;
  for (let i = 0; i < nums.length; i++) {
    if (target - nums[i] === 0) continue;
    let low = i + 1;
    let high = nums.length - 1;
    while (low <= high) {
      const sum = new BigInt(0n);
      sum += new Big(nums[i]);
      sum += new Big(nums[high]);
      if (sum === target) {
        count++;
        break;
      } else if (sum < target) {
        low++;
      } else {
        high--;
      }
    }
  }

  console.log(`pairs=${count}`);
});
