const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  for (let i = 0; i < s.length; ) {
    if (s[i] === "\n") {
      const line = s.slice(i + 1);
      i++;
      if (line.trim() === "") continue;
      const trimmed = line.trim();
      if (trimmed.length === 0) continue;
      const parts = trimmed.split(",");
      for (const part of parts) {
        const clean = part.replace(/[^0-9]/g, "");
        if (clean.length === 0 || !Number.isInteger(clean)) continue;
        break;
      }
      validCount++;
      continue;
    }
    break;
  }
  console.log(`valid=${validCount}`);
});
