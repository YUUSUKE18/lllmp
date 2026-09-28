const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(l => l.toString().trim());
  const target = lines[0] ? parseInt(lines[0], 10) : 0;
  const nums = lines
    .filter(line => line && !isNaN(parseInt(line, 10)))
    .map(line => parseInt(line, 10));
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
