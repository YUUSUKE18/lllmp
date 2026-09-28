const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const rows = data.map(r => r.toString("utf8").trim());
  const validRows = rows.filter(row => row && row.split(/,/).length >= 1);
  console.log(`valid=${validRows.length}`);
});
