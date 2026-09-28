const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const part of parts) {
    if (part.trim() === "") continue;
    const n = parseInt(part.trim(), 10);
    if (Number.isNaN(n)) continue;
    
    if (!(n in count)) count.set(n, 0);
    count.set(n, count.get(n)! + 1);
    sum += BigInt(n);
  }

  const total = count.size;
  console.log(`count=${total} sum=${Number(sum)}`);
});
