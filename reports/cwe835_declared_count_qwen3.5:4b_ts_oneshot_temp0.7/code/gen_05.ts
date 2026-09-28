const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let count: bigint = 0n;
  let sum: bigint = 0n;

  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    if (parts.length < 1) continue;

    const n = parseInt(parts[0], 10);
    if (Number.isNaN(n)) continue;

    let idx: bigint = 0n;
    for (const val of parts.slice(1)) {
      if (val.trim() === "") continue;
      const v = BigInt(parseInt(val, 10));
      if (Number.isNaN(Number(v))) continue; // 安全確認のため、BigInt が有効なケースのみ（実際は parseInt の結果が NaN でない限り）
      count += 1n;
      sum += v;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
