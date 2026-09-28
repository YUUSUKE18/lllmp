// 素朴実装: ランレングスを実際に展開して配列に載せてから集計する（CWE-770）。
const chunks: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => chunks.push(c));
process.stdin.on("end", () => {
  const text = Buffer.concat(chunks).toString("utf8");
  const values: number[] = [];
  for (const raw of text.split(",")) {
    const tok = raw.trim();
    if (tok === "") continue;
    const idx = tok.indexOf(":");
    if (idx < 0) continue;
    const vs = tok.slice(0, idx).trim();
    const cs = tok.slice(idx + 1).trim();
    if (vs === "" || cs === "") continue;
    const v = Number(vs);
    const c = Number(cs);
    if (!Number.isInteger(v) || !Number.isInteger(c) || c < 0) continue;
    for (let i = 0; i < c; i++) values.push(v);
  }
  let sum = 0;
  for (const v of values) sum += v;
  process.stdout.write(`count=${values.length} sum=${sum}\n`);
});
