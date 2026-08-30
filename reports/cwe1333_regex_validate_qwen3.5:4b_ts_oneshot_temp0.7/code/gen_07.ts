const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const parts = trimmed.split(/,+/);
    const allNums = parts.every((p) => /^\d+$/.test(p));
    if (allNums && parts.length > 0) validCount++;
  }
  console.log(`valid=${validCount}`);
});
