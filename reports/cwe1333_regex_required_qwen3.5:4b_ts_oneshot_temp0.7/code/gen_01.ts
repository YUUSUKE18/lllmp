const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    
    // 正規表現: 空白をスキップして数字とカンマのみが連なり、末尾のカンマは許容
    // ^: 行の始点
    // \s*: 先頭の空白を無視
    // (?=[\d,]|\$): 正則マッチする文字があるか、または終止子の直前 (非占有断言)
    // [\d,]+: 1 回以上の数字またはカンマ
    // (\s*$): 末尾の空白と終止子
    const pattern = /^[\d,]+\s*$/;
    
    if (pattern.test(trimmed)) {
      validCount++;
    }
  }
  console.log(`valid=${validCount}`);
});
