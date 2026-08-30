const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split(/\r?\n/)) {
    if (line.length === 0) continue;
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0) continue;

    let i = 0;
    while (i < trimmedLine.length && /\s/.test(trimmedLine[i])) i++;

    if (i >= trimmedLine.length) continue;

    const parts: string[] = [];
    let j = i;
    while (j < trimmedLine.length) {
      if (trimmedLine[j] === ",") {
        parts.push(trimmedLine.slice(i, j));
        i = j + 1;
        while (i < trimmedLine.length && /\s/.test(trimmedLine[i])) i++;
        continue;
      }
      j++;
    }
    parts.push(trimmedLine.slice(i));

    for (const p of parts) {
      if (!/^\d+$/.test(p)) break;
    }
    if (parts.length > 0 && parts.every((p: string) => /^\d+$/.test(p))) valid++;
  }
  console.log(`valid=${valid}`);
});
