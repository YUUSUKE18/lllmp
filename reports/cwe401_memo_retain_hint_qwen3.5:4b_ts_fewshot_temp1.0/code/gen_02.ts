const memo: Map<number, number> = new Map();

const calculateCollatzStep = (n: number): number => {
  if (!memo.has(n)) {
    const steps = n === 1 ? 0 : n % 2 === 0 ? n / 2 + calculateCollatzStep(Math.floor(n / 2)) : (3 * n + 1) + calculateCollatzStep(3 * n + 1);
    memo.set(n, steps);
  }
  return memo.get(n)!;
};

process.stdin.on("data", (c: Buffer) => {
  const data: Uint8Array[] = [];
  data.push(c);
});

process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0n;
  
  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    
    let value: bigint | undefined = undefined;
    while (true) {
      const match = line.match(/^([+-]?\d+)/);
      if (!match || match[1] === "") break;
      
      try {
        const n = BigInt(match[1]);
        if (value !== undefined && value == n) {
          total += BigInt(calculateCollatzStep(Number(n)));
        } else {
          const steps = calculateCollatzStep(Number(n));
          if (steps > 0n) {
            total += BigInt(steps);
          }
        }
        value = n;
      } catch (_) {
        break;
      }
      line = line.slice(match[1].length).trim();
    }
  }

  console.log(`total=${Number(total)}`);
});
