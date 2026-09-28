const input = process.stdin.read();

if (!input) {
  console.log('count=0 sum=0');
} else {
  const parts = input.split(',');
  let countSum = BigInt(0);
  let valueSum = BigInt(0);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // Match pattern: integer:count
    // Value can be negative, count must be non-negative digits
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
