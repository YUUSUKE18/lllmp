const input = process.stdin.read().trim();
if (!input) {
  console.log('count=0 sum=0');
} else {
  const parts = input.split(',');
  const uniqueSet = new Set<bigint>();
  let sumBigInt = 0n;

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (/^[+-]?\d+$/.test(trimmed)) {
      const num = BigInt(trimmed);
      uniqueSet.add(num);
      sumBigInt += num;
    }
  }

  console.log(`count=${uniqueSet.size} sum=${sumBigInt}`);
}
