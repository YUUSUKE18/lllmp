const cache = new Map<number, number>();
process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(c).toString("utf8");
  let lines = [];
  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    lines.push(n);
  }
  process.stdin.on("end", () => {
    let total = 0n;
    for (const n of lines) {
      let val = BigInt(n);
      let steps = 0n;
      while (val !== 1n) {
        const current = Number(val);
        if (!cache.has(current)) {
          cache.set(current, 0n);
        }
        if (current % 2 === 0) {
          val = BigInt(current / 2);
        } else {
          val = BigInt(3 * current + 1);
        }
        steps += 1n;
      }
      const memoizedSteps = cache.get(Number(val));
      if (memoizedSteps !== undefined) {
        steps += memoizedSteps;
      } else {
        let tempVal = val;
        while (tempVal !== 1n) {
          const currNum = Number(tempVal);
          if (!cache.has(currNum)) {
            cache.set(currNum, 0n);
          }
          if (currNum % 2 === 0) {
            tempVal = BigInt(currNum / 2);
          } else {
            tempVal = BigInt(3 * currNum + 1);
          }
        }
        const stepsToOne = cache.get(Number(tempVal));
        if (stepsToOne !== undefined) {
          steps += stepsToOne;
        }
      }
      total += steps;
    }
    console.log(`total=${total}`);
  });
});
