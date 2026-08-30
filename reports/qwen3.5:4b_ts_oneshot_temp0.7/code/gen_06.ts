const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = new Set<number>();
  let sum = BigInt(0);

  for (const f of s.split(/[,\s]+/)) {
    if (f.trim() === "") continue;
    try {
      const n = parseInt(f, 10);
      if (!Number.isNaN(n)) {
        nums.add(n);
        sum += BigInt(n);
      }
    } catch (e) {
      // 整数として解釈できない要素は無視
    }
  }

  let count = 0;
  for (const n of nums) {
    count++;
  }

  console.log(`count=${count} sum=${sum}`);
});
