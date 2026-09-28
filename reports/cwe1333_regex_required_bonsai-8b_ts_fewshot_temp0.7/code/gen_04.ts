const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split("\n");
  for (const line of lines) {
    const stripped = line.trim();
    if (!stripped) continue;
    const parts = stripped.split(",");
    if (parts.length < 2) continue;
    const isInteger = parts.every(part => /^\d+$/.test(part));
    if (isInteger) valid++;
  }
  console.log(`valid=${valid}`);
});
