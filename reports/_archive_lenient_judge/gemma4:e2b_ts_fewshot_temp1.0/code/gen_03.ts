const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = s.split(",");
  const uniqueNumbers = new Set<number>();

  for (const numStr of numbers) {
    // 空文字列や空白を無視する
    if (numStr.trim() === "") continue;

    const num = parseInt(numStr.trim(), 10);

    // 整数として解釈できるかチェック
    if (!Number.isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  const count = uniqueNumbers.size;
  let sum = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  console.log(`count=${count} sum=${sum}`);
});
