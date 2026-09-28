const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const target = parseInt(lines[0], 10);
  const nums = lines.slice(1).map(line => line.trim()).filter(line => {
    const num = parseInt(line, 10);
    return !isNaN(num) && num >= 0;
  }).filter(n => n >= 0 && n <= target);
  const count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
      }
    }
  }
  console.log(`pairs=${count}`);
});
