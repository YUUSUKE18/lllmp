// 安全実装: 展開せず、個数と合計を算術だけで積み上げる。
const chunks: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => chunks.push(c));
process.stdin.on("end", () => {
  const text = Buffer.concat(chunks).toString("utf8");
  let count = 0;
  let sum = 0;
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
    count += c;
    sum += v * c;
  }
  process.stdout.write(`count=${count} sum=${sum}\n`);
});
