const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const validLines = 0;
  const lineRegex = /^[\s\S]*?(\d+)(?:,\d+)*[\s\S]*?$/;
  for (const line of s.split("\n")) {
    if (line.trim() === "") continue;
    if (line.match(lineRegex)) validLines++;
  }
  console.log(`valid=${validLines}`);
});
