const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines: string[] = s.split('\n');
  let validLines = 0;

  for (const line of lines) {
    // 行の前後の空白を無視して、カンマ区切りの整数列として妥当かを判定する
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // カンマ区切りの整数列として解析を試みる
    // 末尾のカンマは許容する
    const parts = trimmedLine.split(',');

    if (parts.length === 0) {
      // これは通常発生しないが、念のため
      continue;
    }

    let isValid = true;
    let hasNumbers = false;

    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart === "") {
        // カンマが連続する場合（例: ,,）や、行全体がカンマのみの場合などを考慮
        // ただし、split(',')の結果、空文字列が生成されるのは連続するカンマや先頭/末尾のカンマの場合。
        // ここでは、数字以外の文字が含まれていないかを確認する。
        continue;
      }

      // 数字のみで構成されているかチェック
      if (!/^\d+$/.test(trimmedPart)) {
        isValid = false;
        break;
      }
      hasNumbers = true;
    }

    // 1個以上の数字列がカンマで区切られて並んでいること、および数字列が存在すること
    if (isValid && hasNumbers) {
      validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
