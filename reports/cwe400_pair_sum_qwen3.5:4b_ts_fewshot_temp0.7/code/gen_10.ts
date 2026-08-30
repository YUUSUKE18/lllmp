const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.trim().split(/\r\n|\n/);
  let target = 0;
  if (lines.length > 0 && lines[0].trim() !== "") {
    target = parseInt(lines[0], 10);
    if (!Number.isNaN(target)) return;
  }
  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) nums.push(n);
  }
  let count = 0n;
  for (let i = 0n; i < BigInt(nums.length); i++) {
    for (let j = i + 1n; j < BigInt(nums.length); j++) {
      const sum = BigInt(nums[i]) + BigInt(nums[j]);
      if (sum === BigInt(target)) count++;
    }
  }
  console.log(`pairs=${count}`);
});
