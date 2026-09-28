const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    // 空白を除く（trim）
    const trimmed = line.trim();
    // 空行は妥当ではない
    if (trimmed === "") continue;

    // 正規表現：数字列（正の整数、0、負の整数）がカンマで区切られている
    // \d+ は 1 文字以上の数字。-? はオプションのマイナス。
    // ^...$ で全行マッチし、数値とカンマのみが含まれることを保証する
    const regex = /^(\d|-?\d)(?:,(?:\d|-?\d))*$|^(\d|-?\d)$(?:,(?:\d|-?\d))*$/;

    if (regex.test(trimmed)) {
      validCount++;
    }
  }
  console.log(`valid=${validCount}`);
});
