const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  const parts = s.split(',');

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (!trimmedPart) continue;

    const colonIndex = trimmedPart.indexOf(':');
    if (colonIndex === -1) continue;

    const valueStr = trimmedPart.substring(0, colonIndex);
    const countStr = trimmedPart.substring(colonIndex + 1);

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    if (!isNaN(value) && !isNaN(count) && count >= 0) {
      // 7:3,2:2 は 7,7,7,2,2 と解釈する。
      for (let i = 0; i < count; i++) {
        sum += BigInt(value);
      }
      count += count;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
