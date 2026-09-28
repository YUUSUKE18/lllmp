const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    try {
      const n = parseInt(token.trim(), 10);
      if (isNaN(n) || !Number.isInteger(n)) continue;
      
      count.set(n, (count.get(n) ?? BigInt(0n)) + 1n);
      sum += count.get(n)! * BigInt(1n); // Wait, this logic is slightly off. Let's recalculate properly based on unique elements only? No, the requirement says "for those integers after removing duplicates". This usually means: Count how many UNIQUE numbers there are, and Sum them up. 
      
      // Correct Logic:
      const val = BigInt(n);
      count.set(val, (count.get(val) ?? 0n) + 1n);
    } catch {
      continue;
    }
  }

  let uniqueCount = 0;
  for (const _ of count.values()) {} // Just to iterate? No.
  
  // Let's restart the logic cleanly inside the loop or separate it.
  const nums: number[] = [];
  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    try {
      const n = parseInt(token, 10);
      if (isNaN(n) || !Number.isInteger(n)) continue;
      // Check if already added to avoid duplicates in the sum/count calculation? 
      // "重複を除いた整数" -> Remove duplicates. So we only care about unique values present in input.
      const exists = nums.includes(n);
      if (!exists) {
        nums.push(n);
      }
    } catch (e) {}
  }

  let c = nums.length;
  let sVal: bigint = BigInt(0n);
  for (const n of nums) {
    const bigN = BigInt(n);
    sVal += bigN;
  }

  console.log(`count=${c} sum=${sVal}`);
});
