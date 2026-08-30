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
    if (!Number.isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // データが存在しない場合の処理（空の入力の場合など）
  if (count === 0) {
    console.log(`count=0 max=-Infinity`); // または適切なデフォルト値。ここでは問題文に従い、読み取れなかった場合は最大値を保持する。
                                      // ただし、整数列が空で、何も数値が見つからなかった場合は、maxの初期値(-Infinity)をそのまま出力するのが厳密である。
  } else {
    console.log(`count=${count} max=${max}`);
  }
});
