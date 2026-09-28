const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,/).filter(w => w.trim() !== "");
  let max = -9007199254740992;
  for (const e of elements) {
    const n = parseInt(e, 10);
    if (Number.isNaN(n)) continue;
    if (n > max) max = n;
  }
  console.log(`count=${elements.length} max=${max}`);
});
