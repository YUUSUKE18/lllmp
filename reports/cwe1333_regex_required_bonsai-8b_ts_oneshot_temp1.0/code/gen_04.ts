const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const validLines = data
    .map(line => line.trim())
    .filter(line => /^[0-9,+]+(?:[,\s]*[0-9,+]+)*$/.test(line))
    .map(line => line.split(/,\s*/).filter(Boolean).map(Number).join(','))
    .filter(Boolean);
  console.log(`valid=${validLines.length}`);
});
