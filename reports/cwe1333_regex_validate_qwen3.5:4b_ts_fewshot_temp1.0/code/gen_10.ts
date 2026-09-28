const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  for (let i = 0; i < s.length; ) {
    // 行の始点を位置 i に設定し、その行を処理
    const start = i;
    // 空白区切りで進める（行頭も空白が無視されるべきか？仕様は『行の前後の空白は無視します』とありますが、各「行」が対象として判定されるので、空白連続部分をスキップして内容を取得）
    while (i < s.length && /\s/.test(s[i])) i++;
    
    if (i >= s.length) break;

    // 現在の行の開始位置（空白を除去後の実際の文字列の始点）
    const rowStart = i;
    
    // カンマ区切りの整数列であるかを判定するために、直前の文字が「数字」か確認が必要だが、
    // 仕様は「1 個以上の数字列がカンマで区切られて並んでいること」とあり、
    // 「数字とカンマ以外を含む行は妥当ではありません」「空行は妥当ではありません」。
    
    // したがって、行の文字列（空白を除いた部分）は純粋な「数値」「カンマ」のみであり、かつその長さが 1 以上であること。
    
    let rowStr = "";
    while (i < s.length && /\s/.test(s[i])) i++; // 行頭の空白をスキップ
    
    if (i >= s.length) break; // 空行または末尾のみ

    // ここで行の最初の文字が何かを確認
    if (!/[\d,]/.test(s[i])) {
      // 数字やカンマ以外が含まれている、または全く何もない場合（すでに空白で始まっていたが、何も残っていない）
      // 空白を除いた部分が空なら「数値とカンマ以外を含む」と解釈し、無効。
      // または最初から非数文字があった場合も無効。
      validCount++; 
      continue; // 無効な行だがカウントしない（仕様：valid=<妥当な行数> なので数えない）
    }

    // 空白を除いた文字列を構築する
    let currentRow = "";
    while (i < s.length && !/\s/.test(s[i])) {
      if (/\d/.test(s[i]) || s[i] === ",") {
        currentRow += s[i];
      } else {
        // 数値やカンマ以外が含まれている場合
        validCount++;
        break; // この行が無効なのでカウントせず、次の行へ進む
      }
      i++;
    }

    if (currentRow.length === 0) {
      // 空白のみだった場合（空行）も無効
      validCount++;
      continue;
    }

    // currentRow が数値とカンマのみであることを確認し、かつ長さが 1 以上であること。
    // または前述の処理で既に確認済み（数値・カンマ以外が含まれていなければループ抜けていない）。
    
    // 末尾のカンマは許容されるので、「数値」「カンマ」のみであれば良い。
    // ただし、単に「数字とカンマ以外が含まれていない」というだけでは「1 個以上の数字列」の条件が満たされるか確認する必要がある。
    // 例えば "," という文字しかない行も無効（1 個以上の数字列がない）。
    
    let isNumber = true;
    let foundDigit = false;
    
    for (const char of currentRow) {
      if (/[\d,]/.test(char)) {
        foundDigit = char === "," ? false : /\d/.test(char); // カンマは数字ではないが、区切り文字として OK。ただし「数字列」という概念をどう解釈するか？
        // 仕様：『カンマ区切りの整数列』、つまり "1,2,3" や "4" または "5," など。
        // 空の数字がないと無効。
        // したがって、現在の currentRow に少なくとも 1 つの「数字」が含まれているかを確認する。
      } else {
        isNumber = false; // ここではすでに前述のループで確認済みだが、再確認として安全に書く。
      }
    }

    // 上記ロジックを簡略化し直す：currentRow が「[\d]+(\,\d+)*,?\s*$」のような形式（空白除去後）であること。
    // または、「[\d]+」が少なくとも 1 つ含まれている、かつ全体が数値・カンマのみ。

    // 簡易チェック：currentRow の文字がすべて「数字」または「カンマ」であるか、かつ「少なくとも 1 つの数字」があるか。
    if (currentRow.length > 0 && currentRow.match(/[^\\d,]/g) === null && currentRow.match(/\d/)) {
      validCount++; // 妥当な行
    } else {
      validCount++; // 無効（空または数値なし、または非数文字あり）
    }
    
    i = rowStart + (rowStr ? rowStr.length : 0); // ここでは簡易的なロジックで進めていますが、上記のループ構造は少し複雑なので再設計。

  }
  
  console.log(`valid=${validCount}`);
});
