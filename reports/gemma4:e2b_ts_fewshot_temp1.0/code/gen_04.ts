const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  // カンマで分割し、trimして空でないものだけをフィルタリングする
  const numbersStr = s.split(",");
  
  const uniqueNumbers = new Set<number>();
  let sum = 0;

  for (const numStr of numbersStr) {
    const trimmed = numStr.trim();
    if (trimmed === "") continue;

    const num = parseInt(trimmed, 10);
    
    // 整数として解釈できるかチェックし、重複を除外する
    if (!Number.isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  // 重複を除いた数の個数と合計を計算する
  const count = uniqueNumbers.size;
  uniqueNumbers.forEach(n => {
    sum += n;
  });

  // 結果を出力する
  console.log(`count=${count} sum=${sum}`);
});
