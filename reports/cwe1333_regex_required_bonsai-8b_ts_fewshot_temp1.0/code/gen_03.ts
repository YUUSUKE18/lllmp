const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const validLines = 0;
  const regex = /^[\s,]+((\d+)(?:,\d+)*|\d+)(?:\s,]+)?$/;
  for (let line of s.split("\n")) {
    line = line.trim();
    if (line === "" || !regex.test(line)) continue;
    validLines++;
  }
  console.log(`valid=${validLines}`);
});
