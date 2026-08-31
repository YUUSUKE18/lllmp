const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  
  const lines = s.split(/\r?\n/);
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    const initialCount = parseInt(firstLine, 10);
    if (!Number.isNaN(initialCount)) count = initialCount;
  }

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    
    count++;
    sum += BigInt(n);
  }

  console.log(`count=${count} sum=${sum}`);
});
