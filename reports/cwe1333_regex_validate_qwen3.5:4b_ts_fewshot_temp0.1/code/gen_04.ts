const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    const parts = line.split(",");
    let isOk = true;
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed === "") {
        isOk = false;
        break;
      }
      const n = parseInt(trimmed, 10);
      if (Number.isNaN(n)) {
        isOk = false;
        break;
      }
    }
    if (isOk) valid++;
  }
  console.log(`valid=${valid}`);
});
