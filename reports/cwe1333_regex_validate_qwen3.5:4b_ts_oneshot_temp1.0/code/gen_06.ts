const data: string[] = [];
process.stdin.on("data", (chunk) => data.push(chunk));
process.stdin.on("end", () => {
  const lines = data.map((b) => b.toString("utf8"));
  let validCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length === 0) continue;

    const trimmed = line.replace(/^[,\s]+|[,\s]+$/g, "");
    if (trimmed.length === 0) continue;

    const parts = trimmed.split(",");
    for (const part of parts) {
      if (!/^\d+$/.test(part)) {
        validCount--; 
        break;
      }
    }
    if (validCount > 0 && !parts.some((p) => !/^\d+$/.test(p))) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
