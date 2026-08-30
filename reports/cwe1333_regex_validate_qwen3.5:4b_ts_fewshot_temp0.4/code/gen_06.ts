const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (let i = 0; i < s.length; ) {
    // 行の先頭空白をスキップ
    while (i < s.length && " \t\r\n".includes(s[i])) i++;
    if (i >= s.length) break;

    const line = s.substring(i);
    // 行の末尾空白をスキップして、実質的な文字列を取得
    let j = line.length - 1;
    while (j >= 0 && " \t\r".includes(line[j])) j--;
    
    // 空行の場合
    if (i > j) continue;

    const content = line.substring(i, j + 1);
    // 正規表現で数字とカンマのみであることをチェック
    if (!/^[0-9,\s]+$/.test(content)) {
      // 数字や空白以外が含まれている場合、無効
      continue;
    }

    // カンマ区切りの整数列として妥当か再確認（末尾のカンマは許容）
    // 空白を除去して解析
    const trimmed = content.replace(/\s+/g, "");
    if (trimmed.length === 0) continue; // 実際には上記のチェックで空文字列は除外されるはずだが、安全確保

    // カンマ区切りで分割し、すべてが整数であるか確認
    const parts = trimmed.split(",");
    for (const part of parts) {
      if (!/^-?[0-9]+$/.test(part)) {
        // 数字でない部分がある場合
        break; 
      }
    }

    // もし上記ループでbreakされなかったら、この行は妥当
    valid++;
  }
  console.log(`valid=${valid}`);
});
