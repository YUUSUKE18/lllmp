const memo = new Map<number, number>();
let total = 0n;

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(process.stdin._readableState.buffer).toString("utf8");
  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    let n: number;
    try {
      n = parseInt(line.trim(), 10);
    } catch {
      continue;
    }
    if (isNaN(n) || n < 1) continue;

    const getSteps = (num: number): number => {
      if (memo.has(num)) return memo.get(num)!;
      let steps = 0;
      while (num !== 1) {
        if (num % 2 === 0) num = Math.floor(num / 2);
        else num = 3 * num + 1;
        steps++;
      }
      memo.set(num, steps);
      return steps;
    };

    const steps = getSteps(n);
    total += BigInt(steps);
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
