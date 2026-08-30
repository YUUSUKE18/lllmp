const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validLines = 0;
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (line === "") continue;
    if (/\D/.test(line)) continue;
    if (!/\d,/.test(line.trim()) && line.endsWith(',')) {
      if (/^\d+$/.test(line.trim())) validLines++;
    } else if (/^\d+(,\d+)*$/.test(line.trim()) && !line.trim().endsWith(',')) {
      validLines++;
    }
  }
  console.log(`valid=${validLines}`);
});
