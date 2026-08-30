const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const counts = new Map<number, number>();
  let sum = 0n;

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    
    // 64bit 整数として扱うため、BigInt を使用
    const bigN = BigInt(n);
    sum += bigN;
    counts.set(bigN, (counts.get(bigN) || 0n) + 1n);
  }

  let countStr = "";
  let sumStr = "";

  for (const [num, cnt] of counts.entries()) {
    if (countStr !== "") countStr += " ";
    countStr += cnt.toString();
    sumStr += num.toString();
  }

  console.log(`count=${countStr} sum=${sumStr}`);
});
