const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  
  const targetVal = parseInt(s.split("\n")[0].trim(), 10);
  const nums: number[] = [];
  
  let count = 0;
  for (let i = 1; i < lines; i++) {
    const line = s.split("\n")[i];
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    nums.push(n);
  }
  
  let pairs = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === targetVal) {
        pairs++;
      }
    }
  }
  
  console.log(`pairs=${pairs}`);
});
