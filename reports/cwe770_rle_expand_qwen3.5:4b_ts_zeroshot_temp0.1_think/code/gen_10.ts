const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
} else {
  const parts = input.trim().split(/[\s,]+/);
  let countSum: bigint = 0n;
  let valueSum: bigint = 0n;

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const match = trimmed.match(/^(-?\d+):(\d+)$/);
    if (match) {
      const val = BigInt(match[1]);
      const cnt = BigInt(match[2]);
      countSum += cnt;
      valueSum += val * cnt;
    }
  }

  console.log(`count=${countSum} sum=${valueSum}`);
}
