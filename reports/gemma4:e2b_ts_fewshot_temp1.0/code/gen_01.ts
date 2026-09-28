const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  let input = Buffer.concat(data).toString("utf8");
  const parts = input.split(",");

  // 重複を除いた整数をセットに格納する
  const uniqueNumbers = new Set<number>();
  
  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;
    
    const num = parseInt(trimmedPart, 10);
    
    // 整数として解釈でき、かつNaNでないかを確認する
    if (!Number.isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  // 個数と合計を計算する
  const count = uniqueNumbers.size;
  let sum = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  // 結果を出力する
  console.log(`count=${count} sum=${sum}`);
});
