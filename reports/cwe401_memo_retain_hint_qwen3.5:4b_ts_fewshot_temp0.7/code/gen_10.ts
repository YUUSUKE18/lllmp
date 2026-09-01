const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  function computeSteps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let steps = 1;
    let nextN = n % 2 === 0 ? n / 2 : 3 * n + 1;
    
    // 64bit safe integer logic for the sequence
    // Since JavaScript handles large integers automatically, we can proceed directly.
    while (nextN !== 1) {
      if (memo.has(nextN)) {
        steps += memo.get(nextN)!;
        break;
      }
      if (nextN % 2 === 0) {
        nextN = nextN / 2;
      } else {
        nextN = 3 * nextN + 1;
      }
      steps++;
    }

    memo.set(n, steps);
    return steps;
  }

  for (const line of s.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    
    total += computeSteps(n);
  }

  console.log(`total=${total}`);
});
