const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | null = null;
  const nums: number[] = [];
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    const val = parseInt(line, 10);
    if (Number.isNaN(val)) continue;
    
    if (target === null) {
      target = val;
    } else {
      nums.push(val);
    }
  }
  
  let count = 0n;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const sum = BigInt(nums[i]) + BigInt(nums[j]);
      if (sum === BigInt(target)) {
        count++;
      }
    }
  }
  
  console.log(`pairs=${count}`);
});
