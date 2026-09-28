const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0n;
  for (const line of s.split("\n")) {
    if (line.trim() === "") continue;
    const parts = line.split(",");
    for (const part of parts) {
      if (!part.includes(":")) continue;
      const [valStr, cntStr] = part.split(":");
      const val = parseInt(valStr.trim(), 10);
      const cnt = parseInt(cntStr.trim(), 10);
      if (isNaN(val) || isNaN(cnt)) continue;
      if (cnt < 0) continue;
      count += cnt;
      sum += BigInt(val) * BigInt(cnt);
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
