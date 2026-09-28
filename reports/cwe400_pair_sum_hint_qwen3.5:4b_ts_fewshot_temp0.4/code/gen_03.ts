const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  const target = parseInt(lines[0].trim(), 10);
  if (Number.isNaN(target)) {
    console.log(`pairs=0`);
    return;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n)) continue;
    nums.push(n);
  }

  let count = 0n;
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (BigInt(nums[i]) + BigInt(nums[j]) === BigInt(target)) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
