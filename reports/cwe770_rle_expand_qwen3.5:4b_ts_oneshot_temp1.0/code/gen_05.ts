const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = BigInt(0);
  const parts = s.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || isNaN(Number(trimmed)) === true) continue;
    const valueStr = trimmed.split(":")[0].trim();
    const countStr = trimmed.substring(valueStr.length + 1).trim();
    if (valueStr === "" || Number.isNaN(Number(valueStr))) continue;
    if (countStr === "") continue;
    const v = BigInt(Number(valueStr));
    const c = BigInt(Number(countStr));
    if (c < 0n) continue;
    sum += v * c;
    count += Number(c);
  }
  console.log(`count=${count} sum=${sum}`);
});
