const memo = new Map<number, number>();

function collatzStep(n: number): number {
  if (memo.has(n)) return memo.get(n)!;
  
  let steps = 0;
  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
    steps++;
  }
  memo.set(n, steps);
  return steps;
}

function parseLine(line: string): number | null {
  const trimmed = line.trim();
  if (trimmed === "") return null;
  const num = parseInt(trimmed, 10);
  if (isNaN(num)) return null;
  return num;
}

process.stdin.on("data", (c) => {
  let accumulated = "";
  let currentLine: string | null = null;

  process.stdin.on("end", () => {
    const lines = accumulated.split(/\r?\n/);
    const totalSteps = 0n; // Initialize as BigInt to prevent overflow during accumulation, though final result fits in 64-bit usually. The problem states intermediate values fit in 64-bit, but summing steps might exceed it if queries are huge? Wait, max steps for 32-bit inputs (up to 2^31-1 or 2^32-1) is not that large (max ~500 for Collatz). Summing many small integers won't overflow 64-bit unless there are millions of lines. Let's use BigInt for safety on the sum accumulation as requested "sum of total steps" might conceptually be large, but let's check constraints. Input: 1 line per query. Number of queries not specified. Safe to use BigInt.
    
    // Actually, re-reading: "途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります" refers to the *sequence values* (intermediate n). 
    // The *sum of steps*: If we have ~10^5 queries, max steps per query is ~500. Total sum is ~5*10^7, which fits in 32-bit integer easily. However, using BigInt for the accumulator is safest practice given the instructions about large numbers in Collatz sequence.
    
    // Wait, the prompt says "All queries' step totals be calculated". 
    // Let's just accumulate into a number if it won't overflow, but since inputs can be large (64-bit range values generated), we need to handle n as Number is tricky because JS Number has 53 bits of precision.
    // However, the Collatz sequence for integers up to 2^53 is safe. The problem says intermediate values fit in 64-bit integer. In JavaScript `BigInt` is needed for values > 2^53 or if we strictly want to preserve 64-bit logic without precision loss.
    // But for the *sum* of steps? Steps count per number is small. Even with 10 million queries, sum < 10^9 * 1000 = 10^12, which fits in JS Number (safe up to 9e15).
    // So `number` type for the accumulator is fine. `BigInt` not strictly necessary for the sum itself unless queries are astronomical, but we must handle `n` as BigInt because `3n+1` on a number > 2^53 loses precision if interpreted as double.
    
    // To be precise: "intermediate values fit in 64-bit integer". JS Number (Number.MAX_SAFE_INTEGER is 2^53) has precision issues for integers > 2^53. We should treat `n` as BigInt to avoid any precision loss during calculation.
    
    let total = 0; // Start with number, steps are small counts.
    
    for (const line of lines) {
      const val = parseLine(line);
      if (val === null) continue;
      
      const steps = collatzStep(val);
      total += steps;
    }

    console.log(`total=${total}`);
  });
});

// Helper to buffer data before end event triggers
process.stdin.on("data", (chunk) => {
  // We need to collect lines until EOF.
  // Simple buffering strategy: accumulate chunk into a single buffer, then split on newlines when "end" comes?
  // Or accumulate in a string variable? Since multiple chunks can arrive before "end", we should store them.
  
  // Let's use a simpler approach for the whole logic inside the end handler to be safe and clean.
  // Actually, standard Node.js pattern with one buffer array is what was shown in the example.
});

// Redefining the structure slightly for robustness:
const buffers = [];
process.stdin.on("data", (chunk) => {
  buffers.push(chunk);
});

process.stdin.on("end", () => {
  const fullBuffer = Buffer.concat(buffers);
  const text = fullBuffer.toString("utf8");
  const lines = text.split(/\r?\n/);
  
  let totalSteps = 0;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    
    // Parse as BigInt to handle values > 2^53 safely
    const n =BigInt(trimmed); 
    
    if (n < 0n) continue; // "1以上の整数" (positive integers >= 1)
    
    let current = n;
    let steps = 0;
    while (current !== 1n) {
      if (current % 2n === 0n) {
        current = current / 2n;
      } else {
        current = 3n * current + 1n;
      }
      steps++;
    }
    
    totalSteps += steps;
  }
  
  console.log(`total=${totalSteps}`);
});
