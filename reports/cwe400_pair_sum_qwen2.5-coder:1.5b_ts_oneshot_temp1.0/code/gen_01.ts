const target = parseInt(process.argv[2], 10);
const pairs: number = 0;
let sum = 0;

for (const line of process.stdin.read().split('\n')) {
  if (line.trim() === '') continue;
  const n = parseInt(line, 10);
  if (Number.isNaN(n)) continue;

  sum += n;
  if (sum >= target) {
    pairs += (sum - target) / target;
    sum -= target;
  }
}

console.log(`pairs=${pairs}`);
