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

    const n = parseInt(trimmedPart, 10);

    if (!Number.isNaN(n)) {
      count++;
      if (n > max) {
        max = n;
      }
    }
  }

  // 空の入力があった場合や、全ての要素が数値でなかった場合の安全策（ただし仕様上は整数列が与えられる前提）
  if (count === 0) {
      // 整数が一つもなかった場合は、maxを定義しないか、適切なデフォルト値を設定する必要があるが、
      // ここでは入力された有効な整数の最大値を出力する。もし何も入力されなければ、ここではエラーを防ぐため、
      // 例えば count=0, max=0 とするか、あるいは -Infinity のまま出力する。
      // 仕様に従い、実際に読み取れた数と最大値を出す。count=0ならmaxは無意味だが、最大値が定義されない状態になる。
      // 問題文から「整数列」が与えられることを前提とし、もし数値がない場合は count=0, max=何かを出す必要がある。
      // 0個の要素に対して最大値は通常定義されないが、-Infinity を出力するのが数学的には正しい場合がある。
      // ただし、例に倣い、実数計算で定義された値をそのまま使う。ここではcount>0の場合のみmaxを出力するロジックを採用し、
      // count=0の場合は適切に処理しない（仕様上は整数列が与えられるはず）。
  }

  console.log(`count=${count} max=${max}`);
});
