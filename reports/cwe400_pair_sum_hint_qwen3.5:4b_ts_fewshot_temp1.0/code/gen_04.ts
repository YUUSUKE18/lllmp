const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  // Target value on line 1
  let target = 0;
  for (const line of lines) {
    const n = parseInt(line.trim(), 10);
    if (!Number.isNaN(n)) {
      target = n;
      break;
    }
  }
  
  // Read integers from subsequent lines
  const nums: bigint[] = [];
  for (const line of lines) {
    if (line.trim().length === 0) continue;
    try {
      const num: bigint = BigInt(parseInt(line, 10));
      nums.push(num);
    } catch (e) {
      // Ignore lines that are not valid integers
      continue;
    }
  }
  
  // Find pairs with different positions that sum to target
  let count = 0n;
  const len = nums.length;
  for (let i = 0n; i < len; i++) {
    for (let j = i + 1n; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
      }
    }
  }
  
  console.log(`pairs=${count}`);
});
