const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = BigInt(0);
  let sum = BigInt(0);
  const tokens = s.split(/,/);
  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed || !/^\d+:\d+$/.test(trimmed)) continue;
    const [valStr, repStr] = trimmed.split(":");
    const val = BigInt(parseInt(valStr.trim(), 10));
    const rep = BigInt(parseInt(repStr.trim(), 10));
    if (rep < 0n) continue;
    count += rep;
    sum += val * rep;
  }
  console.log(`count=${count} sum=${sum}`);
});
