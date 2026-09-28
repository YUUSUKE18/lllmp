const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0n; // 64bit integer using BigInt
  for (const part of s.split(",")) {
    if (part.trim() === "") continue;
    const [valStr, cntStr] = part.split(":");
    if (valStr.length !== 2 || !Number.isInteger(parseInt(valStr[0], 10)) || valStr[1] !== ":") continue;
    if (!Number.isInteger(parseInt(cntStr, 10))) continue;
    const val = parseInt(valStr, 10);
    const cnt = parseInt(cntStr, 10);
    if (cnt < 0) continue;
    count += cnt;
    sum += BigInt(val) * BigInt(cnt);
  }
  console.log(`count=${count} sum=${sum}`);
});
