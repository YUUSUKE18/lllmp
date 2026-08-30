const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let max = -Infinity;
  let isValidCount = false;

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

  // データが存在する場合のみ結果を出力する（仕様上、空の入力に対する振る舞いは明記されていないが、要素数と最大値を求めるため）
  if (count > 0) {
    console.log(`count=${count} max=${max}`);
  } else {
    // 全て無視された場合（または入力が完全に空だった場合）、ここでは何を出力するか明確にしないが、
    // 数値として解釈できなかった要素は無視されるため、count=0, max=-Infinityとなる。
    // 設問の形式に従い、実行結果のみを出力する。
    console.log(`count=0 max=-Infinity`);
  }
});
