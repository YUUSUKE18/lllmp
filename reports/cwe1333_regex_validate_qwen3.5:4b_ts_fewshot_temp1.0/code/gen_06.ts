const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validLines = 0;
  for (const line of s.split("\n")) {
    if (line.length === 0) continue;
    const trimmed = line.trim();
    if (trimmed === "") continue;
    if (!/^\d+(,\d+)*$/.test(trimmed)) continue;
    validLines++;
  }
  console.log(`valid=${validLines}`);
});
