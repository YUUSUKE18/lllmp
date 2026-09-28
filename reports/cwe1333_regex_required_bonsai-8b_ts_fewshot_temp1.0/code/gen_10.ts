const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split(/\r\n|\r|\n/);
  for (const line of lines) {
    line = line.trim();
    if (!line) continue;
    const matches = line.match(/\d+(?:,\d+)*\d+/);
    if (matches && matches.length > 1) valid++;
  }
  console.log(`valid=${valid}`);
});
