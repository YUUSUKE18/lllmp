const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines: string[] = [];
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    lines.push(line);
  }

  const target = parseInt(lines[0], 10);
  if (Number.isNaN(target)) {
    console.log("pairs=0");
    return;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const n = parseInt(lines[i], 10);
    if (!Number.isNaN(n)) {
      nums.push(n);
    }
  }

  let count = 0n;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const a = BigInt(nums[i]);
    for (let j = i + 1; j < n; j++) {
      const b = BigInt(nums[j]);
      if (a + b === BigInt(target)) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
