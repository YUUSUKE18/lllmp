const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.trim(), 10);
  let count = 0;
  const nums = [];
  for (const line of s.split("\n")) {
    if (line.trim() === "") continue;
    const numStr = line.trim();
    if (/^-?\d+$/.test(numStr)) {
      const num = parseInt(numStr, 10);
      nums.push(num);
    }
  }
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
