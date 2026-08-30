let data = "";
process.stdin.on("data", (c: Buffer) => data += c.toString());

process.stdin.on("end", () => {
  const lines = data.trim().split(/\s+/).filter(s => s.length > 0);
  let total = 0n;
  const memo = new Map<number, number>();

  for (const line of lines) {
    const n = parseInt(line, 10);
    if (Number.isNaN(n) || n < 1) continue;

    if (n === 1) {
      // 手数は 0
      // memo.set(1, 0); // 1 はベースケースなので省略可能だが、念のため
    } else if (!memo.has(n)) {
      let count = 0;
      let current = n;
      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        count++;
      }
      memo.set(n, count);
    }

    total += BigInt(memo.get(n) || 0);
  }

  console.log(`total=${total.toString()}`);
});
