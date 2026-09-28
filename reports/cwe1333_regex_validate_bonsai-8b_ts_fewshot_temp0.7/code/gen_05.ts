const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const parts = trimmed.split(",");
    let count = 0;
    for (const part of parts) {
      const partTrimmed = part.trim();
      if (partTrimmed === "") continue;
      if (/^[0-9]+$/.test(partTrimmed)) count++;
    }
    if (count >= 1) valid++;
  }
  console.log(`valid=${valid}`);
});
