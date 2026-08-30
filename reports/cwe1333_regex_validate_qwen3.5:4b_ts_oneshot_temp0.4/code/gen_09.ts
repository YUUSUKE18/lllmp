const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    const parts = trimmed.split(",");
    let isInvalid = false;
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) isInvalid = true;
    }
    if (!isInvalid && parts.length >= 1) count++;
  }
  console.log(`valid=${count}`);
});
