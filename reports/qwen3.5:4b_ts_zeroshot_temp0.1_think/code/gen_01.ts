const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
} else {
  const parts = input.split(',');
  const uniqueNumbers = new Set<BigInt>();
  let sum = 0n;

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // Check if valid integer string
    if (/^-?\d+$/.test(trimmed)) {
      const num = BigInt(trimmed);
      uniqueNumbers.add(num);
      sum += num;
    }
  }

  console.log(`count=${uniqueNumbers.size} sum=${sum}`);
}
