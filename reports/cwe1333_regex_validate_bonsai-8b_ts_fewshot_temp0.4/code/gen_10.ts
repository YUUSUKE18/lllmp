const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split(/\r\n|\r|\n/);
  for (const line of lines) {
    line = line.trim();
    if (line === "") continue;
    const parts = line.split(",");
    if (parts.length === 0) continue;
    let isInteger = true;
    for (const part of parts) {
      const num = parseInt(part, 10);
      if (Number.isNaN(num)) isInteger = false;
    }
    if (isInteger) valid++;
  }
  console.log(`valid=${valid}`);
});
