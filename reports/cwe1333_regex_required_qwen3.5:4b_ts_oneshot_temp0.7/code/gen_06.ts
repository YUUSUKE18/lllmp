const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let count = 0;
  const regex = /^\s*([0-9,\-\s]+)\s*$/; // 修正: 問題文の「数字とカンマ以外を含む行は妥当ではありません」を考慮し、数字とカンマしか含まない（空白含む）ことを確認する Regex を作成。ただし、末尾のカンマ許容のため、文字列が「数字」と「カンマ」のみで構成されているかチェック。
  // 再考: 「数字とカンマ以外を含む行は妥当ではありません」→ 行の内容が、空白を除いた後に、すべてが数字またはカンマであること。
  // 正規表現の構造: ^\s*(?:[\d,]+|\s)+$ ではなく、簡潔に「文字列が空白のみ、数字のみ、またはカンマのみで構成されているか」をチェック。
  // より厳密なアプローチ: regex = /^[\s0-9,\d]*$/; (これは正解に近い)
  // 最終的な正規表現: ^\s*[0-9,]*\s*$ が「数字とカンマ以外を含まない」ことを保証する。ただし、「1 個以上の数字列がカンマで区切られて並んでいること」という条件も満たす必要がある。
  // 「1 個以上の数字列」が意味しない場合（例：","）は妥当ではないか？問題文「1 個以上の数字列がカンマで区切られて並んでいることです」→ 少なくとも 1 つの数字があるべき。
  
  const isValidLine = (line: string): boolean => {
    // 空白のみ、または空白と数字とカンマのみで構成されているか確認
    // さらに「1 個以上の数字列」があるか確認（つまり数字が少なくとも 1 回現れている）
    if (!line.trim()) return false; // 空行は除外
    
    const trimmed = line.trim();
    const hasNumber = /[0-9]/.test(trimmed);
    
    // 正規表現: 空白、数字、カンマのみを含むもの
    const onlyAllowedChars = /^[\s0-9,]+$/.test(line);
    
    return hasNumber && onlyAllowedChars;
  };

  for (const line of lines) {
    if (isValidLine(line)) {
      count++;
    }
  }
  console.log(`valid=${count}`);
});
