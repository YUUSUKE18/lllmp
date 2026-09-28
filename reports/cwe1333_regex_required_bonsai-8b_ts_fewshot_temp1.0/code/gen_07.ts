const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let valid = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const regex = /^[\d,]+$/;
    if (regex.test(trimmed)) valid++;
  }
  console.log(`valid=${valid}`);
});
