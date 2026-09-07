function collatzSteps(n: number): number {
  const steps = [n];
  while (n !== 1) {
    steps.push(n % 2 === 0 ? n / 2 : 3 * n + 1);
    n = steps[steps.length - 1];
  }
  return steps.length;
}

const totalSteps = process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(c).toString("utf8");
  let sum = 0;
  const memo = new Map<number, number>();

  for (const f of s.split(/\s+/)) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;

    if (memo.has(n)) {
      sum += memo.get(n);
    } else {
      memo.set(n, collatzSteps(n));
      sum += memo.get(n);
    }
  }

  console.log(`total=${sum}`);
}).on("end", () => {});
