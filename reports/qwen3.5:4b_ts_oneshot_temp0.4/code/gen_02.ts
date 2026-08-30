const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const tokens = s.split(/[\s,]+/);
  const uniqueNumbers = new Set<number>();
  let sum = 0n;

  for (const token of tokens) {
    if (token.trim() === "") continue;
    const n = parseInt(token, 10);
    if (Number.isNaN(n)) continue;
    if (uniqueNumbers.has(n)) continue;
    uniqueNumbers.add(n);
    sum += BigInt(n);
  }

  console.log(`count=${uniqueNumbers.size} sum=${sum}`);
});
