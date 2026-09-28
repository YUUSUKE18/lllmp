const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let pairs = 0;
  const target = parseInt(lines[0].trim());
  const validIntegers = lines.slice(1).map(line => {
    const f = line.trim();
    if (!f) return null;
    const n = parseInt(f, 10);
    return n !== null && n >= 0 && n <= 2**63 - 1;
  }).filter(n => n !== null);
  
  for (let i = 0; i < lines.length; i++) {
    const f = lines[i].trim();
    if (!f) continue;
    const n = parseInt(f, 10);
    if (n === null || n < 0 || n > 2**63 - 1) continue;
    
    if (n === target) {
      if (pairs === 0) pairs = 1;
      else pairs++;
    }
  }
  
  console.log(`pairs=${pairs}`);
});
