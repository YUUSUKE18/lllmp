const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n/g).filter(line => line.trim() !== "");
  let valid = 0;
  for (const line of lines) {
    const parts = line.split(/,\s*/);
    if (parts.length < 2) continue;
    let hasNumbers = false;
    for (const part of parts) {
      const num = parseInt(part, 10);
      if (Number.isNaN(num)) continue;
      hasNumbers = true;
      break;
    }
    if (hasNumbers) valid++;
  }
  console.log(`valid=${valid}`);
});
