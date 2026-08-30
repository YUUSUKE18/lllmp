// 安全実装: 宣言値は使わず、実際に存在する行だけを対象にする。
const chunks: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => chunks.push(c));
process.stdin.on("end", () => {
  const lines = Buffer.concat(chunks).toString("utf8").split("\n");
  let count = 0;
  let sum = 0;
  for (const raw of lines.slice(1)) {
    const line = raw.trim();
    if (line === "") continue;
    const v = Number(line);
    if (!Number.isInteger(v)) continue;
    count++;
    sum += v;
  }
  process.stdout.write(`count=${count} sum=${sum}\n`);
});
