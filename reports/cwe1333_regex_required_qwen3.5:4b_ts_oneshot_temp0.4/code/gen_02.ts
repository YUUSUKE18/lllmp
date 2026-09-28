const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (line.trim() === "") continue;
    const regex = /^\s*(\d+(?:,\s*\d+)*)(?:,\s*?)?\s*$/;
    if (regex.test(line)) {
      validCount++;
    }
  }
  console.log(`valid=${validCount}`);
});
