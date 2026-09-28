const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  if (lines.length === 0 || isNaN(Number(lines[0]))) {
    console.log("pairs=0");
    return;
  }
  const target = Number(lines[0]);
  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const n = Number(lines[i]);
    if (!isNaN(n)) nums.push(n);
  }
  let count = 0n;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const val = BigInt(nums[i]) + BigInt(nums[j]);
      if (val === BigInt(target)) count++;
    }
  }
  console.log(`pairs=${count}`);
});
