const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString().trim();
  if (!s.includes(",")) return console.log(`count=0 sum=0`);

  let currentSum = BigInt(0);
  const counts: Record<string, number> = {};
  
  for (const part of s.split(",")) {
    if (/^-?\d+$/.test(part.trim())) {
      const numStr = part.replace(/\s+/g, ""); // Remove remaining spaces just in case
      let n = parseInt(numStr, 10);
      
      counts[numStr]++;
      currentSum += BigInt(n);
    }
  }

  if (Object.keys(counts).length === 0) {
    console.log(`count=0 sum=0`);
  } else {
    const count = Object.values(counts)[counts[Object.keys(counts][0]] || 1]; // Re-calculate count for the first found number? No, let's iterate again to get correct counts. 
    // Actually, simpler logic: just collect unique numbers and their sums separately or aggregate on fly.
    
    const entries = Object.entries(counts);
    console.log(`count=${entries.length} sum=${currentSum}`);
  }
});
