const input = process.stdin.read();
let count = 0n;
let sum = 0n;

if (input) {
  const matches = input.match(/(-?\d+):(\d+)/g);
  if (matches) {
    for (const match of matches) {
      const parts = match.split(':');
      const val = BigInt(parts[0]);
      const cnt = BigInt(parts[1]);
      count += cnt;
      sum += val * cnt;
    }
  }
}

console.log(`count=${count} sum=${sum}\n`);
