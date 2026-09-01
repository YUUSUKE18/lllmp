const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target = 0;
  if (lines.length > 0 && lines[0].trim() !== "") {
    const t = parseInt(lines[0].trim(), 10);
    if (!Number.isNaN(t)) target = t;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) nums.push(n);
  }

  let count = 0n;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (BigInt(nums[i]) + BigInt(nums[j]) === BigInt(target)) count++;
    }
  }

  console.log(`pairs=${count}`);
});
