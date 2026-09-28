const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const uniqueNumbers = new Set<number>();
  let sum = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能かチェック
    if (!Number.isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  let count = uniqueNumbers.size;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  console.log(`count=${count} sum=${sum}`);
});
