const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0); // 合計は 64bit 整数で、BigInt 使用
  let i = 0;
  while (i < s.length) {
    // 空白スキップ
    while (i < s.length && /[\r\n\t\s]/.test(s[i])) {
      i++;
    }
    if (i >= s.length) break;

    let start = i;
    let key: string = "";
    while (i < s.length && !/:/.test(s[i])) {
      key += s[i];
      i++;
    }
    if (key === "") continue; // 値がない場合スキップ

    const value = parseInt(key, 10);
    if (isNaN(value)) continue; // 無効な数値スキップ

    let end = i + 1;
    while (end < s.length && !/[,:\r\n\t\s]/.test(s[end])) {
      end++;
    }

    const delimiterPart = s.slice(start, end);
    const colonPos = delimiterPart.indexOf(":");
    
    // キーとビュートの区切りがない、または値が数式でない場合はスキップ
    if (colonPos === -1) continue;
    const numString = delimiterPart.substring(colonPos + 1).trim();
    if (/[^0-9]/.test(numString)) continue;
    
    let countValue = parseInt(numString, 10);
    if (isNaN(countValue) || countValue < 0) continue;

    count += countValue;
    sum += BigInt(countValue); // BigInt での累加
    
    i = end;
  }
  console.log(`count=${count} sum=${sum}`);
});
