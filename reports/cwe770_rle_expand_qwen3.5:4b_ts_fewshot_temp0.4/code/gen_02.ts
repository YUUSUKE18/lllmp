const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const parts = line.split(",");
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed === "") continue;
      const colonIndex = trimmed.indexOf(":");
      if (colonIndex === -1 || !/^\d+$/.test(trimmed.slice(0, colonIndex)) || !/^\d+$/.test(trimmed.slice(colonIndex + 1))) {
        continue;
      }
      const val = BigInt(parseInt(trimmed.slice(0, colonIndex), 10));
      const times = BigInt(parseInt(trimmed.slice(colonIndex + 1), 10));
      if (times < 0n) continue;
      count += Number(times);
      sum += val * times;
    }
  }
  console.log(`count=${Number(count)} sum=${sum}`);
});
