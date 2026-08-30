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

  // 空の入力があった場合の処理（全ての要素が無効だった場合）
  if (count === 0) {
    // このケースでは、最大値の定義が問題になるが、ここでは仕様に従い count=0, max=-Infinity を出力する。
    // ただし、整数列が存在しない場合は、通常は適切なエラー処理が必要だが、例に倣い計算結果を出力する。
  }

  console.log(`count=${count} max=${max}`);
});
