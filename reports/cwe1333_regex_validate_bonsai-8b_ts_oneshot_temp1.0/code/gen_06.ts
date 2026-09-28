const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n|\r|\n/);
  let valid = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const parts = trimmed.split(",");
    if (parts.length === 0) continue;
    if (parts.every(part => /^\d+$/.test(part))) valid++;
  }
  console.log(`valid=${valid}`);
});
