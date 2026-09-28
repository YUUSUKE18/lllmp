const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(line => line.trim()).filter(line => line.length > 0);
  const target = parseInt(lines[0], 10);
  if (isNaN(target)) return;
  const nums = lines.slice(1).map(line => parseInt(line, 10)).filter(n => !isNaN(n));
  if (nums.length < 2) return;
  const count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
