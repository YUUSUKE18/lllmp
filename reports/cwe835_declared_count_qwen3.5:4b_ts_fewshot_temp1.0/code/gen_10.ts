const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let count = 0;
  let sum = 0n;

  if (lines.length > 0) {
    const expectedN = parseInt(lines[0].trim(), 10);
    if (!Number.isNaN(expectedN)) {
      for (let i = 1; i < lines.length; i++) {
        const lineStr = lines[i].trim();
        if (lineStr === "") continue;
        const n = parseInt(lineStr, 10);
        if (Number.isNaN(n)) continue;
        count++;
        sum += BigInt(n);
      }
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
