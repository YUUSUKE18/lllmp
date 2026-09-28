const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8").trim();
  const lines = s.split(/\r\n|\n+/);
  let valid = 0;
  for (const line of lines) {
    const parts = line.split(/,\s*/);
    if (parts.length < 2) continue;
    let isInteger = true;
    for (const part of parts) {
      if (/[^0-9]/.test(part)) {
        isInteger = false;
        break;
      }
    }
    if (isInteger) valid++;
  }
  console.log(`valid=${valid}`);
});
