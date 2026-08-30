const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: Map<string, number> = new Map();
  let total = 0;

  function step(n: number): number {
    const key = String(n);
    if (memo.has(key)) return memo.get(key)!;
    
    let next: number;
    if (n === 1) next = 1;
    else if (n % 2 === 0) next = Math.floor(n / 2);
    else next = 3 * n + 1;

    const steps = 1 + step(next);
    memo.set(key, steps);
    return steps;
  }

  for (const line of s.trim().split("\n")) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    total += step(Math.abs(n));
  }

  console.log(`total=${total}`);
});
