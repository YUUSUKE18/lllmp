const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(line => line.trim());
  let validLines = 0;
  for (const line of lines) {
    if (line === "" || !line.includes(",")) continue;
    const parts = line.split(",");
    if (parts.length < 2) continue;
    for (const part of parts) {
      if (!/^\d+$/.test(part)) continue;
    }
    validLines++;
  }
  console.log(`valid=${validLines}`);
});
