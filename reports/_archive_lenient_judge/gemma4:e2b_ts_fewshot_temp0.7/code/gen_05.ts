const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = s.split(',');
  const uniqueNumbers = new Set<number>();
  let sum = 0;

  for (const numStr of numbers) {
    const trimmedNumStr = numStr.trim();
    if (trimmedNumStr === "") continue;

    const num = parseInt(trimmedNumStr, 10);

    // 整数として解釈可能かチェック
    if (!isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  let count = uniqueNumbers.size;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  console.log(`count=${count} sum=${sum}`);
});
