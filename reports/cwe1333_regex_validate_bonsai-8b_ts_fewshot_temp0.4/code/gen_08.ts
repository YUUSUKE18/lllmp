const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split("\n")) {
    line = line.trim();
    if (!line) continue;
    const parts = line.split(",");
    if (parts.length < 2) continue;
    let isInteger = true;
    for (const part of parts) {
      if (!/^\d+$/.test(part)) {
        isInteger = false;
        break;
      }
    }
    if (isInteger) valid++;
  }
  console.log(`valid=${valid}`);
});
