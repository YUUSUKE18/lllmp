const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0, first = true;
  for (const line of s.split(/\r\n+/)) {
    line = line.trim();
    if (!line) continue;
    const parts = line.split(/,/);
    if (parts.length < 2) continue;
    for (const part of parts) {
      if (!/^\d+$/.test(part)) continue;
    }
    valid++;
    first = false;
  }
  console.log(`valid=${valid}`);
});
