const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;
  
  for (const line of lines) {
    // 行が空白のみであれば（trim で空文字列になる）、妥当とみなさない。
    // ただし、入力文書の末尾の余白などによる完全な空白行は除外する必要があるが、
    // 問題の「空行」というのは明らかに内容がないものとして扱う。
    // 正規表現：^[\s,]+$ で一致する場合のみ有効（1 つ以上の数字とカンマ）。
    if (!line.trim()) {
      // 空白だけの行は妥当ではない（仕様：「1 個以上の数字列が...」）
      continue;
    }

    const pattern = /^\s*((\d+)(,\s*\d+)*\s*)?\s*$/;
    if (pattern.test(line)) {
      // 注意: \d+ は少なくとも 1 つの数字、(\d+, )* はそれ以外のカンマを含む部分。
      // しかし、末尾のカンマも許容されているため、「123,」のような形も OK。
      // 正しい正規表現は「何らかの数字列とカンマが存在する」というもの。
      // 「数字とカンマ以外を含まない」かつ「数字が存在する」
      
      if (/[\s,.]+\d/.test(line) && !line.match(/[^,\s\d]/)) {
        // さらに厳密に: 空白、数字、カンマのみで構成されているか確認
        const cleanLine = line.replace(/\s/g, "");
        const onlyNumAndComma = /^[\d,]+$/.test(cleanLine);
        
        if (onlyNumAndComma) {
          // 末尾の「0」が含まれていないことを確認する必要はない。
          // ただし、「数字列」とあるので「少なくとも一つの数字」が存在する必要がある。
          const hasNumber = /\d/.test(line);
          
          if (hasNumber) {
            validCount++;
          }
        }
      }
    }
  }
  
  console.log(`valid=${validCount}`);
});
