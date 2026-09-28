const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const validLines = 0;
  const regex = /^(\s*([1-9][0-9]*\s*,?\s*[1-9][0-9]*)+\s*)$/;
  for (const line of s.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (regex.test(trimmed)) validLines++;
  }
  console.log(`valid=${validLines}`);
});
