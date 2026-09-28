const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let count = 0;
  let sum = BigInt(0);

  for (const line of lines) {
    if (!line.trim()) continue;
    
    if (lines.length > 1 && count === 0) {
      try {
        const n = parseInt(line, 10);
        if (!isNaN(n)) {
          count = n;
        }
        continue;
      } catch (_) {}
    }

    let val: string | number | null = null;
    if (isNaN(parseInt(line, 10))) {
      try {
        val = BigInt(Math.round(parseFloat(line)));
      } catch (_) {}
    } else {
      val = parseInt(line, 10);
    }

    if (!val) continue;
    
    if (typeof val === "number") {
      sum += BigInt(val);
      count++;
    } else {
      let parsed: bigint | null = null;
      try {
        parsed = parseInt(String(val), 10);
      } catch (_) {}

      if (!parsed) continue;
      
      sum += parsed;
      count++;
    }
  }
  console.log(`count=${count.toString()} sum=${sum}`);
});
