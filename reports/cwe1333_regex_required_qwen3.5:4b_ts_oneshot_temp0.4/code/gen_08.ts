const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;

    const regex = /^\s*(\d+)(?:,\s*\d+)*\s*$/;
    if (regex.test(trimmed)) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
