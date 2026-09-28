const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    const parts = line.split(",");
    if (parts.length < 1) continue;
    let allValid = true;
    for (const part of parts) {
      if (/[^0-9]/.test(part)) {
        allValid = false;
        break;
      }
    }
    if (allValid) valid++;
  }
  console.log(`valid=${valid}`);
});
