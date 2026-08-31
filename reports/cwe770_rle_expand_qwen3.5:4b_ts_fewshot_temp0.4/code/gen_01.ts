const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  for (const token of s.split(",")) {
    if (token.trim() === "") continue;
    const [valStr, repStr] = token.split(":");
    if (valStr.length === 0 || repStr.length === 0) continue;
    const val = parseInt(valStr.trim(), 10);
    const rep = parseInt(repStr.trim(), 10);
    if (isNaN(val) || isNaN(rep) || rep < 0) continue;
    count += BigInt(rep);
    sum += BigInt(val) * BigInt(rep);
  }
  console.log(`count=${count} sum=${sum}`);
});
