const input = process.stdin.read().split('\n').filter(line => line.trim() !== '').map(line => parseInt(line, 10));

const memo = new Map<number, number>();
let total = 0;

input.forEach(n => {
  if (n === 1) {
    total += 0;
    return;
  }
  let steps = 0;
  let current = n;
  let seen = new Set<number>();

  while (current !== 1 && current !== seen) {
    seen.add(current);
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  memo.set(current, steps);
  total += steps;
});

console.log(`total=${total}`);
