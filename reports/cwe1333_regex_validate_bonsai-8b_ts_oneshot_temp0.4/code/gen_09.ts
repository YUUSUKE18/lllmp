const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0, first = true;
  for (const line of s.split(/\n+/)) {
    line = line.trim();
    if (!line) continue;
    const parts = line.split(/,/);
    let isValid = true;
    for (const part of parts) {
      part = part.trim();
      if (!part || !/^\d+$/.test(part)) {
        isValid = false;
        break;
      }
    }
    if (isValid && parts.length > 1) {
      valid++;
      first = false;
    }
  }
  console.log(`valid=${valid}`);
});
