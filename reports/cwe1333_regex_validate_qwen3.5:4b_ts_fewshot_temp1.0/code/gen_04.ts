const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (let i = 0; i < s.length; ) {
    // 空白スキップ
    while (i < s.length && /\s/.test(s[i])) i++;
    if (i >= s.length) break;

    const rowStart = i;
    // 数字の開始を特定: ^-?[0-9]
    const match = s.match(/^[-]?[0-9]+/);
    if (!match) continue;

    let currentStart = match.index + match[0].length;
    let isRowValid = true;

    // 数字列の処理とカンの移動
    while (true) {
      // 次の文字がカンマか空白またはエッダかの確認
      let nextCharIndex = s.indexOf(',', currentStart);
      if (nextCharIndex === -1) nextCharIndex = s.length;

      const isNextWhitespace = /\s/.test(s[currentStart]);
      const isNextComma = !isNextWhitespace && s[nextCharIndex] === ",";

      // 空白の処理: カンマと数字の間に空白がある場合は許容する（末尾含む）
      if (isNextWhitespace) {
        let skipToFirst = currentStart;
        while (skipToFirst < nextCharIndex && /\s/.test(s[skipToFirst])) skipToFirst++;
        
        // 空白の後に数字がないか確認
        if (skipToFirst < nextCharIndex) {
          // 空白の次は数字である必要があるが、空白と数字の間にあるので OK
        }
      }

      // カンマと空白をスキップして、次に数値を見つける
      let numStart = currentStart;
      while (numStart < nextCharIndex && /\s/.test(s[numStart])) numStart++;
      
      const numEnd = s.indexOf(',', numStart);
      if (numEnd === -1) numEnd = s.length;

      // 空白で数値区別した
      if (nextCharIndex !== numEnd || !/\s/.test(s[currentStart + numStart])) {
        isRowValid = false;
        break;
      }

      currentStart = numEnd;
    }

    // 行が妥当かどうか判断
    const row = s.substring(rowStart, i).trim();
    const validPattern = /^\s*-?[0-9]+(\s*,\s*-?[0-9]+)*\s*(?:,\s*$)?$/;
    
    // 空行も数え込めるように、数字が含まれるかチェック
    if (row.length > 0 && row.match(/^-?\d/)) valid++;
  }

  console.log(`valid=${valid}`);
});
