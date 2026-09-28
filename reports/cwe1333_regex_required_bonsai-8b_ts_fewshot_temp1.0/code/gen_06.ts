const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const validLines = 0;
  const lines = s.split("\n").filter(line => {
    line.trim() && line.split(",").every(cell => {
      cell.trim() && /^\d+$/.test(cell);
    });
    return line.trim();
  });
  console.log(`valid=${validLines}`);
});
