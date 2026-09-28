const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let validCount = 0;
  for (const line of lines) {
    if (!line.trim()) continue;
    const regex = /^\s*([0-9]+)(?:\s*,[0-9]+)*\s*$/;
    if (regex.test(line)) {
      validCount++;
    }
  }
  console.log(`valid=${validCount}`);
});
