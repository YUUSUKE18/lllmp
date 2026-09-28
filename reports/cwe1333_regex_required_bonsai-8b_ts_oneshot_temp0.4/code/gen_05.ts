const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const validLines = s.split(/\r\n+/).filter(line => {
    line = line.trim();
    if (!line) return false;
    const regex = /^(\d+)(?:,\d+)*$/;
    return regex.test(line);
  });
  console.log(`valid=${validLines.length}`);
});
