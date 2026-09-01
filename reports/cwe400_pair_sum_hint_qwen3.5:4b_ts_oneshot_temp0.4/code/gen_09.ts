const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | undefined;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const val = parseInt(line, 10);
    if (!Number.isNaN(val)) {
      target = val;
      break;
    }
  }

  if (target === undefined) {
    console.log("pairs=0");
    return;
  }

  let count: bigint = 0n;
  const nums: number[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const val = parseInt(line, 10);
    if (!Number.isNaN(val)) {
      nums.push(val);
    }
  }

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const sum: bigint = BigInt(nums[i]) + BigInt(nums[j]);
      if (sum === BigInt(target)) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
