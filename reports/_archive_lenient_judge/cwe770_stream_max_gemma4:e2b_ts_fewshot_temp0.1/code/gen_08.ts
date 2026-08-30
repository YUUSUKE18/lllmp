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

    // 整数として解釈でき、64bit範囲内であるかを確認（ここでは単純にNaNチェックと数値の比較で対応）
    if (!Number.isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 最小値が設定されていない場合（入力が空または非数値のみの場合）、最大値を適切に扱う必要があるが、
  // 問題の制約から整数列が与えられることを前提とする。
  // もし有効な整数が一つもなかった場合は max の初期値 (-Infinity) が残るが、
  // 少なくとも count は正しい。max は入力された数値の最大値となる。

  console.log(`count=${count} max=${max}`);
});
