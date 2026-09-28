(function() {
  const input = process.stdin.read();
  if (!input) {
    console.log('pairs=0');
    return;
  }

  const lines = input.split(/\r?\n/);
  const validLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    // Check if it's a valid integer string
    if (/^[+-]?\d+$/.test(trimmed)) {
      validLines.push(trimmed);
    }
  }

  if (validLines.length === 0) {
    console.log('pairs=0');
    return;
  }

  const target = BigInt(validLines[0]);
  const nums: bigint[] = [];

  for (let i = 1; i < validLines.length; i++) {
    nums.push(BigInt(validLines[i]));
  }

  let count = 0n;
  const seen = new Map<bigint, bigint>();

  for (const num of nums) {
    const complement = target - num;
    if (seen.has(complement)) {
      count += seen.get(complement)!;
    }
    seen.set(num, (seen.get(num) || 0n) + 1n);
  }

  console.log(`pairs=${count}`);
})();
