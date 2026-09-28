const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (let i = 0; i < s.length; ) {
    if (s[i] === "\n") {
      i++;
      continue;
    }
    const lineStart = i;
    while (i < s.length && s[i] !== "\n" && s[i] !== "") i++;
    const lineEnd = i;
    const line = s.slice(lineStart, lineEnd);
    
    // 空白のみを含む行は無視（ただし、問題文の「妥当とは...」より、空行は妥当ではないと解釈しつつも、前後の空白を無視する方針で処理）
    // 再考：「空行...は妥当ではありません」とあり、「行の前後の空白は無視します」とある。
    // したがって、空白のみを含む行は「数字列がない」ため妥当ではない。
    
    const trimmedLine = line.trim();
    if (trimmedLine === "") {
      continue; // 空行はスキップ（出力には含めない）
    }

    // 解析：カンマ区切りの整数列
    // 正規表現で数字の連続を捉えるか、手動で区切る。
    // 要件: "1 個以上の数字列がカンマで区切られて並んでいる"
    // 末尾のカンマは許容
    
    const parts = trimmedLine.split(/,+/);
    
    // 各部分が有効な整数文字列であるかチェック
    for (const part of parts) {
      if (!/^-?\d+$/.test(part)) {
        break; // 無効な数字が含まれるため、この行は無効
      }
    }
    
    // 上記ループで無効な部分があれば、valid をインクリメントしない（または無効とみなす）
    // しかし、ループ内で break した場合、parts の構造は崩れている可能性がある。
    // より堅牢なチェック: 分割後のすべての要素が整数であるか確認
    
    let isLineValid = true;
    for (const part of parts) {
      if (!/^-?\d+$/.test(part)) {
        isLineValid = false;
        break;
      }
    }

    // 空行はスキップしたが、もし「妥当ではありません」という条件を満たすなら count に含めない。
    // 要件: "空行...は妥当ではありません" -> valid のカウントに含めない。
    
    if (isLineValid) {
      valid++;
    }
    
    // 空白の処理について再確認: 「行の前後の空白は無視します」
    // これは trim() を行うことで満たしている。
    // ただし、もし「空白を含むが数字がない行」は妥当ではないので、isLineValid が false にされる。
  }
  console.log(`valid=${valid}`);
});
