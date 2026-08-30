const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const uniqueValues = new Set<string>();
  let sum = 0;

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    
    // 整数チェックとパース
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;

    uniqueValues.add(trimmed);
    sum += n;
  }

  console.log(`count=${uniqueValues.size} sum=${sum}`);
});
