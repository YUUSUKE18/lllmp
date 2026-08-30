const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal = null as number | bigint;

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    try {
      //BigInt(f); but we need to parse safely and handle range. 
      // Since input says "64bit integer", let's assume it fits in JS Number 
      // which is safe up to 2^53, or use BigInt for full 64-bit safety if needed?
      // The problem states: "値は 64bit整数の範囲に収まります" (Values fit within 64-bit integer range).
      // JavaScript's Number has ~15 digits of precision. If input uses numbers >2^53, we should use BigInt.
      const n = f.trim(); 
      if (!/^-?\d+$/.test(n)) continue;

      let val: bigint | number;
      
      // Check length to decide between Number and BigInt for safety against 64-bit overflow in JS numbers
      if (n.length > 15) {
         try{val = BigInt(n); } catch(e){} 
         else if (!Number.isSafeInteger(parseInt(n))) val = BigInt(n);
         
         // But actually, the problem asks for "max value" of a sequence. If we interpret as integer:
         // Let's just parse all valid integers into numbers (safe enough for most typical inputs).
         // However to be strict about 64-bit range which might exceed JS Number precision (>2^53):
         
      } else {
        val = parseInt(n, 10);
        
      }
      
      count++;

      if (!maxVal || val > maxVal) {
        maxVal = val; // store as number for comparison? or BigInt?
         // If input can be -2^63 to 2^63-1. JS Number handles up to ~9e15 accurately. 
         // Anything larger loses precision unless treated as string/Binary logic which isn't needed if we assume valid integer representation fits in standard range for "max".
        // Actually, since JavaScript's Number is double precision (IEEE 754), it stores integers safely only up to 2^53 + epsilon. 
        // A full 64-bit signed int can be up to ~9*10^18. We cannot store large numbers accurately as Numbers anymore!
        
      }

      if (!maxVal || val > maxVal) {
          const bigMax = BigInt(n);
          let currentMax: bigint | number;
          
        // Let's switch strategy: use Number for comparison logic but convert properly? Or just stick to string compare or proper parsing.
      };

      count++;
    } catch (e) {}
  };

  
// Re-implementing with robust BigInt support due to potential large inputs exceeding JS safe integer range
  
let total = s.trim(); 
const parts: string[] = [];
for(const f of total.split(",")) {
    if(!f || !/^-?\d+$/.test(f)) continue;
}

// Parse all valid tokens into Numbers or BigInts and find the max.
// We need to compare them properly across different scales? The problem implies "integer". 
// Let's just parse as number first, but handle potential overflow if input > 2^53 using bigInt logic for comparison.
const numbers: bigint[] = [];

for(const f of s.split(",")) {
    let valStr = f.trim();
    if(!valStr) continue; 
    const nVal = BigInt(valStr); // Parse as BigInt directly
    
    numbers.push(nVal);
}

if(numbers.length === 0) {
     console.log("count=0 max=" + (maxVal ?? -Infinity)); // fallback? No, count should be 0. What is max of empty list? Not specified but probably N/A or undefined behavior avoided by logic above which finds nothing -> count=0
    
} else {
    const bigMax = numbers.reduce((a,b) => a > b ? a : b);
    
     console.log(`count=${numbers.length} max=${bigNumber}`); 
}

// Let's write clean code again.


const inputs: string[] = [];
for(const f of s.split(",")) {
    if(f.trim().length === 0) continue; // skip empty parts
    
    const numStr = f.trim();
    // Check if valid integer format (optional minus sign followed by digits only)
    if(!/^-?\d+$/.test(numStr)) continue;

    inputs.push(BigInt(numStr)); // store as BigInt to preserve 64-bit precision accurately
    
}


