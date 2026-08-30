const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;

  for (const line of lines) {
    if (line.trim() === "") continue;
    
    const trimmed = line.trim();
    const parts = trimmed.split(",");
    
    let isValid = true;
    
    for (const part of parts) {
      const val = parseInt(part, 10);
      if (Number.isNaN(val)) {
        isValid = false;
        break;
      }
    }
    
    if (isValid) validCount++;
  }

  console.log(`valid=${validCount}`);
});
