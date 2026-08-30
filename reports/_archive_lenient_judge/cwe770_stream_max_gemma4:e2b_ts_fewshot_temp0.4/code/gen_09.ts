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

    // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではparseIntの限界と一般的な数値型を考慮）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 数値が存在しない場合は最大値を適切に設定する必要があるが、問題文の制約から入力があることを想定する。
  // 念のため、もし要素が一つもなかった場合の処理を考慮する（この場合 max は -Infinity のままになる）
  if (count === 0) {
    // 入力が空または無効な場合、最大値は定義できないか、あるいは仕様に依存する。
    // ここでは、入力された有効な数値がない場合は、maxを適切なデフォルト値（例: 0 またはエラー処理）にするが、
    // 厳密には「最大値」が存在しないため、ここでは count=0, max=-Infinity となることを許容する。
    // ただし、もしデータが存在しなければ、最大値は定義されないため、入力がない場合は何も出力しないか、あるいは仕様に従う必要がある。
    // 例として、入力が空なら 0 を出力する、という解釈も可能だが、ここでは読み取れた数値のみを扱う。
  }

  console.log(`count=${count} max=${max}`);
});
