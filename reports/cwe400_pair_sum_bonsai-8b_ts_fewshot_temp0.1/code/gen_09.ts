const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  if (isNaN(target)) return;
  let count = 0;
  const nums = s.split("\n").map(line => line.trim()).filter(line => !line && !isNaN(line));
  for (let i = 0; i < nums.length; i++) {
    const num = parseInt(nums[i], 10);
    if (isNaN(num)) continue;
    for (let j = i + 1; j < nums.length; j++) {
      const other = parseInt(nums[j], 10);
      if (isNaN(other)) continue;
      if (num + other === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
