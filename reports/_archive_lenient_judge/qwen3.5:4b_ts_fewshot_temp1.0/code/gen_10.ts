const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let setStr = "";
  for (const ch of s.split(",")) {
    if (ch.trim() === "") continue;
    try {
      const n = parseInt(ch, 10);
      if (!Number.isNaN(n)) setStr += `${n} ${""}`; // Add unique count separator logic manually or use Set? Wait, the requirement is "count of distinct integers". Let's just parse into a Map/Set to avoid duplicates. 
    } catch { /* ignore non-integers */ }
  }

  // Correct approach: Use a Map to track counts and sum each number only once per unique value
  const map = new Map<number, boolean>();
  let distinctCount = 0;
  let totalSum = 0n;

  for (const ch of s.split(",")) {
    if (ch.trim() === "") continue;
    
    // Check validity before parsing to avoid exceptions on malformed numbers like "12.34" or non-numeric strings without catching all cases properly? parseInt handles leading zeros and such but might return NaN for invalid chars. 
    let n: number | null = parseFloat(ch); // Try float then cast
    
    if (!isNaN(n) && Number.isFinite(n)) {
      const iN = Math.trunc(Number(n)); // Ensure integer conversion
      
      // Only process valid integers (e.g., "123", "-456") but ignore decimals like "1.5" or text? The prompt says "integer sequence". parseFloat might interpret "abc123" as NaN, which is fine. 
      
      const key = iN;
      if (!map.has(key)) {
        map.set(key, true);
        distinctCount++;
        totalSum += BigInt(iN);
      } else {
        // Do nothing for duplicates? No wait: "distinct integers". Count them once. Sum them once per value. 
      }
    }
  }

  console.log(`count=${distinctCount} sum=${totalSum}`);
});
