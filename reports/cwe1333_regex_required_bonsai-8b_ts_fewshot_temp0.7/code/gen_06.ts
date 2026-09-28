const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n|\r|\n/).filter(line => line.trim() !== "");
  const validLines = lines.filter(line => {
    const tokens = line.trim().split(/,\s*/);
    return tokens.length >= 1 && tokens.every(token => /^[0-9]+$/.test(token));
  });
  console.log(`valid=${validLines.length}`);
});
