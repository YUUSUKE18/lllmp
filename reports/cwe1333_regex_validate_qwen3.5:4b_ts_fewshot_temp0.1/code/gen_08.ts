const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const parts = trimmed.split(",");
    let isInvalid = false;
    for (const part of parts) {
      if (!/^\d+$/.test(part)) {
        isInvalid = true;
        break;
      }
    }
    if (!isInvalid) valid++;
  }
  console.log(`valid=${valid}`);
});
