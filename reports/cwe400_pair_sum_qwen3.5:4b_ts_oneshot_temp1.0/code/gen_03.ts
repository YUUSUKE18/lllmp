const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let targetVal = null;
  for (const line of lines) {
    if (line.trim() === "") continue;
    targetVal = parseInt(line, 10);
    if (!Number.isNaN(targetVal)) break;
  }
  const nums: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (i === 0) continue;
    if (lines[i].trim() === "") continue;
    const n = parseInt(lines[i], 10);
    if (!Number.isNaN(n)) nums.push(n);
  }
  let count = 0n;
  const numLen = nums.length;
  for (let i = 0; i < numLen; i++) {
    for (let j = i + 1; j < numLen; j++) {
      if (BigInt(nums[i]) + BigInt(nums[j]) === BigInt(targetVal)) count++;
    }
  }
  console.log(`pairs=${count}`);
});
