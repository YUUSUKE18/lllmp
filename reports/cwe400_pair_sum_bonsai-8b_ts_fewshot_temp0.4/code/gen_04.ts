const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  let count = 0;
  const nums = s.split(/\s+/).filter(n => n.trim() !== "");
  for (let i = 0; i < nums.length; i++) {
    const a = parseInt(nums[i], 10);
    if (Number.isNaN(a)) continue;
    for (let j = i + 1; j < nums.length; j++) {
      const b = parseInt(nums[j], 10);
      if (Number.isNaN(b)) continue;
      if (a + b === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
