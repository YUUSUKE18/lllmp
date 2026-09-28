const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let sum = 0;

  for (const part of parts) {
    if (!part.trim()) continue;

    const pair = part.split(':');
    if (pair.length !== 2) continue;

    const value = parseInt(pair[0], 10);
    const countVal = parseInt(pair[1], 10);

    if (!Number.isNaN(value) && !Number.isNaN(countVal) && countVal >= 0) {
      // value が何回繰り返されるか
      for (let i = 0; i < countVal; i++) {
        sum += value;
      }
      count += countVal;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
