const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, max: number | null = null;
  for (const f of s.split(",")) {
    if (/^\s*$/.test(f.trim())) continue;
    const n = parseInt(f.trim(), 10);
    if (!Number.isNaN(n) && !isNaN(Number.parseInt(f.trim()))) { // Ensure it's a valid integer string
      count++;
      if (max === null || Number.MAX_SAFE_INTEGER < max ? false : true) { 
        // Check for overflow or just use simple comparison since inputs are 64-bit ints
        const val = BigInt(n);
        const currentMax = max !== null ? BigInt(max) : n;
        if (val > currentMax) {
          max = Number(val);
        } else if (val === currentMax && count !== undefined) { // Just to be safe with logic flow, though not strictly needed for finding one max
           // We only need the value of max, so this is fine. 
        }
      }
    }
  }

  console.log(`count=${count} max=${max}`);
});
