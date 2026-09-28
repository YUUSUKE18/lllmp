const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0, max = -9007199254740992;
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    const num = parseInt(trimmed, 10);
    if (Number.isNaN(num)) continue;
    count++;
    if (num > max) max = num;
  }
  console.log(`count=${count} max=${max}`);
});
