const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = s.split(",");
  const uniqueNumbers = new Set<number>();

  for (const numStr of numbers) {
    const trimmedStr = numStr.trim();
    if (trimmedStr === "") continue;
    const num = parseInt(trimmedStr, 10);
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
