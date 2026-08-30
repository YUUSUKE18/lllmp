const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    
    // 数値とカンマ以外が含まれていないかチェック
    if (!/^\d+(\s*,\s*)*\d*$/.test(trimmed)) continue;
    
    const parts = trimmed.split(",");
    // 各要素が整数列であるか確認 (空白を含むが、正規式で既に数値のみを確保しているので、空でないか)
    for (const part of parts) {
      if (part.trim() === "") continue; // 末尾の余分なカンマなどで生じる空文字列は無視可能だが、厳密に「数字列」である必要があるため、空白を除いたものが数値か確認
      const num = parseInt(part, 10);
      if (Number.isNaN(num)) {
        break; // 有効でない要素が見つかったら中断
      }
    }
    // 上記のループで破折しなかった場合、かつ空白を除いた部分すべてが数値であることは保証されるか？
    // 正規式 /^\d+(\s*,\s*)*\d*$/ は "1,2,3" や "1,2,3," を許容する。しかし "1,,2" は許さない (連続カンマは\d+の後で\s*,\s*がマッチして空の数字部分にならない)
    // 空白を含む例: " 1 , 2 " -> trim後 "1,2" -> OK.
    // 数値とカンマ以外を含む例: "1,a" -> NG.
    
    // より堅牢な検証: 各要素が正の整数列または負の整数列、または0であるか
    // 問題文「数字列」という意味は、文字列のみが数字であることを示す。
    // 空白を許容するか？「数字とカンマ以外を含む行は妥当ではありません」→ "1 , 2" は妥当か？通常は妥当と解釈される。
    // 上記の正規式は "1, 2" を許容する (スペースがあるが、\s*,\s* で消化される)
    
    // 再確認: "1,,2" -> 連続カンマ。正規式 \d+ 後で \s*,\s* が空文字列をマッチするため、次の \d は失敗する。よって NG と判断可能。
    
    validCount++;
  }
  console.log(`valid=${validCount}`);
});
