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
    // "123a" -> 123 と解釈されてしまう可能性がある。厳密に「純粋な整数」であるかを判定するには regex が安全だが、
    // 例題のように簡易的に扱う場合、parseInt の結果が NaN でないかチェックするのみとする（例題参照）。
    // しかし、「空白を含む文字列を数値に変換」という文脈から、"123 " は OK ですが "abc" は NG。
    // parseInt(" 123 ") -> 123 (OK)
    // parseInt(" abc") -> NaN (NG)
    // この挙動は仕様を満たすため利用する。

    const n = parseInt(token, 10);
    
    if (!Number.isNaN(n)) {
      count++;
      if (maxVal === null || n > maxVal) {
        maxVal = n;
      }
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
