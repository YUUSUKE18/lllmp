const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const n = parseInt(trimmedPart, 10);

    if (!isNaN(n)) {
      validCount++;
      if (n > max) {
        max = n;
      }
    }
  }

  console.log(`count=${validCount} max=${max}`);
});
