const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  let count = 0;
  const nums = s.split("\n").map(line => {
    const numStr = line.trim();
    if (!numStr) return null;
    const num = parseInt(numStr, 10);
    if (Number.isNaN(num)) return null;
    return num;
  }).filter(n => n !== null);
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
