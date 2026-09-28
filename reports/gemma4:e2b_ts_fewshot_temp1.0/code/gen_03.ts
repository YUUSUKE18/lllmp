const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  let input = Buffer.concat(data).toString("utf8");
  const parts = input.split(',');
  const uniqueNumbers = new Set<number>();
  let sum = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    
    // チェック：整数として解釈できるか、かつ重複していないか確認
    if (!Number.isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  let count = uniqueNumbers.size;
  let totalSum = 0;
  
  // Setから要素を取り出して合計を計算
  for (const num of uniqueNumbers) {
    totalSum += num;
  }

  console.log(`count=${count} sum=${totalSum}`);
});
