const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const validLines = 0;
  const regex = /^[\s\S]*$(\d+)(?:,[\s\S]*\d+)*$/;
  for (const line of s.split("\n")) {
    if (line.trim() === "") continue;
    const trimmed = line.trim();
    if (trimmed.match(regex)) validLines++;
  }
  console.log(`valid=${validLines}`);
});
