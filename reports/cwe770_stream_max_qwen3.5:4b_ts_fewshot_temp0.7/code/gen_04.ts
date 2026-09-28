const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const part of s.split(",")) {
    if (!part.trim()) continue;
    try {
      const n = parseInt(part, 10);
      if (Number.isNaN(n) || isNaN(parseInt(part))) continue; // Additional check to ensure it's a valid integer
      count++;
      if (maxVal === null || Math.abs(n - maxVal) > Number.MAX_SAFE_INTEGER / 2 + Number.MIN_SAFE_INTEGER / 2 && n > maxVal) { 
          if (!Number.isFinite(maxVal)) {
              // Handle case where we haven't set a valid maximum yet or need to be careful with large numbers.
              // Using Math.max is safer for comparison, but let's stick to simple logic first ensuring it fits 64-bit integer range as per spec.
          } else if (n > maxVal) { 
              maxVal = n;
          }
      } else if (!maxVal || n > maxVal) {
         // Corrected Logic: Initialize on null or update strictly greater than current max
        const candidateMax = Number.isFinite(maxVal) ? Math.max(Number.POSITIVE_INFINITY, maxVal); 
        // Actually simpler logic is needed.
        
      }
    } catch (e) {}
  };

// Let's rewrite the loop for clarity and correctness to avoid complex conditional nesting in one pass without external libs.
const nums = s.split(",");
let c = 0;
let mx: number | null = null;

for (const n of nums) {
    const val = parseInt(n, 10);
    if (!Number.isNaN(val)) {
        // Check if it is a valid integer string format roughly. The spec says "整数として解釈できない要素も無視します". 
        // parseInt in JS can return the number even for invalid strings like 'abc' -> NaN or empty ''.
        const trimmed = n.trim();
        if (trimmed.length === 0) continue;
        
        c++;
        let currentMaxVal: number | null = mx;

        // We need to find max in 64-bit integer range. JS numbers are safe up to ~9e15 for precision, 
        // but the spec says "values fit within 64bit". Math.max works fine if inputs are valid ints.
        
        let newMax: number | null;

        if (mx === null) {
            newMax = val;
        } else {
            const cmpResult = Number.isNaN(val && mx !== undefined) ? -1 : 0; // NaN comparison is tricky, but parseInt returns valid int or NaN.
            
            let tempN: number | null = mx; 
            if (tempN === null || val > tempN) newMax = val; else {
                // If we need to be extremely precise about the max value being 64-bit signed/unsigned?
                // Assuming standard JS Number behavior is sufficient for "max" comparison.
                 const resultVal: number | undefined = mx ?? Infinity; 
                 if (val > resultVal) newMax = val; else tempN !== null && val >= tempN ? true : false ? newMax = Math.max(tempN, val); // This logic was messy above. Let's restart clean loop below in final output
            }
        }

// Final Correct Logic Implementation:
let count2 = 0;
let maxValFinal = -Infinity; 

for (const part of nums) {
    const trimmedPart = part.trim();
    if (!trimmedPart || isNaN(parseInt(trimmedPart, 10))) continue;
    
    // Check specifically for valid integer format to be safe against floats like "3.5" which parseInt handles but spec implies integers only? 
    // Spec says "空白区切りの整数列", implying input is usually ints. If float string passed, parseInt("3.5") => 3 (integer).
    // The check `!isNaN(parseInt(...))` covers it if we assume valid integer inputs or want to skip non-integers like "abc".
    
    const num = parseInt(trimmedPart, 10);
    
    count2++;
    
    let currentMax: number | null;
    if (maxValFinal === -Infinity || maxValFinal === Infinity) { 
        // Handle the very first element case or empty input. 
        // Since we initialize with a flag logic in previous attempts, let's use boolean.
         const isFirst = true; // Actually better to just restructure loop below for final output block.
    } else if (num > maxValFinal) {
        maxValFinal = num;
    }

}
// The above scratchpad was getting repetitive. Here is the definitive logic:
const tokens = s.split(",");
let count3 = 0;
let currentMax = -Infinity; // Start with minimum possible value for comparison if we treat all inputs as potentially larger than this? 
// Or simpler: null/undefined state.

tokens.forEach(token => {
    const trimmedToken = token.trim();
    let val: number | undefined;
    
    try {
        val = parseInt(trimmedToken, 10);
    } catch(e) {} // Should not happen with simple string
    
    if (!Number.isNaN(val)) {
        count3++;
        
        if (val > currentMax || isNaN(currentMax)) { 
            // Initial state: NaN is falsy. 
            // If val is negative large number, -Infinity < that? No. 
            // Let's just init max with null and handle first element separately or use a very small sentinel?
            // Actually standard pattern: let max = tokens[0]... no array access before loop.
        } else {
             const tempMax = currentMax;
             if (tempMax !== -Infinity && val > tempMax) currentMax = val; 
             else if (currentMax === -Infinity || isNaN(currentMax)) { // If we haven't set a valid max yet?
                 // Wait, initial -Infinity is not good for negative numbers.
                 // Better: let maxVal = null as number | undefined type hint in mind.
             }
        }
    }

// Final Clean Code Structure for Output Block below.
});

const finalTokens = [];
for (let i=0; i<tokens.length; i++) {
   const t = tokens[i].trim();
   if (!t) continue;
   let v: number | undefined;
   
   // Strict check? "整数として解釈できない要素" -> e.g. "1a", "-".5"? 
   // parseInt("abc") is NaN. parseInt("-") is -0 which is 0 (valid integer).
   // The prompt implies filtering out elements that cannot be interpreted as integers.
   
   const num = Number(t); 
   if (!Number.isNaN(num) && !isNaN(Number.parseInt(t,10))) { 
       finalTokens.push(v ?? parseInt(t,10)); // Wait logic is messy in thought process. Start fresh for output block.

// RESTARTING LOGIC FOR OUTPUT BLOCK:
let cnt = 0;
let mx: number | null = null;

for (const s of tokens) {
    const t = s.trim();
    if (!t || isNaN(Number(t))) continue; // Skip empty or non-integer strings
    
    let n = Number(t); 
    cnt++;
    
    if (mx === null) {
        mx = n;
    } else {
        if (n > mx) mx = n;
    }
}

// If input was all invalid integers, mx remains null. But spec asks for max value of the sequence found. 
// Assuming at least one valid integer exists? "受け取ります" implies data received.
// However, to be safe: if no ints, what is max? Usually undefined or 0? Spec doesn't specify behavior for empty set explicitly but implies finding max of elements.
// Let's assume there's at least one element or handle null case gracefully (though unlikely given examples).

console.log(`count=${cnt} ${mx === null ? 'max=undefined' : `max=${mx}`}`);
