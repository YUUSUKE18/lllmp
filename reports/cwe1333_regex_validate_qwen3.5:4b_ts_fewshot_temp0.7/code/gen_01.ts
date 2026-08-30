const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validLines = 0;
  for (const line of s.split("\n")) {
    if (line.length === 0 || line.startsWith("\n") || line.endsWith("\n")) continue;
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    const parts: string[] = [];
    let i = 0;
    while (i < trimmed.length) {
      if (trimmed[i] === ",") {
        if (parts.length > 0 || !isNaN(parseInt(trimmed.substring(i - 1, i), 10))) {
          parts.push("");
        }
        i++;
      } else {
        let start = i;
        while (i < trimmed.length && /\d/.test(trimmed[i])) i++;
        const numStr = trimmed.slice(start, i);
        if (numStr.length > 0) parts.push(numStr);
      }
    }
    if (parts.some(p => p.length === 0 || !/^\d+$/.test(p))) continue;
    validLines++;
  }
  console.log(`valid=${validLines}`);
});
