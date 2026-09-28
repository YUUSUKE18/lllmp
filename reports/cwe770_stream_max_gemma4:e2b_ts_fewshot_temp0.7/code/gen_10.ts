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
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 全ての数値が読み込まれなかった場合（空入力など）の安全策として、count=0, max=-Infinityを返す。
  // ただし、仕様上は整数列が与えられることを前提とする。
  if (count === 0) {
      // 入力が完全に空または無効な数値のみだった場合の処理。ここでは一般的な最大値の定義に従う。
      console.log(`count=0 max=-Infinity`);
  } else {
      console.log(`count=${count} max=${max}`);
  }
});
