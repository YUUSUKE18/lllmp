const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split("\n").filter(line => line.trim() !== "");
  for (const line of lines) {
    const parts = line.split(",");
    if (parts.length === 0) continue;
    let isNumeric = true;
    for (const part of parts) {
      if (part.trim() === "") continue;
      if (!/^\d+$/.test(part)) {
        isNumeric = false;
        break;
      }
    }
    if (isNumeric && parts.length >= 1) valid++;
  }
  console.log(`valid=${valid}`);
});
