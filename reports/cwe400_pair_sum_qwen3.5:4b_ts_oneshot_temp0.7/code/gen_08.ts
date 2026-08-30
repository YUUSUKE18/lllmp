const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8").trim();
  if (!s) { console.log(`pairs=0`); return; }

  const lines = s.split(/\r?\n/);
  if (lines.length < 2) { console.log(`pairs=0`); return; }

  const target = parseInt(lines[0], 10);
  if (Number.isNaN(target)) { console.log(`pairs=0`); return; }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const val = parseInt(lines[i], 10);
    if (!Number.isNaN(val)) nums.push(val);
  }

  let count = 0n;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if ((BigInt(nums[i]) + BigInt(nums[j])) === BigInt(target)) count++;
    }
  }

  console.log(`pairs=${count}`);
});
