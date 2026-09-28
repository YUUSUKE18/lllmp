const target: number = parseInt(process.stdin.read().trim(), 10);
const pairs: number = 0;

for (let i = 1; i < process.stdin.read().split("\n").length; i++) {
  const num = parseInt(process.stdin.read().trim(), 10);
  if (Number.isNaN(num)) continue;
  if (target - num === num) pairs++;
}

console.log(`pairs=${pairs}`);
