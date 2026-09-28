const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  if (isNaN(target)) process.stdout.write("pairs=0\n");
  const nums = s.split("\n").map(line => {
    const num = line.trim();
    if (!num) return null;
    const n = parseInt(num, 10);
    if (isNaN(n)) return null;
    return n;
  }).filter(n => n !== null);
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }
  process.stdout.write(`pairs=${count}\n`);
});
