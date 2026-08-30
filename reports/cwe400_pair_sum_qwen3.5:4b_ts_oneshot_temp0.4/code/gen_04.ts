const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | null = null;
  const nums: number[] = [];
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    const trimmed = line.trim();
    
    // 1 行目：目標値
    if (!target && !isNaN(Number(trimmed))) {
      target = Number(trimmed);
      continue;
    }
    
    // 2 行目以降：整数列
    if (target !== null) {
      const n = parseInt(trimmed, 10);
      if (!isNaN(n)) {
        nums.push(n);
      }
    }
  }
  
  let count = 0n;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const sum = BigInt(nums[i]) + BigInt(nums[j]);
      if (sum === BigInt(target)) {
        count++;
      }
    }
  }
  
  console.log(`pairs=${count}`);
});
