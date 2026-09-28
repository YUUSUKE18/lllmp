const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const target = lines[0].trim();
  const nums = lines.slice(1).map(line => line.trim()).filter(line => !line);
  const nums = nums.map(line => parseInt(line, 10));
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
