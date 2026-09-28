const input = process.stdin.read();
const lines = input.split('\n').filter(l => l.trim() !== '');
if (lines.length < 2) {
  console.log(`pairs=0`);
} else {
  const target = parseInt(lines[0], 10);
  if (isNaN(target)) {
    console.log(`pairs=0`);
  } else {
    const numbers = lines.slice(1).map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    let count = BigInt(0);
    const seen = new Set<bigint>();
    for (const n of numbers) {
      if (target - BigInt(n) in seen) {
        count += BigInt(seen.get(target - BigInt(n))!);
      }
      seen.add(n);
    }
    console.log(`pairs=${count}`);
  }
}
