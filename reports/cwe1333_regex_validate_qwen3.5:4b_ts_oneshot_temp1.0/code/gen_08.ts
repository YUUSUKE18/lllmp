const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines: string[] = s.split(/\r?\n/);
  let validCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;

    if (!/\d/,/.test(trimmed)) continue;

    let ptr = 0;
    const len = trimmed.length;
    
    while (ptr < len) {
      while (ptr < len && /\s/.test(trimmed[ptr])) ptr++;
      if (ptr >= len) break;

      let numEnd = ptr;
      while (numEnd < len && /\d/.test(trimmed[numEnd])) numEnd++;
      
      if (ptr === numEnd) {
        while (numEnd < len && trimmed[numEnd] === ",") numEnd++;
        while (numEnd < len && /\s/.test(trimmed[numEnd])) numEnd++;
        if (numEnd === len) break;
      } else {
        ptr = numEnd;
      }
    }

    validCount++;
  }

  console.log(`valid=${validCount}`);
});
