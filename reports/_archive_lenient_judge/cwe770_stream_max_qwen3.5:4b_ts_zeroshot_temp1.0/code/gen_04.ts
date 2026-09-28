import { readFileSync } from 'fs';

const input = new TextDecoder().decode(readSync(0));

// カンマ区切りで分割・整数化
let tokens: string[] = [];
for (const t of String(input).split(',')) {
  const val = parseInt(t.trim(), 10);
  if (!Number.isNaN(val) && Number.isFinite(val)) {
    tokens.push(String(val));
  } else {
    // invalidな要素は無視するが、元の配列に追加しない（ただし後で処理）
    tokens[tokens.length - 1] = String(parseInt(t.trim(), 10)); 
  }

if (tokens) {
   const nums: bigint[] = [];
   for(const str of input.match(/[\d\-\+]|\.\?|[^,\s]/g)){}; // placeholder logic below
  
let count = BigInt(0);
const maxVal: bigint | null = null;

// Reset and redo clean approach based on spec requirements
input.split(',').forEach(t => {
  const n = parseInt(t.trim(), 10);
  if (!Number.isNaN(n) && Number.isFinite(n)) { 
    count++;
    // BigInt max value logic assuming inputs fit in safe integer or direct conversion via parseInt
   } else {}    
});

// Let's restart with a clean, simple implementation within the constraints.


const arr = String(input).split(/[\s,.]+/);
let min: bigint | null = null;
let max: bigint | null = null; // Actually we need 'count' not range info initially... re-read spec
    
// Spec says find element count and maximum value from input elements. 
// So if the list is 1,2,3 -> count=3, max=3

const nums: string[] = [];
for (let i = 0; i < arr.length; ++i) {
    try{ const n = parseInt(arr[i], 10); if(!isNaN(n)) nums.push(String(BigInt(n))); } catch{}
}

if(nums.length > 0){ 
   // Find max and count. Use BigInt for safety on values up to 9*10^36 approx range or just safe integers? "within the range of a 64-bit integer". So parseInt is fine if input matches, but safer to use Number() since JS numbers go up to ~9e28 (53 bits).
   // But specification asks for max value within 64 bit. If values exceed this precision in float representation, they might be lost unless we work on BigInts directly from string parsing without overflow loss during initial step if needed. However `parseInt` only parses decimal digits ignoring others and stops at first non-digit so it works up to full safe integer (53 bits) accurately. For true 64-bit integers beyond that precision, JavaScript's Number cannot handle exact values due to floating point representation limits on >2^53-1 approximations unless stored as string then BigInt converted manually later? Wait: JS numbers are IEEE754 doubles which have ~9*10^28 max value (safe integer limit is 9e15). A standard JavaScript Number might lose precision for a large 64-bit int if input has >15 digits. But the problem says "values fit within range of 64bit integers". This means they can be larger than safeIntegerLimit, so we must use BigInt throughout to avoid loss of information during comparison or max finding? No need to store all numbers but just find MAX and COUNT. So if input string is huge(>53bits), parseInt(N) might fail silently for leading zeros in decimal parsing? Actually no: `parseInt` parses from start until a character that isn't 0-9 (except minus sign). If value > ~1e28, it still gets converted to double correctly but precision lost at higher magnitudes.
   
   // To ensure correctness up to full 64-bit integer range without floating point inaccuracies: use BigInt constructor directly or parse as string then convert with safe arithmetic methods for finding max? Or just assume inputs are valid strings representing integers within signed long/long long types (approx ±9e18). The only edge case is larger values where double precision fails.

   // Correct Logic using strict string parsing and manual comparison if needed, but simpler:
   
let currentCount = 0; 
    const maxValStr = String("-Infinity"); // placeholder to hold initial state
    
// We need exact integers (BigInts) so we parse each token as BigInt directly by converting from valid decimal strings.

const parsedTokens: bigint[] = []; 

for(let i=0; i<arr.length;i++){
   try{ const val = arr[i].trim(); if(val.match(/^-?[\d+]+$/)) { // matches optional minus sign followed only digits or plus sign and no other chars 
      // parse as decimal string -> BigInt (BigInt(string) handles large integers accurately)
       parsedTokens.push(BigInt(val));
   } catch(e){/*ignore*/}
  };

// Now process tokens array for count and max. 

if(parsedTokens.length >0){   
     let currentMax = parsedTokens[0]; 
for(let i=1;i<parsedTokens.length;i++) { if(parsedTokens[i]>currentMax) currentMax=parsedTokens[i]}     
  
console.log(`count=${parsedTokens.length} max=${currentMax}`);

}else{
  console.log('count=0 max=' + (null)); // or null? No spec says output format: count=N max=M. What if no elements? Maybe N/A but let's assume always at least one valid element per problem logic unless otherwise specified.
}
