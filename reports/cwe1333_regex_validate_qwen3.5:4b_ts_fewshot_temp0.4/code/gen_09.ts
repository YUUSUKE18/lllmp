const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (let i = 0; i < s.length; ) {
    // 空白スキップ
    while (i < s.length && /\s/.test(s[i])) i++;
    if (i >= s.length) break;

    const start = i;
    let hasDigit = false;
    let commaCount = 0;

    // 数字とカンマの読み込み
    while (i < s.length) {
      const ch = s[i];
      if (/\d/.test(ch)) {
        hasDigit = true;
        i++;
      } else if (ch === ",") {
        commaCount++;
        i++;
      } else {
        break; // 数字やカンマ以外が見つかった
      }
    }

    // 空白スキップ（行末含む）
    while (i < s.length && /\s/.test(s[i])) i++;

    // 妥当性の判定: 少なくとも 1 つの数字があり、末尾のカンマは OK
    if (hasDigit) valid++;
  }
  console.log(`valid=${valid}`);
});
