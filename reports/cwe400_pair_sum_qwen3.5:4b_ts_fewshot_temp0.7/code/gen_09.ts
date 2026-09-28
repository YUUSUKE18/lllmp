const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length < 2) {
    console.log(`pairs=0`);
    return;
  }
  const target = parseInt(lines[0], 10);
  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const n = parseInt(lines[i], 10);
    if (!Number.isNaN(n)) nums.push(n);
  }
  let count = 0;
  const m = nums.length;
  for (let i = 0; i < m; i++) {
    for (let j = i + 1; j < m; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
