const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const validRows = s.split(/\r?\n/).filter((line) => /^\s*(\d+(,\s*\d+)*|,.*)\s*$/.test(line));
  console.log(`valid=${validRows.length}`);
});
