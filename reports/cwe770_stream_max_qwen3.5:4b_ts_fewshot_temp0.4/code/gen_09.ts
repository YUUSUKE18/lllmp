const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    try {
      const n = parseInt(token, 10);
      if (Number.isNaN(n) || !isFinite(n)) continue;
      
      count++;
      if (max === null || n > max) {
        max = n;
      }
    } catch {
      // Invalid integer parsing ignored as per spec requirement to skip non-integer elements
    }
  }

  console.log(`count=${count} max=${max}`);
});
