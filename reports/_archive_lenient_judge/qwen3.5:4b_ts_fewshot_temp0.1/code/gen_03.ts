const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // Leading/trailing whitespace removal and parsing attempt
    const trimmedToken = token.trim();
    try {
      const n = parseInt(trimmedToken, 10);
      
      // Check validity: must be a valid integer (no NaN)
      if (Number.isNaN(n)) continue;

      count.set(n, (count.get(n) || BigInt(0n)) + 1n);
      sum += count.get(n)! * BigInt(1n); 
    } catch {
      // If parseInt fails for some reason or token is not a number string
      continue;
    }
    
    // Recalculate total based on unique counts to ensure correctness with large numbers
    let finalSum = 0n;
    count.forEach((val, key) => {
      if (typeof val === 'bigint') {
        finalSum += BigInt(val); 
      } else {
        finalSum += Number(val); // Fallback for safety though logic above ensures bigint usage in loop
      }
    });

  }
  
  console.log(`count=${count.size} sum=${finalSum}`);
});
