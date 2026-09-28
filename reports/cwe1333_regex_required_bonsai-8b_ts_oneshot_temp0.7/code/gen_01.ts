const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const validLines = s.trim().split(/\n+/).filter(line => {
    const stripped = line.trim();
    return stripped && /^[\d,\s]+$/u.test(stripped) && stripped.length > 0;
  });
  console.log(`valid=${validLines.length}`);
});
