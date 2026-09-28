const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const target = parseInt(lines[0], 10);
  const nums = lines
    .filter((line) => {
      const stripped = line.trim();
      return stripped && !isNaN(stripped);
    })
    .map((line) => parseInt(line, 10));
  const pairs = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        pairs.push([i, j]);
      }
    }
  }
  console.log(`pairs=${pairs.length}`);
});
