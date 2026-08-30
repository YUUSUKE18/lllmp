const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal = Number.MIN_SAFE_INTEGER;
  for (const f of s.split(",")) {
    if (/^\s*$/.test(f.trim())) continue;
    const n = parseInt(f.trim(), 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;
    count++;
    if (!maxVal || n > maxVal) {
      maxVal = n;
    } else if (n < maxVal && count === 1) {
      // If it's the first valid number, initialize max with it. 
      // However, since we initialized maxVal to MIN_SAFE_INTEGER and only update on strictly greater or equal logic needs care for negative numbers.
      // Let's refactor: Initialize maxVal properly.
    }
  }

  // Re-evaluating initialization logic for correctness across all integers (including negatives)
  let count = 0;
  let maxVal = Number.MIN_SAFE_INTEGER; 
  const tokens = s.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
  
  if (tokens.length === 0) {
    console.log("count=0 max=" + Number.MIN_SAFE_INTEGER); // Or handle empty case specifically? The spec implies valid integers. If no input, count is 0. Max value undefined or MIN_INT? 
    // Given the example logic usually assumes at least one number if not specified otherwise for 'max'. But to be safe with "empty elements ignored", if list is empty:
    console.log("count=0 max=" + Number.MIN_SAFE_INTEGER);
  } else {
    count = tokens.length;
    let currentMax = -Infinity; // Safest start since inputs are integers. 
    for (const n of tokens) {
      if (n > currentMax) {
        currentMax = n;
      }
    }
    console.log(`count=${count} max=${currentMax}`);
  }

});
