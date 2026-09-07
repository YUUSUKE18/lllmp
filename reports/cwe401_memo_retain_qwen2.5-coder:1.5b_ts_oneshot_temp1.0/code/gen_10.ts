// 解説文：無く

function calculateCollatzSteps(n: number): number {
  let steps = 0;
  while (n !== 1) {
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
    steps++;
  }
  return steps;
}

let memo: Map<number, number> = new Map();
let totalSteps = 0;

process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  for (const f of s.split(/\s+/)) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    if (memo.has(n)) {
      totalSteps += memo.get(n);
    } else {
      const steps = calculateCollatzSteps(n);
      totalSteps += steps;
      memo.set(n, steps);
    }
  }
  console.log(`total=${totalSteps}`);
});
