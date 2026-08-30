const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const w of s.split(",")) {
    if (!w.trim()) continue;
    try {
      const n = parseInt(w.trim(), 10);
      if (Number.isNaN(n) || !isFinite(n)) continue;
      
      count.set(n, (count.get(n) ?? BigInt(0n)) + 1n);
      sum += count.get(n)! * BigInt(count.size > 0 ? n : 0n); // This logic is slightly flawed in the loop structure below. Let's fix it properly inside the accumulation phase or just accumulate directly first then filter unique? No, we need count of UNIQUE integers and their SUM.

      // Correct approach:
    } catch (e) { continue; }
  }
  
  // Re-evaluating logic for clarity within a single pass without Map overhead if possible, but Map is fine here given constraints. 
  // Actually, let's rewrite the loop to be cleaner and correct.

};
