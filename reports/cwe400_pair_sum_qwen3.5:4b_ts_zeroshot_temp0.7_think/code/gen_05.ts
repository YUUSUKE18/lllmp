const input = process.stdin.read();
if (!input) {
  console.log('pairs=0');
} else {
  const lines = input.split('\n');
  let target: bigint | undefined;
  const nums: bigint[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    try {
      const val = BigInt(trimmed);
      if (target === undefined) {
        target = val;
      } else {
        nums.push(val);
      }
    } catch {
      // Ignore non-integer lines
    }
  }

  if (!target) {
    console.log('pairs=0');
  } else {
    const map = new Map<bigint, bigint>();
    let count: bigint = BigInt(0);

    for (const num of nums) {
      const needed = target - num;
      const freqNeeded = map.get(needed) ?? BigInt(0);
      count += freqNeeded;

      const freqNum = map.get(num) ?? BigInt(0);
      map.set(num, freqNum + BigInt(1));
    }

    console.log(`pairs=${count}`);
  }
}
