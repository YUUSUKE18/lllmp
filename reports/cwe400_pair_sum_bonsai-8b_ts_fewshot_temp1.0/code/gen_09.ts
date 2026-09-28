const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  const nums = s.split("\n").map(line => {
    if (line.trim() === "") return "";
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) return "";
    return n;
  }).filter(n => !isNaN(n) && n.toString().trim() !== "");
  const pairs = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) pairs.push([i, j]);
    }
  }
  console.log(`pairs=${pairs.length}`);
});
