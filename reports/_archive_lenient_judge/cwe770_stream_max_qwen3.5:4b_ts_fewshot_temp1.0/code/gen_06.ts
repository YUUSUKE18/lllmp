const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, max: bigint | undefined;
  for (const w of s.split(",")) {
    if (w.trim() === "") continue;
    try {
      n = BigInt(w);
      if (!max || n > max) {
        max = n;
      }
      count++;
    } catch (_e) {}
  }
  console.log(`count=${count} ${max !== undefined ? `max=${Number(max).toString()}` : "max=undefined"}`);
});
