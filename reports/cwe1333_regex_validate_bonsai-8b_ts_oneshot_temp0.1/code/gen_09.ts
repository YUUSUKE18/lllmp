const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let valid = 0;
  for (const line of lines) {
    line = line.trim();
    if (!line) continue;
    const parts = line.split(",");
    if (parts.length < 2) continue;
    let isValid = true;
    for (const part of parts) {
      const partTrim = part.trim();
      if (!partTrim || !/^\d+$/.test(partTrim)) {
        isValid = false;
        break;
      }
    }
    if (isValid) valid++;
  }
  console.log(`valid=${valid}`);
});
