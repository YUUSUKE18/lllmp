const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const lines = s.split(/\n/);
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === "") continue;
    if (!/^\d+([,\d]+)*$/.test(trimmedLine)) continue;
    validCount++;
  }
  console.log(`valid=${validCount}`);
});
