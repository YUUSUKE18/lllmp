const memo = new Map<number, number>();

function calculateSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  let steps = 0;
  while (n !== 1) {
    steps++;
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
  }
  memo.set(n, steps);
  return steps;
}

const totalSteps = 0;
let last = null;

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = s.split(/\s+/).filter(n => !isNaN(n) && n.trim() !== "");
  for (const num of numbers) {
    const n = parseInt(num, 10);
    if (last === null || n > last) {
      last = n;
      totalSteps += calculateSteps(n);
    }
  }
});

process.stdin.on("end", () => {
  console.log(`total=${totalSteps}`);
});
