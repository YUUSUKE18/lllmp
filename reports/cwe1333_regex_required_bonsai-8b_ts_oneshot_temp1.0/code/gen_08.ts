const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n+/);
  let valid = 0;
  for (const line of lines) {
    const stripped = line.trim();
    if (!stripped) continue;
    const matches = stripped.match(/\d+([,\d]*)?\d+([,\d]*)?/);
    if (matches && matches.length > 1) {
      valid++;
    }
  }
  console.log(`valid=${valid}`);
});
