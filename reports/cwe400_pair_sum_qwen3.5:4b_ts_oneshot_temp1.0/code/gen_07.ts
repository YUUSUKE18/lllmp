const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let targetValue: number | null = null;
  let numbers: number[] = [];

  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.trim().split(/\s+/);
    if (parts.length > 1) {
      // Target value is on the first line with spaces, but spec says "1行目に目標値が与えられます"
      // Example implies a single integer per line based on "2 行目以降には整数が 1 行に 1 個ずつ並びます".
      // However, if the target line has multiple parts (e.g. "50"), we treat it as target.
      // Assuming strict format: Line 1 is just the target number.
      // If the input line contains only one integer, that's the target.
      // Re-reading spec: "標準入力の 1 行目に目標値が与えられます" -> Single value on line 1.
      // Let's assume the first non-empty line is the target.
    } else {
      // This logic is slightly flawed if the first line is just one number.
      // Correct approach: Parse line by line. First valid integer line is target. Subsequent are candidates.
      const n = parseInt(parts[0], 10);
      if (Number.isNaN(n)) continue;

      if (numbers.length === 0) {
        targetValue = n;
      } else {
        numbers.push(n);
      }
    }
  }

  // Re-parse logic to be more robust for the specific case described:
  // "1 行目に目標値が与えられます" -> Target is on line 0.
  // "2 行目以降には整数が 1 行に 1 個ずつ並びます" -> Line i (>=1) has one integer.
  
  let target: bigint | null = null;
  const nums: bigint[] = [];

  for (const line of lines) {
    if (line.trim() === "") continue;
    // Handle cases where line might have trailing spaces or just whitespace
    const trimmed = line.trim();
    const val = BigInt(trimmed);
    
    if (nums.length === 0) {
      target = val;
    } else {
      nums.push(val);
    }
  }

  // Use a map to count frequencies for O(N) lookup or double loop?
  // Spec says values and count fit in 64-bit integer range.
  // Since we need pairs of positions (i != j), using a set or frequency map is efficient.
  
  // If we have many duplicates, frequency map helps avoid checking same element twice if positions don't matter?
  // But the question says "位置が異なる 2 個の組" (pairs with different positions).
  // If there are two identical numbers at index i and j (i != j), they form a pair.
  // Using a frequency map:
  // Let count[x] be the number of times x appears.
  // The number of pairs formed by value x is C(count[x], 2) = count[x] * (count[x] - 1) / 2.
  // Total pairs = sum over all x of C(count[x], 2).
  
  const freqMap: Record<string, bigint> = {};
  for (const n of nums) {
    const strN = n.toString();
    freqMap[strN] = (freqMap[strN] || 0n) + 1n;
  }

  let pairs = 0n;
  for (const [numStr, count] of Object.entries(freqMap)) {
    // If count >= 2, we can form pairs.
    if (count > 1n) {
      const c = Number(count);
      pairs += BigInt(c * (c - 1) / 2);
    }
  }

  console.log(`pairs=${Number(pairs)}`);
});
