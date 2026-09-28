const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  const lines = s.split("\n");
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    
    if (count === 0) {
      const parts = line.split(/\s+/);
      if (parts.length >= 1 && parts[0].trim() !== "") {
        try {
          count = BigInt(parts[0]);
        } catch (e) {}
      }
    } else {
      for (const f of line.split(/\s+/)) {
        if (f.trim() === "") continue;
        let n: number | undefined;
        try {
          n = parseInt(f, 10);
        } catch (e) {}
        
        if (!Number.isNaN(n)) {
          count++;
          const val = BigInt(n);
          sum += val;
        }
      }
    }
  }
  
  console.log(`count=${count} sum=${sum}`);
});
