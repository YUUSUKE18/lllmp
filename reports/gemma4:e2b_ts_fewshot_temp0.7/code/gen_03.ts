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

    // 整数として解釈でき、かつ重複していないかチェック
    if (!Number.isNaN(num)) {
      if (!uniqueNumbers.has(num)) {
        uniqueNumbers.add(num);
        sum += num;
      }
    }
  }

  console.log(`count=${uniqueNumbers.size} sum=${sum}`);
});
