const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | null = null;
  const nums: number[] = [];
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parsed = parseInt(line, 10);
    if (isNaN(parsed)) continue;
    
    if (target === null) {
      target = parsed;
    } else {
      nums.push(parsed);
    }
  }
  
  let count = 0n;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if ((BigInt(nums[i]) + BigInt(nums[j])) === BigInt(target)) {
        count++;
      }
    }
  }
  
  console.log(`pairs=${count}`);
});
