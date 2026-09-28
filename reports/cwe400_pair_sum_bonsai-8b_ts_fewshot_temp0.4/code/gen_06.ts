const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  if (isNaN(target)) process.stdout.write("pairs=0\n");
  else {
    const nums = [];
    for (let i = 1; i < s.split("\n").length; i++) {
      const line = s.split("\n")[i];
      if (!line.trim()) continue;
      const num = parseInt(line, 10);
      if (!isNaN(num)) nums.push(num);
    }
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) count++;
      }
    }
    process.stdout.write(`pairs=${count}\n`);
  }
});
