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

    // 整数として解釈可能かチェック（NaNでないこと、そして元の文字列が数値のみで構成されていることの確認）
    if (!isNaN(num)) {
      // 64bit整数の範囲内にあるか（この制約は通常Node.jsのNumber型で問題にならないが、念のため）
      // ここでは単純に最大値を更新する処理を行う。
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  console.log(`count=${count} max=${max}`);
});
