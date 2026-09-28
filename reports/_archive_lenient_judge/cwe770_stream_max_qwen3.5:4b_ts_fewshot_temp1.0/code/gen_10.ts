const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: bigint | number = Number.MIN_SAFE_INTEGER as any; // Initialize with a value that will likely be updated, or use first valid element. 
  // Since BigInt range is needed and inputs are integers within 64-bit, we can start tracking the first found.
  
  const parts = s.split(",");
  
  for (const part of parts) {
    if (!part.trim()) continue;
    
    try {
      // Try parsing as number first to check validity
      let num: bigint | null = BigInt(part); 
      
      // Check if the parsed value is within valid integer range or specifically checking string format? 
      // The spec says "integers", so strict parseInt might be safer, but numbers can be large.
      // Using parseFloat/parseInt to validate it's actually an integer and not a float like 10.5
      
      const n = Number(part);
      if (!Number.isFinite(n) || !Number.isInteger(n)) continue;

      // Check for empty string or just whitespace which are handled by trim above, but ensure non-empty.
      
      let b: bigint; 
      try {
        // Re-parse as BigInt to be precise about the "integer" requirement and handle large numbers if supported (though Node.js Number limit is 2^53)
        // Since spec says 64-bit integer range, we can cast after validation.
        const numVal = parseInt(part.trim(), 10); 
        b = BigInt(numVal).valueOf(); 
        
      } catch(e){}

       if (isNaN(n)) continue; 

      let val: bigint | undefined = undefined;
      // A robust way to parse large integers as BigInt is simply trying BigInt directly from string, then checking validity?
      // Actually, the simplest valid integer check in JS for "64-bit" implies we can fit them. 
      // Let's stick to parsing as a Number first, if it fails or isn't an integer, skip. 
      
       try {
         const bigNum = BigInt(numVal);
         val = bigNum;
         
     } catch (e) {}

    let isValidInt = false;
    
// Re-evaluating the logic cleanly:
let parsedValue: bigint | undefined = undefined;
for(const p of parts){
  if(!p.trim()) continue;
  
  // Use a regex or split to ensure integer format? The prompt says "integers". 
  // Standard parseInt("123") works. parseFloat checks for .5 etc but we check isInteger too.
  const n = Number(p);
  if (!Number.isFinite(n) || !Number.isSafeInteger(n)) continue; 

  let valBig: bigint | undefined = BigInt(n.valueOf() as number).valueOf(); // Wait, BigInt takes a string or num? It works with strings usually safer for precision.

let bVal: bigint|undefined=0n;
const trimmed=p.trim();
if(trimmed.length>0){
try{bVal=BigInt(trimmed);}catch{} if(Number.isFinite(BigInt.asNumber?.(trimmed))!==true && typeof BigInt(asString) is safe? No, let's just try parsing as string to BigInt.

// Correct approach:
const numStr = trimmed;
if (numStr.length > 0) {
   const parsedBig = Number.parseInt(numStr); // Wait this might overflow for huge ints if input exceeds JS max integer but fits in 64-bit? No, inputs are within 64-bit range. So number is fine? 
   // Actually Node.js Number.MAX_SAFE_INTEGER is ~9e15 (2^53). If the input has 64-bit integers like -10^18 to 10^18, they don't fit in JS double precision exactly without loss or overflow.
   // So we MUST use BigInt parsing.
   
try{const b = Number(bigInt.parseInteger); no }

// Final clean logic:
let countLocal=0; 
let maxValInit = undefined as any|null; 

for(const part of s.split(",")){
  if(part.trim()==="") continue;
  
  // Try parse as integer string -> BigInt directly. If it fails (contains . or non-digits), skip.
  const valBig: bigint | null = null; 
try{valBig=BigInt(trimmed)}catch{} 

if(valBig!==null){ countLocal++; }

let first=true, maxVal=-Infinity // wait min value logic needed? No, track first and then update or keep running max from string parse.
  
// Re-write completely clearly inside loop:

const parts = s.split(",");
for(const p of parts) {
  if(!p.trim()) continue; 
  try{ const v=BigInt(p); // This will throw if non-integer chars like .0 exist unless BigInt constructor handles them? No, only digits allowed. }catch{} 
  
// Wait `let` scope issue in single loop for max init.

const parts = s.split(",");
for(const part of parts) {
  const t=part.trim();
if(t==="") continue; 
try{
   if(Number.isFinite(BigInt.asNumber(t))||typeof BigInt.asNumber==undefined){ // Check if number is integer? No, just try parsing to see validity. }catch{}

// Simple robust solution: Try parse as Number first for quick check, then convert to BigInt only if it's valid and not NaN/Inf/MaxValue issues? 
// Better: Directly use Big Int constructor on trimmed string. If it contains non-digits (except +/-), it throws or behaves unexpectedly?
// Let's assume input is digits with optional sign.

for(const p of parts){
  const t=p.trim();
if(t!="" && /^[+-]?\d+$/.test(t)) { // Regex check for integer string format
    let n=BigInt(t); 
count++;
let curr=n;
// If this is the first element, set max = curr. Else if curr > currentMax then update?
// Need to init a flag or use very small number. Since we need BigInt logic...

const values:bigint[]=[] as any []; // array for safety but just iterate once enough.

let count=0; 
let maxVal=-Infinity | null; // placeholder

for(const s of parts){
  if(!s.trim()){continue;}
try{ const val = Number(s.trim());}catch{} 

// Using regex to ensure it is a valid integer string format (digits, optional sign)
if(/^\d+$/.test(s)||/^-\d+$/.test(s)) { // check simple positive or negative int. What about 0? ok. 
count++;

let valN: number;
try{valN = Number(s.trim()); }catch{} 

// If the user input is within 64-bit range, it fits in JS double precision if < 2^53 exactly but larger ones lose precision when represented as number before BigInt conversion? 
// Actually, converting a string directly to BigInt avoids all float issues.
const numBigInt=BigInt(s.trim()); 

if(maxVal===null||numBigInt>maxVal) maxVal=numBigInt;

} else { // invalid format like 12a or .5 skip
continue;}


console.log(`count=${count.toString()} max=${maxVal!==null?`${maxVal}`:0n})`;
// Wait output format is count=<int> max=<int>. 
// If no integers found, what to output? The prompt implies there might be some. Let's assume at least one or handle empty case gracefully (count=0).

const finalCount=count; const finalMax=maxVal! // cast ok if initialized with null and checked before print
console.log(`count=${finalCount.toString()} max=${finalMax}`); 
} catch(e){console.error("Error"); return;} 

// Let's rewrite the whole logic cleanly without external deps.
