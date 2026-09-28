const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const input = Buffer.concat(data).toString("utf8");
  const lines = input.split(/\r?\n/).filter(line => line.length > 0);

  let validCount = 0;
  const regex = /^[\d,]+,?$/; // 数字とカンマのみ、末尾にカンマがあっても良い

  for (const line of lines) {
    // 行の前後の空白を無視するため、trim() ではなく、正規表現での判定を優先する
    // ただし、仕様では「行の前後の空白は無視します」とあるため、ここでは行の内容をそのまま判定する。
    // 空行は既にfilterで除外されている。

    // 正規表現で判定: 1個以上の数字とカンマのみで構成され、末尾にカンマがあっても良い
    // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
    // これは、カンマで区切られた数字のシーケンスである必要がある。

    // 妥当性の判定をより厳密に行うために、行全体をチェックする。
    // 「1 個以上の数字列がカンマで区切られて並んでいる」
    // これは、数字とカンマのみで構成され、かつ空でないことを意味する。
    // 例えば "1,2,3" や "1,2," は妥当。
    // "abc" や "1,a" は不妥当。

    // 正規表現の解釈:
    // ^[\d,]+$: 行全体が数字とカンマのみで構成されている。
    // 末尾のカンマは許容される。

    let isValid = false;
    if (line.length > 0) {
        // 行全体が数字とカンマで構成されているかチェック
        const matches = line.match(/^[\d,]+,?$/);
        if (matches) {
            // さらに、数字列が一つ以上存在するか確認する。
            // これは、行が空文字列でなく、かつ数字やカンマが含まれていることを意味する。
            // filterで空行を除外しているので、ここでは行が数字とカンマのみで構成されていればOKと見なす。
            // 例外的に " ," のようなケースは除外されるべき。

            // 空白を無視するルールを考慮すると、行全体が数字とカンマのみで構成されていれば良い。
            // 実際に入力行に空白が含まれる可能性があるため、trimしてからチェックする。
            const trimmedLine = line.trim();
            if (trimmedLine.length > 0) {
                 // 空白を除いた行が、数字とカンマのみで構成されているか確認
                 const content = trimmedLine.replace(/,/g, '');
                 if (/^\d+$/.test(content)) {
                     isValid = true;
                 }
            }
        }
    }


    // 仕様の再解釈: 「1 個以上の数字列がカンマで区切られて並んでいる」
    // これは、カンマで区切られた要素が全て整数である、ということを意味する。
    // 例: "1,2,3" -> 3つの整数列。
    // この判定には、カンマで区切って個々の要素が整数であるかを確認するのが最も適切。

    const trimmed = line.trim();
    if (trimmed.length === 0) {
      continue; // 空行は妥当ではない
    }

    // カンマで分割し、各要素が整数であるか、またはカンマの後の要素が整数であるかを確認する。
    // 末尾のカンマは許容される。
    const parts = trimmed.split(',');
    let allValid = true;

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();
        if (part.length > 0) {
            // 各要素が整数であるかチェック
            if (!/^\d+$/.test(part)) {
                allValid = false;
                break;
            }
        }
    }

    if (allValid) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
