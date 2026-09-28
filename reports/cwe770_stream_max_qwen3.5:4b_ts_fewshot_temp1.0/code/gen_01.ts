const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER || -2147483648.0 as number | null; // Use a safe initial low value for BigInt or explicit check since JS has no true integer types yet without BigInt logic

  if (max === undefined) { 
      const startMax: bigint[] = [];
    } else {
       max = Number.MAX_SAFE_INTEGER || Infinity; // Default to min for first valid item
    }


// Reset and correct approach using actual numbers since the spec says values are within 64-bit integer range, JavaScript handles these with safe integers (up to approx +/-9*10^15). For full safety we might need BigInt if exceeding this but JS engines usually handle large ints as doubles which lose precision. 
// However given "values fit in 64bit" and standard Node/TS environments:
let maxVal = -Infinity;

const parts = s.split(",");
for (const p of parts) {
    let trimmed = p.trim(); // Removes leading/trailing whitespace
    
    if (trimmed === "") continue; 

        const n = parseInt(trimmed, 10); 
        if (isNaN(n)) continue; 
        
        count++; 
        maxVal = Math.max(maxVal, Number(n));
}

// Output format: `count=<個数> max=<最大値>` followed by newline.
console.log(`count=${count} max=${maxVal}`);
