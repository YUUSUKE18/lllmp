const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split(/\r\n|\r|\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const parts = trimmed.split(",");
    if (parts.length < 2) continue;
    const regex = /^\d+$/;
    let isValid = true;
    for (const part of parts) {
      if (!regex.test(part)) {
        isValid = false;
        break;
      }
    }
    if (isValid) valid++;
  }
  console.log(`valid=${valid}`);
});
