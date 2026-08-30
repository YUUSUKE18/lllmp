const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェックし、64bit範囲内か確認（ここでは単純にNaNチェックと数値比較で対応）
    if (!Number.isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 最初の要素が整数でない場合、maxは-Infinityのままになる可能性があるため、
  // 要素が存在し、かつ有効な数値があった場合にのみ出力する。
  // 問題文の制約から、少なくとも1つの整数が存在すると仮定して処理を進める。
  // もし入力が空または全て無効な場合、maxは-Infinityになるが、ここでは単に計算された値をそのまま出力する。

  console.log(`count=${count} max=${max}`);
});
