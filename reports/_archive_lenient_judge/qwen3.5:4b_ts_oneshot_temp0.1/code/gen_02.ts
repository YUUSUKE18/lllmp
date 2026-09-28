const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let sum = BigInt(0);
  const counts = new Map<number, number>();

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f.trim(), 10);
    if (Number.isNaN(n) || isNaN(Number(f))) continue;
    
    let count = counts.get(n) ?? 0;
    counts.set(n, count + 1);

    // BigInt で合計を計算し、重複を除いた個数だけ加算する
    sum += BigInt(counts.get(n)) * BigInt(1n); 
  }

  console.log(`count=${counts.size} sum=${sum}`);
});
