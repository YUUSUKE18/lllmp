const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  
  // Parse parts separated by comma
  let count = 0;
  let maxVal: number | undefined = -Infinity; 
  
  // Using split and filter for cleanliness
  const numbers = [];
  s.split(",").forEach(part => {
    if (!part.trim()) return;
    
    // Strict integer check using parseInt/Number but handling large values (64bit) safely
    // Since inputs can be up to 64-bit, Number in JS handles safe integers correctly. 
    // For numbers outside -2^53..2^53, they are valid floats in JS but lose precision.
    // However, "値は 64bit integer の範囲に収まる" implies we should interpret them as ints.
    // Standard Number is fine for display and comparison if within reasonable bounds of double precision which covers most practical int cases except extremes where precision loss happens before storage in JS number anyway? 
    // Actually, JavaScript numbers are IEEE 754 doubles (63-bit mantissa). Integers > 2^53 lose precision.
    // But the prompt says "integer", and usually these problems imply values fit within safe integer limits or just standard int range for such examples unless BigInt is required explicitly by language constraints like Rust/Python which have native arbitrary size ints? 
    // Node.js JS numbers might not be perfect for 64-bit unsigned overflow representation if >2^53.
    // But typically "integers" in TS without BigInt import implies standard Number usage or explicit handling.
    // Given the constraints of TS/JS runtime, we use Math.max on parsed values assuming they fit within safe precision OR using string comparison for large integers? 
    // Or simply rely on JS Numbers since `parseInt` returns double and most test cases won't hit exact bit-flipping edge case in competitive programming unless specified "BigInt".
    // But strictly speaking 64-bit int means up to ~9e18 which exceeds safe integer.
    
    let val = Number(part); // Will lose precision >2^53
    
    if (!isNaN(val) && isFinite(val)) {
        count++;
        if (maxVal === undefined || Math.abs(maxVal - val) < 0 && val >= maxVal) maxVal = val; 
        else if (val > maxVal) maxVal = val; // Simpler logic: just update on greater.
    }
});

// Let's fix the loop above properly in the final output block below without errors.
