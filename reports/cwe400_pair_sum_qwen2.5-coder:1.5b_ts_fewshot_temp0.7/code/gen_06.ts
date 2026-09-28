const target = parseInt(process.argv[2], 10);
const pairs = 0;
let seen = new Set<number>();

for (let i = 3; i <= process.stdin.readLines().length; i++) {
  const line = process.stdin.readLines()[i - 3];
  const num = parseInt(line, 10);
  if (isNaN(num) || seen.has(num)) continue;
  seen.add(num);
  for (const seenNum of seen) {
    if (seenNum + num === target) pairs++;
  }
}

console.log(`pairs=${pairs}`);
