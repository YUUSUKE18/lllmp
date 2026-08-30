const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split('\n').length;
  let validLines = 0;

  // 各行をチェック
  for (const line of s.split('\n')) {
    const trimmedLine = line.trim();

    // 1. 空行のチェック
    if (trimmedLine === "") {
      continue; // 空行は妥当ではないが、ここでは行数を数えるためスキップ
    }

    // 2. 正規表現による妥当性の判定
    // 妥当なパターン: 1個以上の数字とカンマのみで構成され、数字が1つ以上含まれている
    // パターン: ^[0-9,]*$ (数字とカンマのみ)
    // さらに、数字が少なくとも1つ含まれていることを確認する
    const regex = /^[0-9,]+$/;

    if (regex.test(trimmedLine)) {
      // 末尾のカンマのみの行も含む (例: "1,2," はOK)
      // ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいる」ことを求めているため、
      // 数字が1つ以上含まれていることを確認する必要がある。
      const hasDigit = /[0-9]/.test(trimmedLine);
      if (hasDigit) {
        validLines++;
      }
    }
  }

  console.log(`valid=${validLines}`);
});
