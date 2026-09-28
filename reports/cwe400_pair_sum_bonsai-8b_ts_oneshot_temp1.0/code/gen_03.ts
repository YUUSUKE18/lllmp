const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(line => line.trim()).filter(line => line && /^\d+$/.test(line));
  const target = parseInt(lines[0], 10);
  const nums = lines.slice(1).map(line => parseInt(line, 10));
  const pairs = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) pairs.push([i, j]);
    }
  }
  console.log(`pairs=${pairs.length}`);
});
