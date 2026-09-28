const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let targetVal: number | null = null;
  const nums: bigint[] = [];
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    
    try {
      // 1 行目に目標値があるか
      if (!targetVal && parseInt(line, 10) !== NaN) {
        targetVal = BigInt(parseInt(line, 10));
        continue;
      }
      
      // それ以降に整数があるか
      const n = parseInt(line, 10);
      if (Number.isNaN(n)) continue;
      nums.push(BigInt(n));
    } catch {
      continue;
    }
  }
  
  let count = 0n;
  for (let i = 0n; i < nums.length - 1n; i++) {
    for (let j = i + 1n; j < nums.length; j++) {
      if (nums[i] + nums[j] === targetVal) {
        count++;
      }
    }
  }
  
  console.log(`pairs=${count}`);
});
