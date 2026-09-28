const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白を含む文字列を数値に変換する際、trim() を行わないと "123a" が NaN にされるが、
    // 仕様は「整数として解釈できない要素も無視」とあるので、parseInt の挙動を利用し、
    // 結果が有効な整数か確認する必要がある。ただし、Node.js の parseInt は末尾の文字を無視して数値部分だけ返すため、
    // "123a" -> 123 と解釈されてしまう可能性がある（仕様意図に反するか）。
    // より厳密に「純粋な整数」であるかを確認するため、trim() を行い、完全一致する数を取得する。

    const trimmed = token.trim();
    
    if (!/^-?\d+$/.test(trimmed)) continue;

    const n = parseInt(trimmed, 10);
    count++;

    if (maxVal === null || n > maxVal) {
      maxVal = n;
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
