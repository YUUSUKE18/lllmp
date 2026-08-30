const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);
  for (const token of s.split(",")) {
    if (token.trim() === "") continue;
    const n = parseInt(token, 10);
    if (Number.isNaN(n)) continue;
    const bigN = BigInt(n);
    count.set(bigN, (count.get(bigN) ?? 0n) + 1n);
    sum += bigN;
  }
  let c = 0;
  let sStr = "0";
  for (const [k, v] of count.entries()) {
    c++;
    if (v > 1n) {
      const strVal = k.toString();
      if (sStr === "0") sStr = strVal;
      else sStr += "," + strVal;
    }
  }
  console.log(`count=${c} sum=${sStr}`);
});
