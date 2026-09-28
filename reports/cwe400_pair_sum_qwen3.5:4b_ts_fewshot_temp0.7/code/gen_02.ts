const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target = NaN;
  for (const line of lines) if (!line.trim().length) continue;
  target = parseInt(line, 10);
  if (Number.isNaN(target)) { target = NaN; } else { target = Number(target); }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim().length) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    nums.push(Number(n));
  }

  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }

  console.log(`pairs=${count}`);
});
