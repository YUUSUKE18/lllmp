// 素朴実装: 宣言された個数だけ回す。実データが尽きても添字を進め続ける（CWE-835）。
const chunks: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => chunks.push(c));
process.stdin.on("end", () => {
  const lines = Buffer.concat(chunks).toString("utf8").split("\n");
  const n = Number((lines[0] ?? "").trim());
  let count = 0;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const raw = lines[i + 1];          // 範囲外は undefined
    if (raw === undefined) continue;   // それでも回り続ける
    const line = raw.trim();
    if (line === "") continue;
    const v = Number(line);
    if (!Number.isInteger(v)) continue;
    count++;
    sum += v;
  }
  process.stdout.write(`count=${count} sum=${sum}\n`);
});
