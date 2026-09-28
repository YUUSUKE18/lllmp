const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split("\n")) {
    if (line === "") continue;
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    // 空白以外が全て数字かカンマか、且つ最初と最後に空白がないことを確認
    // または、末尾のカンマを含む場合も許容
    // 条件: 行の前後の空白を無視し、中身が数値とカンマのみで構成されていること
    let isValidLine = true;
    for (const ch of trimmed) {
      if (!/^\d$/.test(ch) && ch !== ",") {
        isValidLine = false;
        break;
      }
    }
    // 末尾のカンマは許容されるが、数字がない空行は既にスキップ済み
    // 実際には trimmed が空ならすでに continue で跳ねる。
    // 「1 個以上の数字列」が必要なので、少なくとも 1 つの数字が含まれているか確認
    if (isValidLine) {
      const hasDigit = /\d/.test(trimmed);
      if (hasDigit) valid++;
    }
  }
  console.log(`valid=${valid}`);
});
