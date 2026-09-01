const results = new Map<number, number>();

async function main() {
  const data: Buffer[] = [];
  process.stdin.on("data", (c: Buffer) => data.push(c));
  process.stdin.on("end", async () => {
    try {
      const s = Buffer.concat(data).toString("utf8");
      let lines = s.trim().split("\n");
      if (lines.length > 0 && lines[0].trim() === "") lines.shift();

      for (const line of lines) {
        const tokens = line.split(/\s+/);
        for (const t of tokens) {
          const n = parseInt(t, 10);
          if (!Number.isNaN(n)) {
            results.set(n, await collatzStep(n));
          }
        }
      }

      let total = 0;
      for (const count of results.values()) {
        total += count;
      }
      console.log(`total=${total}`);
    } catch (e) {
      // ignore errors from invalid input
    }
  });
}

async function collatzStep(n: number): Promise<number> {
  if (results.has(n)) return results.get(n)!;
  
  let steps = 0;
  let current = n;

  while (current !== 1) {
    steps++;
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    results.set(current, await collatzStep(current));
  }

  results.set(n, steps);
  return steps;
}

main();
