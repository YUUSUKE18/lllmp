const input = process.stdin.read().trim();
if (!input) {
  console.log('count=0 max=0');
} else {
  const parts = input.split(',');
  let count = 0;
  let maxVal: bigint | undefined = undefined;

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // Check if it is a valid integer string (optional sign, digits only)
    if (/^[+-]?\d+$/.test(trimmed)) {
      const num = BigInt(trimmed);
      count++;
      if (maxVal === undefined || num > maxVal) {
        maxVal = num;
      }
    }
  }

  const finalMax = maxVal ?? BigInt(0);
  console.log(`count=${count} max=${finalMax}`);
}
