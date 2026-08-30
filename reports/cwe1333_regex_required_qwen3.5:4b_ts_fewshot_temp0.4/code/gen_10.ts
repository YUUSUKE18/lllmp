const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const lines = s.split("\n").filter(line => line.length > 0);
  for (const line of lines) {
    if (/^\s*([0-9]+(,?[0-9]*)?)\s*$/.test(line)) {
      validCount++;
    }
  }
  console.log(`valid=${validCount}`);
});
