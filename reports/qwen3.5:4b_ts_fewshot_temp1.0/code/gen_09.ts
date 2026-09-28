const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const strArray = s.split(",");
  const uniqueSet = new Set<number>();
  let sum = 0n;

  for (const item of strArray) {
    const trimmed = item.trim();
    if (trimmed === "") continue;
    
    const numValue: any = parseInt(trimmed, 10);
    const isNaN = Number.isNaN(numValue);

    if (!isNaN) {
      uniqueSet.add(numValue);
      sum += BigInt(numValue);
    }
  }

  console.log(`count=${uniqueSet.size} sum=${sum.toString()}`);
});
