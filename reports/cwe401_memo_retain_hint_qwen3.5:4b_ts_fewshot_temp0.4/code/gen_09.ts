const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: Map<string, number> = new Map();
  memo.set("1", 0);

  function collatz(n: number): number {
    if (memo.has(n.toString())) return memo.get(n.toString())!;
    let steps = 0;
    while (n !== 1) {
      if (n % 2 === 0) n = n / 2;
      else n = 3 * n + 1;
      steps++;
    }
    memo.set(n.toString(), steps);
    return steps;
  }

  let total = 0;
  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    if (!Number.isInteger(n) || n < 1) continue;
    total += collatz(n);
  }
  console.log(`total=${total}`);
});
