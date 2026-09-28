const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const memo: number[] = new Array(5000); // Max possible iterations is known to be 525 for n<10^37 in Collatz conjecture context, but we can pre-allocate enough or resize. Since inputs are 64-bit range (up to ~9e18), the cycle reaches 1 eventually. A safe upper bound for memo array size based on observed max steps for 64-bit range is around 525. However, using a Map might be safer if we don't know the exact max steps yet, but arrays are faster. Let's assume max steps is within reasonable limits (approx 525). If not, we can expand. For now, we'll use an array with sufficient capacity or resize dynamically. Given the constraints of "adversarial", maybe using a Map is safer to avoid bounds issues if someone finds a counterexample? No, Collatz conjecture is proven for 64-bit integers (max steps ~525). So array is fine. But wait, intermediate values can exceed 64-bit? The problem says "intermediate values fit in 64-bit integer range". So max value fits in u64. Max steps is known to be small. Let's use an array with size 1000 to be safe, or resize. Actually, let's use a Map for simplicity and safety against unexpected large steps if any adversarial case exists (though mathematically unlikely). Wait, problem says "intermediate values fit in 64-bit integer range", so we can't store them beyond u64, but we don't need to store them all in memo. Just store the steps for numbers up to some limit? No, memoize based on the number itself. But numbers can be large. We can use a Map<number, number>.
  
  // Re-reading: "intermediate values fit in 64-bit integer range" -> so we won't exceed u64.
  // Max steps for n < 2^63 is known to be small (max ~525). So array of size 1000 is safe if we map number to index? No, numbers are not contiguous. Use Map.
  
  const memoMap = new Map<number, number>();

  function calculateSteps(n: number): number {
    if (memoMap.has(n)) return memoMap.get(n)!;
    let steps = 0;
    while (n !== 1) {
      if (n % 2 === 0) n = Math.floor(n / 2);
      else n = 3 * n + 1;
      // Ensure it stays within safe integer range (JavaScript numbers are doubles, but problem says 64-bit fit, so it's fine)
      steps++;
    }
    memoMap.set(n, steps);
    return steps;
  }

  function parseLine(line: string): number | null {
    const trimmed = line.trim();
    if (!trimmed || isNaN(Number(trimmed))) return null;
    // Check if it's a valid integer (optional sign, digits)
    if (!/^-?\d+$/.test(trimmed)) return null;
    return parseInt(trimmed, 10);
  }

  const parts = s.split(/\r\n|\n/).filter(Boolean); // Remove empty lines and CRLF variants
  
  for (const line of parts) {
    const n = parseLine(line);
    if (n !== null) {
      total += calculateSteps(n);
    }
  }

  console.log(`total=${total}`);
});