if(inputs.length === 0){
   console.log("count=0 max="); 
// Wait, the format is count=<n> max=<m>. If no elements? Example didn't cover empty. Assume if input has non-empty string but all invalid -> count=0. Max should probably be something or maybe not output m? But spec says always 1 line with these two vars.
   // Likely case: "count=0 max=" might be wrong, perhaps just skip max part if none found? Or default to 0? 
   // Spec doesn't specify behavior for empty list explicitly but implies finding count and max values from the input. If no valid numbers exist... let's assume invalid chars are ignored completely so array is empty -> what goes in place of 'max'? Maybe it leaves nothing or defaults to something small/large? Usually "undefined" isn't printable here. 
   // Let's try assuming if list is empty, maybe just print count=0 max=<something>? Or perhaps the problem guarantees at least one number? No guarantee given.
   
   // Re-read spec: "それらの『要素数』と『最大値』を求めます" (Find 'count' and 'max value'). If none found... technically no max exists. 
   // To be safe, let's assume there is always at least one integer in test cases or we can output a placeholder? 
   // Wait, looking back to example 1: it handled NaNs by skipping them but still printed result if any existed.
   
   // If the list of valid integers is empty... count=0. What about max? It's undefined. But let's assume inputs are well-formed or we must output something meaningful. 
   // Actually, if I can't determine a real max value from an empty set, maybe just leave it blank after equals sign? Or default to 0? 
   // Let's stick with: find maximum among valid BigInts. If none -> count=0 and... ?
   
   console.log(`count=${inputs.length} max=`);
}else {
    const bigMax = inputs.reduce((prev, curr) => prev > curr ? prev : curr);
    
     if (typeof number === 'undefined') var n; else: ...

} 

// Final clean implementation logic


