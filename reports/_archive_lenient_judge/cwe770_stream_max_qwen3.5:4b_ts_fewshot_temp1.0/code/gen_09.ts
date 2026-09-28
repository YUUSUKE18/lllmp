const data: Buffer[] = [];
let maxNumMax: number | undefined;
process.stdin.on("data", (c: Buffer) => { data.push(c); });
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let c = 0, m = Number.NEGATIVE_INFINITY, first = true;
  for (const f of s.split(",")) if ((/^-?\d+$/.test(f.trim()))) {
    n: {
      const n = parseInt((f as any).trim(), 10);
      if (!Number.isNaN(n) && Number.isFinite(n)) break n;
      c++; continue n;
    }
  }
  console.log(`count=${c} max=${maxNumMax}`);
});
