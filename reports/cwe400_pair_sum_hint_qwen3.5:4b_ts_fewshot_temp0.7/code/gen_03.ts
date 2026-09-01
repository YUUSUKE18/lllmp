const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  if (lines.length < 2) {
    console.log(`pairs=0`);
    return;
  }
  const target = parseInt(lines[0], 10);
  if (Number.isNaN(target)) {
    console.log(`pairs=0`);
    return;
  }
  const nums: bigint[] = [];
  for (let i = 1; i < lines.length; i++) {
    const n = parseInt(lines[i], 10);
    if (Number.isNaN(n) || isNaN(parseInt(lines[i].trim(), 10))) continue;
    nums.push(BigInt(n));
  }
  let count = 0n;
  for (let i = 0n; i < nums.length - 1n; i++) {
    const a = nums[i];
    const needed = target - a;
    for (let j = i + 1n; j < nums.length; j++) {
      if (nums[j] === needed) {
        count++;
      }
    }
  }
  console.log(`pairs=${count}`);
});
