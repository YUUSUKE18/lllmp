const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  let count = 0;
  const nums = [];
  for (let i = 1; i < s.split("\n").length; i++) {
    const line = s.split("\n")[i];
    if (line.trim() === "") continue;
    const num = parseInt(line, 10);
    if (Number.isNaN(num)) continue;
    nums.push(num);
  }
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
