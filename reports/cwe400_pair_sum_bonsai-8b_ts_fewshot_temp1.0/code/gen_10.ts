const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  const nums = s.split("\n").slice(1).map(line => {
    const n = parseInt(line.trim(), 10);
    return Number.isNaN(n) ? undefined : n;
  }).filter(n => n !== undefined);
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] !== undefined && nums[j] !== undefined && nums[i] + nums[j] === target) {
        count++;
      }
    }
  }
  console.log(`pairs=${count}`);
});
