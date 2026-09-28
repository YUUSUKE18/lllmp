const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (let i = 0; i < s.length; ) {
    // 行の始点を探す（改行前の位置）
    while (i > 0 && s.charCodeAt(i - 1) === 10) i--;
    if (i >= s.length) break;

    const rowStart = i;
    // 空白スキップ
    while (i < s.length && s[i] === " ") i++;
    
    if (i >= s.length) break; // 行が空の場合（空白のみ）

    // 数字の列を検出
    let numbersFound = false;
    while (i < s.length) {
      // 数字の有無を確認
      const ch = s.charCodeAt(i);
      if ((ch >= 48 && ch <= 57)) {
        numbersFound = true;
        i++;
      } else {
        break;
      }
    }

    // カンマで区切る（末尾のカンマも許容）
    while (i < s.length && s[i] === ",") {
      i++;
    }

    // 行の終わりの判定
    if (i >= s.length || s[i] === "\n") {
      // 空白を含めるまで跳び続ける
      while (i < s.length && s[i] === " ") i++;
      
      // 行が空または数字なしの場合、妥当ではない（条件: 1 個以上の数字列）
      if (!numbersFound) {
        lines++;
      } else {
        // 空白を含まず、かつ数字が含まれている -> 妥当
        // ただし、最初のチェックで numbersFound が true であれば、上記の while 文で i が移動しているので
        // ここでの判定は「この行が完全に数字とカンマのみ（末尾除外）であるか」を確認する必要がある。
        // 仕様: "空行、および数字とカンマ以外を含む行は妥当ではありません"
        
        // 修正：空白を含めるまで進んだ後の位置 i が改行または文字列終端にあること、かつその間に数字がなかった場合のみ無効。
        // 既に while (i < s.length && s[i] === " ") i++; で進んでいるので、この時点での内容を確認する。
        
        // 再検討: 
        // 1. 行の開始位置は s[rowStart ... end-1] で定義される。
        // 2. 空白をスキップしてから数字を探し、見つかったなら numbersFound=true。
        // 3. カンマをスキップする。
        // 4. 次の部分（改行または文字列終端）まで進み、その間に「数字とカンマ以外」が含まれていないか確認する必要がある。
        
        // より堅牢なアプローチ：
        // この行が有効であるためには、「数字とカンマ以外」というものがないこと。
        // 空行は有効ではない。
        // なので、s.substring(rowStart, i).trim() が「数字とカンマのみ」である必要があるか？
        // ただし、仕様では「末尾のカンマは許容します」とあるが、「数字とカンマ以外を含む行は妥当ではありません」とも。
        
        // 再実装:
        // 1. 行の文字列を抽出 (s.substring(rowStart, i))
        // 2. trim() をして空か否かをチェック
        // 3. 文字列が「数字とカンマのみ」かチェックする。
        
        // しかし、上記のロジックでは numbersFound=true の場合でも、その後に他の文字が含まれていないか確認していない。
        // 修正:
        // 行の範囲を確定後、その中のすべての文字が '0'-'9', ',', または空白のみであることを確認する。
        
        // 簡易化されたロジック:
        // 1. 行の開始位置 rowStart を特定 (改行前)
        // 2. 行の終了位置 endPos を特定 (次の改行または文字列終端)
        // 3. rowStr = s.slice(rowStart, endPos)
        // 4. if (rowStr.trim() === "") => invalid (空行は妥当ではない)
        // 5. else if (!/^[0-9,]+$/.test(rowStr)) => invalid (数字とカンマ以外を含む)
        // 6. else => valid
        
        // ただし、上記の /.../.test は regex です。外部パッケージなしで OK ですが、手動チェックも可能です。
        // 仕様: "1 個以上の数字列がカンマで区切られて並んでいる" 
        // これは regex ^[0-9,]+$ に相当します。
        
        // 再確認:
        // - 空行は妥当ではない (条件: 1 個以上の数字列)
        // - 数字とカンマ以外を含む行は妥当ではない
        
        // なので、行の文字列が "[0-9,]+" の正規表現に一致するかチェックする。
        // 空白は無視するので、trim() をした上でチェックする。
        
        const rowStr = s.slice(rowStart, i);
        if (rowStr.trim() === "") {
          lines++; // 空行 -> invalid
        } else {
          let validRow = true;
          for (let j = 0; j < rowStr.length; j++) {
            const c = rowStr[j];
            if (!((c >= '0' && c <= '9') || c === ',')) {
              validRow = false;
              break;
            }
          }
          if (validRow) {
            lines++; // valid -> カウント追加
          } else {
            lines++; // invalid -> カウント追加
          }
        }
      }
    }
  }
  console.log(`valid=${lines}`);
});
