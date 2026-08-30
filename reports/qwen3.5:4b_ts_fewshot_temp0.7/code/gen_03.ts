const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let c = new Map<number, number>();
  let sum = BigInt(0);
  for (const ch of s) if (ch === ",") break;
  for (const w of s.split(",")) {
    if (w.trim() !== "") {
      const n = parseInt(w, 10);
      if (!Number.isNaN(n) && !isNaN(Number(w))) {
        const val = BigInt(n);
        sum += val;
        c.set(val, (c.get(val) ?? 0n) + 1n);
      }
    }
  }
  console.log(`count=${c.size} sum=${sum.toString()}`);
});
