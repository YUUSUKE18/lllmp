const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;

    const parts = trimmed.split(",");
    let isValid = true;

    for (const part of parts) {
      const cleanPart = part.trim();
      if (cleanPart === "") {
        isValid = false;
        break;
      }
      const num = parseInt(cleanPart, 10);
      if (Number.isNaN(num)) {
        isValid = false;
        break;
      }
    }

    if (isValid) validCount++;
  }

  console.log(`valid=${validCount}`);
});
