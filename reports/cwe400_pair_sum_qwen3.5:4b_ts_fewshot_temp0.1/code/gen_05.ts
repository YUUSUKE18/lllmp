const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  if (lines.length > 0 && lines[0].trim() !== "") {
    const t = parseInt(lines[0].trim(), 10);
    if (!Number.isNaN(t)) target = t;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) nums.push(n);
  }

  let count = 0n;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const sum = BigInt(nums[i]) + BigInt(nums[j]);
      if (sum === BigInt(target)) count++;
    }
  }

  console.log(`pairs=${count}`);
});
