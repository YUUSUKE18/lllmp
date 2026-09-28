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
    if (nums.length === 0) {
      target = parseInt(trimmed, 10);
      if (Number.isNaN(target)) continue;
    } 
    // 2 行目以降：整数列
    else {
      const n = parseInt(trimmed, 10);
      if (!Number.isNaN(n)) {
        nums.push(n);
      }
    }
  }
  
  if (target === null || nums.length < 2) {
    console.log("pairs=0");
    return;
  }
  
  let count = 0n; // 64bit integer
  
  // 二重ループで組み合わせを数える
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
