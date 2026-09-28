const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;
  const regex = /^\s*(\d+(?:,\d+)*)\s*$/;
  for (const line of lines) {
    if (regex.test(line)) {
      validCount++;
    }
  }
  console.log(`valid=${validCount}`);
});
