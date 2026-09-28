const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      target = n;
      break;
    }
  }
  if (target === null) {
    console.log("pairs=0");
    return;
  }
  const nums: number[] = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      nums.push(n);
    }
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
