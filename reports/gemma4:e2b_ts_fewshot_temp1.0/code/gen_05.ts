const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = s.split(',');
  const uniqueNumbers = new Set<number>();
  let sum = 0;

  for (const item of numbers) {
    const trimmedItem = item.trim();
    if (trimmedItem === "") continue;

    const num = parseInt(trimmedItem, 10);
    if (!Number.isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  const count = uniqueNumbers.size;
  uniqueNumbers.forEach(n => {
    sum += n;
  });

  console.log(`count=${count} sum=${sum}`);
});
