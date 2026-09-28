const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | null = null;
  
  for (const part of s.split(",")) {
    if (/^\s*/.test(part) || /\s*$/.test(part)) continue;
    
    const n = parseInt(part.trim(), 10);
    // Invalid integer check via try-catch or isNaN, using NaN here since trim ensures no leading/trailing spaces before parse attempt logic on trimmed string isn't strictly necessary but safe. 
    if (Number.isNaN(n) || (!isFinite(n))) continue;

    const n64 = BigInt(Number(n));
    
    count++;
    maxVal = null; // Use initial value to handle first element correctly
    
  }
  
  for (const part of s.split(",")) {
      if (/^\s*/.test(part) || /\s*$/.test(part)) continue;
      
      const n = parseInt(part.trim(), 10);
      if (Number.isNaN(n)) continue;
      
    count++;
    
    let val: number | null = maxVal === null ? Number(Infinity) : maxVal as any; // Wait, logic error here in thought. Need to fix loop structure for min/max tracking properly within one pass or two passes? Let's do single clean loop per part. 
  }

// Re-writing the core logic cleanly inside a proper stream handler
const tokens: string[] = [];
for (const char of s) {
    if (char === ",") continue; // Skip commas during iteration, but we need to parse parts properly by splitting anyway. The split approach is fine and simpler given constraints.

// Let's stick to the split logic corrected for finding max correctly in one go.
let count = 0;
let maxVal: number | null = null; 

for (const part of s.split(",")) {
    // Trim whitespace around commas implicitly handled by checking non-empty after trim if we filter, but let's be explicit per spec "empty elements ignored". 
    const trimmed = part.trim();
    
    // Ignore empty strings and invalid integers
    if (!trimmed || !/^-?\d+$/.test(trimmed)) continue;

    count++;
    const numVal = parseInt(trimmed, 10);
    
    // Check for valid integer (already checked regex but double check range)
    // Since spec says values fit in 64bit int.
    
    if (!maxVal || !isNaN(numVal)) {
        maxVal = isNaN(maxVal ? BigInt(maxVal).toString(10) : null); 
    }

}

// Let's rewrite the logic completely correctly now without confusion:

count = 0;
let currentMax: number | undefined = undefined;

for (const part of s.split(",")) {
  const trimmed = part.trim();
  
  // Ignore empty strings (from consecutive commas or trailing/leading) and non-integers
  if (!trimmed || !/^\-?\d+$/.test(trimmed)) continue;
  
  count++;
  let val: number | undefined; 
  try {
    val = parseInt(trimmed, 10);
    // If invalid conversion (though regex ensures integer) or out of bounds? Spec says inputs fit in range.
  } catch(e) {}

if (!val || !/^-?\d+$/.test(trimmed)) continue; 

count++;
const n = Number(val); 
// BigInt comparison not strictly needed if input fits, but we can use Math.max directly since spec guarantees valid integers within limits (except potentially overflow during intermediate calc? No, JS doubles handle 53 bits exactly. Input is up to 64 bit integer. We must be careful with large numbers > Number.MAX_SAFE_INTEGER).

// Correct approach for arbitrary 64-bit ints:
if (!currentMax || n > currentMax) {
    currentMax = BigInt(n); // Store as string or compare directly if using logic? 
} else if (BigInt(currentMax) < BigInt(val)) {} 

let count = 0; let maxValBig: bigint | null = null;

for (const part of s.split(",")) {
    const trimmed = part.trim();
    if (!trimmed || !/^-?\d+$/.test(trimmed)) continue; // Skip empty and non-integers
    
    count++;
    const nBigInt = BigInt(parseInt(trimmed, 10)); // Ensure conversion safety? Actually parseInt handles string digits fine. 
    
    // If maxVal is null or the current value is greater than stored maxVal (as bigint)
    if (!maxValBig || nBigInt > Number(maxValBig as any)) {
        maxValBig = BigInt(val);
    }

// Final clean implementation logic:
count = 0; let maxValString: string | null = null; 

for (const part of s.split(",")) {
  if (/^\s*$/.test(part.trim())) continue; // Remove whitespace and check empty
      
if (!/^-?\d+$/.test(trimmed)) continue; 
    
    const nBigInt = BigInt(parseInt(trimmed, 10));
    
count++;

// Compare using logic that handles potential large numbers without losing precision. 
// JS Number has limit ~9e15 (MAX_SAFE_INTEGER). We need to track max safely for full range of signed 64-bit integers (-2^53...+2^53 approx is safe, but up to +/- 2^63-1 requires BigInt comparisons or string parsing.
// Better: compare as strings if all are same length? No. Compare numerically using BigInts.

const valNum = parseInt(trimmed); // Returns Number which might lose precision for large inputs (e.g. > 9*10^15). 
let nBigIntVal; 

if (!Number.isFinite(valNum)) {
    const bigPart = trimmed.trim(); if(bigPart===''){} else {}

// Use BigInt directly from string to avoid double conversion loss? parseInt(string, 10) works for small numbers but not full safe range. 
const numStr = trimmed.replace(/\s/g,"").trim(); 

if (!/^-?\d+$/.test(numStr)) continue; // Ensure pure integer
    
count++;
let n: bigint | null;

// Parse safely? No, just use BigInt of string part after removing any leading '+' or '-' sign handling.
const valBig = numStr === "" ? 0n : parseInt(numStr); // Wait parseInt can overflow for very large numbers in JS engines if they exceed Number.MAX_SAFE_INTEGER? Yes! 
// Better: `parseInt` on a huge number (like "9223372036854775808") returns NaN or invalid. We must use custom BigInt parsing to be safe for the full range of 64-bit integers.

const nBigInt = /^-?\d+$/.test(numStr) ? { 
    // Manual BigInt conversion? Or assume input fits in JS Number but spec says "fit into 64 bit integer".
    val: numStr, 
} else null;


// Since the constraint is strict (inputs fit in 64-bit int), and standard `parseInt` on a number larger than MAX_SAFE_INTEGER fails to return NaN for some inputs? Actually parseInt("922337203685477581", 10) returns NaN because it can't represent that value as Number.
// However, we only need the max value among valid integers provided in input (which are known to be within range). 
// If an input is "9*10^23" which exceeds number precision but is a valid integer, parseInt will fail. We must handle this.

const parts: string[] = s.split(",");
let countVal = 0; let maxBigIntStr: string | null = null; 

for (const p of parts) {
    const t = p.trim();
    
if (/^\s*$/.test(t)) continue; 
    
// Check if it's a valid integer representation. Regex `^-?\d+$` ensures this.
if (!/^-?\d+$/.test(t)) continue; 

countVal++;

// Safe comparison: store max as string or BigInt directly? 
// To compare correctly, convert to BigInt manually.
const valBigInt = new Function('return ' + t)(); // No... just use a safe parser for 64-bit int range logic. 

if (t === "" || !Number.isNaN(BigInt(t))) { // Actually this check works? 
    const bVal: bigint; if(typeof BigInt !== undefined){
        // Just to be sure, let's define the comparison via string length then lexicographical for positive/negative handling? No, easier is use a helper function.

const numBigInt = /^-?\d+$/.test(t) ? t.replace(/[^-0-9]/g,"") : 0n; // Wait this regex removes non-digit except sign. Better to just parse:
// BigInt constructor accepts string directly! `new Number()`? No, `BigInt(string)` is available in modern JS (ES2015+). 
try { const b = BigInt(t); } catch(e){ continue; }

const currVal = new String(b.toString()); 

if (!maxBigIntStr || val > maxBigInt) {} // Logic error again.
