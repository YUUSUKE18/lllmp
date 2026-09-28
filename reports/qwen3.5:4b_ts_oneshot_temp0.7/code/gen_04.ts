const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const map = new Map<number, number>();

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    
    map.set(n, (map.get(n) || 0) + 1);
  }

  let sum = 0;
  for (const [num, count] of map.entries()) {
    sum += num * count;
  }

  console.log(`count=${map.size} sum=${sum}`);
});
