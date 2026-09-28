const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0;

  // カンマで区切って各要素を処理
  const parts = s.split(',');

  for (const part of parts) {
    if (part.trim() === "") continue;

    const partsArr = part.split(':');
    if (partsArr.length !== 2) continue;

    const valueStr = partsArr[0].trim();
    const countStr = partsArr[1].trim();

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    // 値が数値であり、回数が非負であるかチェック
    if (!isNaN(value) && !isNaN(count) && count >= 0) {
      // 要素数と合計を計算
      count += count;
      sum += value * count;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
