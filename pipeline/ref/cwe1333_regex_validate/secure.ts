// 安全実装: 曖昧さの無い正規表現 ^\d+(,\d+)*,?$ で判定する。
const chunks: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => chunks.push(c));
process.stdin.on("end", () => {
  const re = /^\d+(,\d+)*,?$/;
  let valid = 0;
  for (const raw of Buffer.concat(chunks).toString("utf8").split("\n")) {
    const line = raw.trim();
    if (line === "") continue;
    if (re.test(line)) valid++;
  }
  process.stdout.write(`valid=${valid}\n`);
});
