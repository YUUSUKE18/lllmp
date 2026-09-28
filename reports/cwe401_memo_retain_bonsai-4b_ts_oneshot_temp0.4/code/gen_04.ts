const data = [];
let memo = new Map<number, number>();
let total = 0;

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});

process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = s.split(/\s+/);
  lines.forEach((line) => {
    const n = parseInt(line, 10);
    if (isNaN(n)) return;
    if (n === 1) {
      total += 0;
      return;
    }
    if (memo.has(n)) {
      total += memo.get(n);
      return;
    }
    let current = n;
    let steps = 0;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      if (current > 2147483647 || current < -2147483648) {
        break;
      }
      if (memo.has(current)) {
        memo.set(current, steps);
        break;
      }
      steps++;
    }
    memo.set(n, steps);
    memo.set(current, steps);
    total += steps;
  });
  console.log(`total=${total}`);
});
