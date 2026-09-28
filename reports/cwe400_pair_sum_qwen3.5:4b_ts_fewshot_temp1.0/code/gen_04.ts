const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter((line) => line.trim().length > 0);
  let target = 0;
  if (lines.length > 0) {
    target = parseInt(lines[0].trim(), 10);
  } else {
    throw new Error("目標値が入力されていません");
  }
  
  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const n = parseInt(lines[i].trim(), 10);
    if (!Number.isNaN(n)) {
      nums.push(n);
    }
  }
  
  let count = 0n;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const sum = BigInt(nums[i]) + BigInt(nums[j]);
      if (sum === target) {
        count++;
      }
    }
  }
  
  console.log(`pairs=${count}`);
});
