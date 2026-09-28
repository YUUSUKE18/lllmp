const input = process.stdin.read();
if (!input) {
  console.log('pairs=0');
} else {
  const lines = input.split('\n');
  let targetVal: bigint | null = null;
  const nums: bigint[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    try {
      const val = BigInt(trimmed);
      if (targetVal === null) {
        targetVal = val;
      } else {
        nums.push(val);
      }
    } catch (e) {
      // Ignore non-integer lines
    }
  }

  const count: bigint = BigInt(0);
  if (targetVal !== null) {
    const seen = new Map<bigint, bigint>();
    for (const num of nums) {
      const complement = targetVal - num;
      if (seen.has(complement)) {
        count += seen.get(complement)!;
      }
      const current = seen.get(num) || BigInt(0);
      seen.set(num, current + 1n);
    }
  }

  console.log(`pairs=${count.toString()}`);
}
