const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;
  let isValid = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!Number.isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      isValid = true;
    }
  }

  // 空の要素や数値でない要素は無視されるため、countとmaxが正しく計算されているか確認する。
  // 課題の要求に従い、有効な整数のみをカウントし最大値を求める。
  if (count > 0) {
    console.log(`count=${count} max=${max}`);
  } else if (parts.length > 0) {
    // 有効な整数が一つもなかった場合（例: 入力が空または非数のみ）
    console.log(`count=0 max=-Infinity`); // または適切なデフォルト値。ここでは実質的に count=0 で十分だが、maxの初期値に依存する。
  } else {
     // 入力全体が空だった場合
     console.log(`count=0 max=-Infinity`); 
  }
});
