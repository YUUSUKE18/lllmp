const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  let input = Buffer.concat(data).toString("utf8");
  const parts = input.split(",");

  const uniqueNumbers = new Set<number>();
  let sum = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェックし、重複をチェックする
    if (!Number.isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  let count = uniqueNumbers.size;
  let sum_val = 0;
  for (const num of uniqueNumbers) {
    sum_val += num;
  }

  console.log(`count=${count} sum=${sum_val}`);
});
