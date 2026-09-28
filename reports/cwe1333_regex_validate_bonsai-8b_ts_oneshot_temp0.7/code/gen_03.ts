const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0, first = true;
  for (const line of s.split("\n")) {
    line = line.trim();
    if (!line) continue;
    if (/[^0-9,]/g.test(line)) continue;
    const parts = line.split(",");
    if (parts.length > 1) valid++;
  }
  console.log(`valid=${valid}`);
});
