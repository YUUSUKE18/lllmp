const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = s.split(/[,,\s]+/).map(x => parseInt(x, 10)).filter(n => !Number.isNaN(n));
  const unique = new Set<number>();
  let sum: bigint = 0n;
  let count: bigint = 0n;
  
  for (const n of nums) {
    if (unique.has(n)) continue;
    unique.add(n);
    const bigN = BigInt(n);
    sum += bigN;
    count += 1n;
  }
  console.log(`count=${count} sum=${sum}`);
});
