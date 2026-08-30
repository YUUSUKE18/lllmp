const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    const parts = line.split(",");
    let isOk = true;
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.length === 0 || !Number.isInteger(Number(trimmed))) {
        isOk = false;
        break;
      }
    }
    if (isOk) valid++;
  }
  console.log(`valid=${valid}`);
});