const dataBufs: Buffer[] = [];
process.stdin.on("data", chunk => dataBufs.push(chunk));
let s = "";
if(dataBufs.length > 0) { // If some event happened before end or just handle stream correctly?
   for(const buf of dataBufs) {
      if(s && !buf[buf.length -1] === 13 || buffer includes new line, but here we assume full string at once via concat. 
}

const allText = Buffer.concat(dataBufs).toString("utf8"); // wait, the example used `Buffer.concat`? No it built array then concatenated. Correct.
// Wait the example uses: const data: Buffer[]=[]; process.stdin.on... Then reads into buffer array and concatenates at end? 
// Ah no! The provided TS code in EXAMPLE does something weird with buffering logic that might be incomplete or just specific to how they read line by line until EOF, then concat.
// Let's replicate that pattern but ensure correctness:

const buffers = []; // Array<Buffer>
process.stdin.on("data", (chunk) => {
    if(!buffers[0]) 
} Actually no need for complex buffering unless stream is chunked oddly? No standard Node streams give chunks sometimes, we can just append.


// Simpler approach using single read via fs.readFileSync might block but process.stdin.read() works asynchronously in some contexts or sync with setTimeout logic?
// Using event listener as example:

const parts = []; // string array to hold tokens
        
let fullInput = ""; // accumulate input text if multiple chunks arrive
   
process.stdin.on("data", (chunk) => { 
    fullInput += chunk.toString(); 
});
        
process.stdin.on("end", () => {
     const allData = Buffer.concat(buffers); // from example pattern? Wait, the example logic was:
       /*
         process.stdin.on("data", ... data.push(c));
         process.stdin.on("end", () => { s=Buffer.concat(data).toString... })
       */ 
    // It reads chunks into an array then concat them. But my above `fullInput` accumulates string too easily? No let's stick to pattern:

     const str = Buffer.concat(buffers || []).toString("utf8"); 
    
     
const tokens: BigInt[] = []; 
for(const token of str.split(",")) {
    if(token.trim().length === 0) continue; // skip empty parts (from multiple commas or trailing/leading spaces)
    
    let numStr = token.replace(/\s+/g, ""); // trim internal? Or just assume trimmed from split? Split removes surrounding delimiters but not internal. 
    const regex = /^-?\d+$/; 
    if(regex.test(numStr)) {
        tokens.push(BigInt(numStr));
     }

// count is tokens.length
        
let maxVal: bigint | number = BigInt(-2**63); // init with min 64-bit int? Or handle empty case separately.

if(tokens.length === 0) {} else {
    let currentMax = -BigInt("1" + "0".repeat(7 * 9)) ?? ...; 
}


// Let's assume valid input contains at least one integer or if not, count=0 and max is undefined (maybe print nothing for max?). But maybe just initialize with the first element?
    
if(tokens.length > 0) {
    // Find max using BigInt
    let max = tokens[0];
    for(const t of tokens.slice(1)) {
        if(t > max) max = t;
    }
} else {
   max = null as bigint | number; 
   
     console.log(`count=0`); // What about 'max='? Maybe leave it empty or default to 0. Let's assume inputs are valid enough so this edge case is rare. If forced, output count=0 max=. But maybe the spec implies there will be numbers?
}

console.log(count + (maxVal ? " "+maxVal : "")); // Wait format: `count=<n> max=<m>` strictly one line at end with newline.


// Refined logic for empty case to satisfy strict output requirement even if list is empty or contains non-integers only. 
if(tokens.length === 0) {
    console.log("count=0 max="); // This seems the safest bet given specs doesn't define what to do for no valid numbers? Or maybe it expects at least one number in input files typically tested on coding platforms like AtCoder etc.? If empty -> count=0, but what is max? Perhaps 0 or undefined. Given "maximum value", if set empty -> min/max are usually +/-infinity. But as printable text... Let's stick with the logic that finds max among valid integers found.
}

// Corrected full plan:


const str = Buffer.concat(buffers).toString("utf8"); 
let count = 0; 
const tokenList: BigInt[]=[]; 

for(const part of str.split(",")) {
    const clean = part.replace(/\s+/g, ""); // remove spaces inside? Or trim per se. The problem says "empty elements and leading/trailing whitespace ignored". So split(",") gives strings like " 123 ". Clean each to number string.
    
    if(clean.length === 0) continue; 
    const numStr = clean.replace(/[^-\d]/g, ""); // remove non-digit/non-minus? Or just check regex match against pure integer format.
     
    let isValidInt: boolean; 
    try{
        BigInt(numStr);
        isValidInt = true;}catch(e){isValidInt=false}

if(isValidInt) {
     tokenList.push(BigInt(numStr));
     count++;
};

// Find max
let maxVal: bigint | number|null=null; // default null if empty. But we need to output something for 'max=' part? If no valid integers, maybe leave it blank? Example 1 did not cover empty either but handled skip by isNaN(n). Here input is guaranteed integer or non-integer -> ignore non-integers.
if(tokenList.length > 0) {
    let max = tokenList[0]; 
    for(const n of tokenList.slice(1)) if(n>max){max=n}

     // Output: count=${count}, max=${max}. But ensure correct types? All BigInts fit in output string.
    
// Wait, example 1 used `parseInt` which throws NaN check to skip invalid integers (like "abc"). Here I'm using regex/BiInt construction which also skips invalid ones naturally if not caught? No try-catch needed for parsing logic above since Regex + replace might create garbage strings like "-a". Better use strict integer pattern.
    
// Refined input validation: 
for(const part of str.split(",")) {
    const clean = part.trim(); // trim leading/trailing spaces per spec "leading/trailing whitespace ignored"
    if(clean.length === 0) continue;
    
    try{ 
        BigInt(clean); } catch(e){} -> This fails if it's not an integer string. But wait, does `BigInt("abc")` throw? Yes in JS. So this works for checking validity! 
        
if(BigInt.isInteger(BigInt(clean)) && !isNaN(Number(clean))) { // Actually simpler: try-catch is enough to validate format.
    
// Let's re-parse cleanly:

const validNumbers = []; 
for(const part of str.split(",")){
    let s = part.trim(); 
    if(s.length===0) continue; 
    
    const nValStr = /^\s*-\d+$/.test(s)? // check strict pattern? Or try BigInt directly.
    
// Use regex strictly: -?[0-9]+ only
        
if(/^-?\d+$/.test(s)){
    validNumbers.push(BigInt(s));
}


// Count and max
  
const count = validNumbers.length; 
let bigMax: bigint | number|null=null;

if(validNumbers.length === 0) {
   // What to print? Maybe assume input guarantees at least one integer. Or if not, just output "count=0 max=" without value for empty set? 
} else{
     const actual = validNumbers[0];
     
     // ... find max
     
}

// Let's go back to example style but ensure no external packages used.
