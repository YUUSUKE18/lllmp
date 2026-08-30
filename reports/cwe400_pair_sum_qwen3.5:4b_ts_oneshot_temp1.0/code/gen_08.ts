const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lineNum = 0;
  const lines = [];
  const tokens: number[] = [];
  
  const getTokens = (lineStr: string) => {
    const cleanLine = lineStr.trim();
    if (!cleanLine || isNaN(parseInt(cleanLine, 10))) return null;
    const n = parseInt(cleanLine, 10);
    tokens.push(n);
    return true;
  };

  // Target value on the first non-empty/integer-valid line
  let target: number | null = null;
  
  for (const lineStr of s.split(/\r?\n/)) {
    const res = getTokens(lineStr);
    if (res === null) continue; // Empty or invalid line, skip until finding a valid one for target
    if (target === null) {
      target = tokens[tokens.length - 1];
      // The first valid integer becomes the target. We need to track how many we've read so far vs remaining?
      // Actually, spec says: "Standard input's 1st line has target". 
      // Then "2nd line onwards have integers".
      // So once we successfully parsed the 'target' on the first valid line (index 0 relative to valid lines?), 
      // any subsequent valid lines are data.
      break;
    } else {
      // This is a data line
      target = tokens[tokens.length - 1]; // Just to be safe, ensure we have the target stored in 'target' variable properly if logic was different.
      // Wait, my loop above puts the found target into `tokens`. 
      // If the first non-empty/valid line is used as target, then subsequent lines are data.
      // But I need to know which ones were skipped (empty/invalid).
      // Let's restart logic structure slightly for clarity.
    }
  }

  // Re-parse cleanly
  tokens.length = 0; 
  let hasTargetSet = false;
  
  for (const lineStr of s.split(/\r?\n/)) {
    if (!lineStr.trim()) continue; // Skip empty lines everywhere
    
    const num = parseInt(lineStr.trim(), 10);
    if (isNaN(num)) continue; // Skip unparseable lines

    if (!hasTargetSet) {
      target = num;
      hasTargetSet = true;
      // This is the ONLY valid integer found so far. It serves as the target.
      // We don't add it to `tokens` list for data processing? 
      // "2nd line onwards have integers" - if the first non-empty line IS the target, then no integers are on line 1.
      // So `tokens` should be empty or just contain future numbers.
    } else {
      tokens.push(num);
    }
  }

  if (target === null) {
    console.log("pairs=0");
    return;
  }

  let count = BigInt(0); // Result can be large? Spec says "value and count fit in 64-bit integer". 
                         // So we can use Number or safe BigInt math. Let's use Number since spec guarantees fit.
  // Actually, if input is huge, number of pairs could overflow 32-bit but fits 64-bit. 
  // Let's use Number for simplicity as per "fits in 64bit integer" guarantee.

  for (let i = 0; i < tokens.length; i++) {
    const val1 = tokens[i];
    let found = false;
    const needed = target - val1;
    
    // Check subsequent elements to avoid duplicates and self-pairing issues if any logic differs, 
    // but standard "unique pair" usually means distinct indices (i != j).
    // Since order doesn't matter for a pair (a,b) == (b,a), we check j > i.
    for (let j = i + 1; j < tokens.length; j++) {
      if (val1 + tokens[j] === target) {
        found = true;
        break;
      }
    }

    if (found) count++;
  }

  console.log(`pairs=${count}`);
});
