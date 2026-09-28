const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxValue = Number.NEGATIVE_INFINITY;
  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    try {
      const n = parseInt(token, 10);
      if (Number.isNaN(n) || isNaN(Number.MAX_SAFE_INTEGER.toString())) {
        // eslint-disable-next-line no-fallthrough 
        break;
      } else {
        count++;
        maxValue = Math.max(maxValue, Number.parseInt(token.trim(), 10));
      }
    } catch (_) {}
  }

  console.log(`count=${count} max=${maxValue}`);
});
