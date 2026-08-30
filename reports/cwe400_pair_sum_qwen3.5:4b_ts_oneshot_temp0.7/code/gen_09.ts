const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  if (lines.length < 2) {
    console.log(`pairs=0`);
    return;
  }

  const targetVal = parseInt(lines[0].trim(), 10);
  if (Number.isNaN(targetVal)) {
    console.log(`pairs=0`);
    return;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const val = parseInt(line, 10);
    if (Number.isNaN(val)) continue;
    nums.push(val);
  }

  let count = 0n;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if ((BigInt(nums[i]) + BigInt(nums[j])) === BigInt(targetVal)) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
