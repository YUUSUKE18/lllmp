const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0, first = true;
  for (const line of s.split(/\r\n+/)) {
    if (line.trim() === "") continue;
    const parts = line.split(/,\s*/);
    if (parts.length < 2) continue;
    let validCount = 0;
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      validCount++;
    }
    if (validCount > 0) valid++;
  }
  console.log(`valid=${valid}`);
});
