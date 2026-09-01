const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  memo.set(1, 0);

  const total = (() => {
    let count = 0;
    for (const line of s.split(/\r\n|\n/)) {
      if (line.trim() === "") continue;
      const n = parseInt(line, 10);
      if (Number.isNaN(n) || Number.isFinite(n) === false || n < 0) continue;
      
      function solve(k: number): number {
        if (memo.has(k)) return memo.get(k)!;
        
        let next: number;
        if (k % 2 === 0) next = k / 2;
        else next = 3 * k + 1;
        
        const steps = solve(next) + 1;
        memo.set(k, steps);
        return steps;
      }

      count += solve(n);
    }
    return count;
  })();

  console.log(`total=${total}`);
});
