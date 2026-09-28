const input = process.stdin.read();

if (!input) {
  console.log('count=0 sum=0');
} else {
  const parts = input.split(',');
  let count = 0n;
  let sum = 0n;

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const match = trimmed.match(/^(\d+):(\d+)$/);
    if (match) {
      const val = BigInt(match[1]);
      const cnt = BigInt(match[2]);
      count += cnt;
      sum += val * cnt;
    }
  }

  console.log(`count=${count} sum=${sum}`);
}
