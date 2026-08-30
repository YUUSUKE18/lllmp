const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let sum = 0;

  for (const part of parts) {
    if (part.trim() === "") continue;
    const [valueStr, countStr] = part.split(':');

    if (valueStr && countStr) {
      const value = parseInt(valueStr, 10);
      const countNum = parseInt(countStr, 10);

      if (!isNaN(value) && !isNaN(countNum) && countNum >= 0) {
        count += countNum;
        sum += value * countNum;
      }
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
