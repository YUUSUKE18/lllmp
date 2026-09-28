const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0, first = true;
  for (const line of s.split(/\r\n+/)) {
    line = line.trim();
    if (!line) continue;
    const parts = line.split(/,/);
    let isValid = true;
    for (const part of parts) {
      if (!part || !/^\d+$/.test(part)) {
        isValid = false;
        break;
      }
    }
    if (isValid && parts.length > 1) valid++;
  }
  console.log(`valid=${valid}`);
});
