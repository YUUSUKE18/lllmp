// 素朴実装: 入れ子量化子を含む正規表現 ^(\d+,?)+$ で判定する。
// V8 はバックトラック方式なので、数字の連なりに不正文字を付けた行で指数的に爆発する（ReDoS）。
const chunks: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => chunks.push(c));
process.stdin.on("end", () => {
  const re = /^(\d+,?)+$/;
  let valid = 0;
  for (const raw of Buffer.concat(chunks).toString("utf8").split("\n")) {
    const line = raw.trim();
    if (line === "") continue;
    if (re.test(line)) valid++;
  }
  process.stdout.write(`valid=${valid}\n`);
});
