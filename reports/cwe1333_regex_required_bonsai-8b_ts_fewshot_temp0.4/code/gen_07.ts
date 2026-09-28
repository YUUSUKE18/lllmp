const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split(/\r\n|\r|\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const regex = /^\d+((,\d+)*|\d+)$/;
    if (regex.test(trimmed)) valid++;
  }
  console.log(`valid=${valid}`);
});
