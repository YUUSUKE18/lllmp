const lines: string[] = [];
process.stdin.on("data", (c: Buffer) => lines.push(c.toString()));
process.stdin.on("end", () => {
  const trimmedLines = lines.map(l => l.trim()).filter(l => l !== "");
  let validCount = 0;

  for (const line of trimmedLines) {
    if (line.length === 0) continue; // 空行は無視するが、本来は「妥当ではない」とみなすべきか？
    // 問題文: 「空行、および数字とカンマ以外を含む行は妥当ではありません。」
    // これは「判定対象となる行」の定義に関わる。通常 blank line は valid とみなさず counting しない。
    // ただし、空白行も入力として来ることがあり、「その行は妥当ではない」としてカウントするか？
    // 「標準出力へ ... valid=<妥当な行数> ... 」とするが、空行が「数字とカンマ以外を含む」に該当するか？
    // 空行は数字やカンマも含んでいないので、「数字とカンマ以外を含む行」という条件を厳密に解釈すると：
    // - 空行: 文字列が empty なので "数字またはカンマ" が含まれていない → 妥当ではない
    // - 'a': 妥当ではない
    // - ',1,2,' : 末尾のスペースや初期のカンマのみなら？'1,2' は ok, ',1,2,' は OK（末尾 comma 許容）
    // - '1,2 abc' → なし

    let isInvalid = false;
    // 前後空白を既に trim しているが、内部の空白も許容すべきか？「数字とカンマ以外を含む行」→ 空白は許容される？
    // 「空白は無視する」とは前処理での意味。内容自体に空白文字が含まれると「妥当ではない」？
    // 例: "1 , 2" → 空欄があるので、"数字またはカンマ" が含まれていない部分がある → invalid

    let clean = line; // 既に trim 済み

    // カンマ区切り整数列として判定するロジック
    // 妥当条件:
    // - 1 個以上の数字列がカンマで区切られていること
    // - 末尾カンマ許容
    // - 数字とカンマ以外（空白も含む？）は不可。空行は数字・カンマも含まない → invalid

    let parts = [];
    // カンマで分割する前処理：空白を除外せず、直接 split を行うが、空白があるかチェックが必要。
    if (/[^,\d]/.test(clean)) {
      // 空白以外の文字がないか？数字とカンマのみ許容
      // ただし「末尾のカンマは許容」と言っているが、「1,2,」なら ok
      // 「数字とカンマ以外を含む行は妥当ではありません」→ ' ', 'a', '-' など全て禁止
      isInvalid = true;
    } else {
      // カンマで分割
      const rawParts = clean.split(",");
      parts = rawParts.map(p => p.trim());

      // 空行の場合：clean === "" → 上記の正则チェックは false → enters else
      // but if clean is empty, then split gives [], which means "no number list" → invalid
      if (parts.length === 0) {
        isInvalid = true;
      } else {
        // 各部分が数値（整数）であるかチェック
        let hasNonNumericPart = false;
        for (const p of parts) {
          if (!/^\d+$/.test(p)) {
            hasNonNumericPart = true;
            break;
          }
        }

        // または空文字が含まれる（trim 後でも空？例えば "1,,2" → parts=["",""]）
        for (const p of parts) {
          if (!p.length || !/^\d+$/.test(p)) hasNonNumericPart = true;
        }

        if (hasNonNumericPart) isInvalid = true;
      }
    }

    // 空行の場合：clean === "" → は "数字とカンマ以外を含む" に該当するか？
    // 文字列が空なので、"包含" なし → "包含以外のもの"なし → valid? しかし文脈上は「0 個以上の数字列」→ 1 個以上必要
    // 問題: 「1 個以上の数字列がカンマで区切られて並んでいることです。」
    // -> 空行は 0 個 → invalid

    if (!isInvalid) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
