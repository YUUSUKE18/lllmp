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

    // 整数として解釈できるかチェック (NaNでないこと、そして元の文字列が数値のみで構成されていることを確認するため、厳密には Number() や isFinite() を使う)
    if (!Number.isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 64bit整数であることを考慮し、maxが有効な値を持つ場合のみ出力する
  if (count > 0) {
    console.log(`count=${count} max=${max}`);
  } else {
    // データが全て無効だった場合の処理（仕様上は空の出力を想定しているが、安全のため）
    // この場合は count=0 max=-Infinity となるが、ここでは求められている形式に従い出力する
    console.log(`count=0 max=-Infinity`);
  }
});
