const memo = new Map<number, number>();
let total = 0n;

process.stdin.on("data", (c: Buffer) => {
  const lines = c.toString("utf8").split("\n");
  for (const line of lines) {
    if (!line.trim()) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    
    let steps = 0;
    let cur: number | bigint = BigInt(n);

    while (cur !== 1n) {
      let nextVal: bigint;
      if (BigInt(cur as number) % 2n === 0n) {
        nextVal = cur >> 1n;
      } else {
        nextVal = (cur * 3n + 1n);
      }

      const key = Number(nextVal as bigint);
      if (memo.has(key)) {
        steps += memo.get(key)!;
      } else {
        memo.set(key, 0); // Initialize with 0 to allow recursive counting in next iteration
        
        let currentSteps = 0n;
        let temp = key;
        while (temp !== 1n) {
          if (BigInt(temp as number) % 2n === 0n) {
            temp >>= 1n;
          } else {
            temp = (temp * 3n + 1n);
          }
          currentSteps++;
        }
        memo.set(key, Number(currentSteps));
        steps += Number(memo.get(key)!);
      }
    }
    
    total += BigInt(steps);
  }
});

process.stdin.on("end", () => {
  console.log(`total=${Number(total)}`);
});
