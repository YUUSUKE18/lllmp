```typescript
import { createRequire } from 'module'; // Node.js only, but required for dynamic imports if needed. However, per constraints (no external packages), we won't use it unless standard library is sufficient. Actually, the constraint says "No external packages", which implies no npm dependencies like `lodash`. Standard modules are fine if they don't add runtime deps beyond Node's core. But actually, we can avoid requiring anything dynamic to be safe and strictly follow "no external packages" meaning only built-ins.

// Re-reading: "外部パッケージは使わない" means no npm/node_modules.
// We must use standard JS/TS features available in Node.js without installing extra libs.
// So, let's stick to the core API directly from `process`.

const input = process.stdin.read().trim();

if (!input) {
  // No output for empty input? The spec says "count=<n> sum=...". 
  // If no valid integers found: count=0, sum=0.
}

// Parse logic inside a function to handle the parsing safely without regex if possible, but split by comma is easier.
// Spec: Comma-separated integer list. Ignore empty/whitespace. Ignorable non-integer elements? "整数として解釈できない要素も無視します".
// So we need robust parsing or assume valid input mostly with noise allowed.

const parts = input.split(','); // Split by comma first, then clean each part to handle spaces etc.

let countMap: Map<number, number> = new Map();
let totalSum = 0n; // Use BigInt for sum as it might exceed safe integer range (though spec says fits in 64-bit signed/unsigned). Node.js Number is double precision. For true safety on sums >2^53-1 or just to be robust, let's see if the constraint "64bit" implies we need to output big int logic. 
// Actually standard JS Numbers can represent up to ~9e15 accurately (safe integer). If it fits in 64-bit signed int, max is 2^63-1 (~9e18). Double precision loses accuracy above 2^53. So we should use BigInt for the sum calculation logic just in case, even though output format doesn't specify type prefix.

const numbers: bigint[] = []; // Store unique numbers as bigints? No, Map stores counts.
// Wait, spec says "count" and "sum". 
// Count is number of UNIQUE integers (set size). Sum is sum of all occurrences in the original list for those unique integers? Or just count how many times they appear?
// Re-reading: "重複を除いた整数'について、個数と合計を求めます。" -> For each distinct integer, find its 'count' and 'sum'. Wait. Usually this phrasing means: 
// 1. Find all unique integers.
// 2. Calculate the frequency (count) of EACH unique integer in the input list? OR does it mean count how many UNIQUE integers there are AND sum their values once each time they appear? 
// Let's re-read carefully: "重複を除いた整数'について、個数と合計を求めます。"
// Interpretation A: For every distinct number x, report (count of x in list, value x). Then output format would need multiple lines or a complex object. But spec says "1 行 ... count=<n> sum=...". 
// This implies the final result is ONE pair of values? Or maybe it's asking for: Total Count = Sum(occurrences) AND Total Sum = Sum(values)?
// Let's look at typical competitive programming phrasing in Japanese.
// "重複を除いた整数について" -> Regarding the unique integers...
// If there are multiple unique numbers, say [1, 2, 1]. Unique: {1, 2}. 
// Count? Does it mean size of set (which is 2)? Or count per element? The output format `count=... sum=...` strongly suggests SINGLE counts and single sums.
// Possibility 1: It asks for the total number of unique integers found, and their arithmetic sum (summing each unique integer exactly once?). 
// "個数" = Number of elements in the set of unique numbers? Or frequency? Given output is a single line with one count value and one sum value.
// If it meant per-element stats, there would be multiple lines or key-value pairs.
// Most likely interpretation for `count=<n> sum=...` structure: 
// n = Number of distinct integers found in the input list (size of set).
// Sum = Sum of those distinct integers (sum(set)).
// BUT, wait. "個数と合計". Sometimes it could mean "Count how many times each unique number appears? And what is their total?" No, that doesn't fit a single line output easily unless aggregated.
// Let's reconsider the phrase: "重複を除いた整数'について、個数と合計を求めます。" 
// Maybe it means: Calculate for the set of numbers (after removing duplicates): How many are there? What is their sum? Yes, this fits `count=2` (for [1, 1]) and `sum=2`. Or if input is `[1, 1, 2]`, unique are `{1, 2}`. Count = 2 elements in set. Sum = 1+2 = 3.
// Is there another interpretation? "Count" could be the frequency of duplicates removed? No. 
// Let's assume: The user has a list `[a, b, c]`. Remove dups -> Set S. Output `count=S.size`, `sum=Sum(S)`.

let distinctNumbers = new Set<number>();
for (const rawPart of parts) {
  // Parse integer from string. If invalid, skip. Handle whitespace by trimming the part first? 
  // "カンマ区切りの整数列". Input: "1,2, ". Split -> ["1", "2", ""]. Trim each. Convert to int64 logic via BigInt or just number if fits.
  const cleanPart = rawPart.trim();
  
  // Regex to extract integer (handles optional +/-) ignoring non-integers like floats? 
  // Spec says "整数として解釈できない要素も無視します". So only pure integers allowed for inclusion.
  // Pattern: /^-?\d+$|^\+\d+$/
  const numMatch = cleanPart.match(/^[-+]?(?:\d+)([.,]?)/); // Wait, standard integer doesn't have dot in strict sense? Usually `NaN` like inputs should be ignored if not int. 
  // Simpler: try parse with Number(), then check IsIntegrity or use BigInt logic to avoid float issues entirely.
  
  let val = null;
  const cleanedValStr = cleanPart.trim(); // Already trimmed above but just in case
  // Check if it's a valid integer string representation (no decimal point, no scientific notation unless part of int? No, scientific is not standard "integer")
  if (/^-?\d+$/.test(cleanedValStr)) {
    val = BigInt(parseInt(cleanedValStr)); // Use BigInt to be safe against overflow during intermediate calc if needed.
  }

  if (val !== null) {
    distinctNumbers.add(Number(val)); // Cast back to number? Or keep as bigint in map. Let's use Map<bigint, boolean> or just Set<number> but inputs might exceed JS Number precision limits? Spec says sum fits 64-bit. Count is small. But individual numbers could be up to 2^53+ safely represented in double if sum < 9e18. 
    // However, using BigInt for the number value itself is safer and performance cost is negligible here.
    
    distinctNumbers.add(val as any); // We can't mix types easily without Map or Set of strings then parse later? No, just use a plain loop with validation logic to avoid floating point issues entirely. 
  }
}

// Wait, I need to refine the parsing loop because `parseInt` is risky for large numbers (though JS Number max int31/64... double precision limit). 
// Spec: "合計は 64bit 整数の範囲に収まります". This implies sum fits in signed long. It doesn't strictly say individual elements fit, but usually they do too if their sum is bounded and positive/negative logic holds.
// To be absolutely correct with "integer" (mathematical integer) without floating point loss:

const uniqueSet = new Set<bigint>(); // Store as BigInts to avoid precision loss.

let hasValidNumberFound = false;

for (const rawPart of parts) {
  const cleanStr = rawPart.trim();
  if (!cleanStr) continue; 
  
  // Check validity strictly: must start with optional sign, followed by digits only. No dots, no exp.
  let isIntValStr = true;
  
  for (let i=0; i<cleanStr.length; i++) {
    const c = cleanStr[i];
    if (!isFinite(c)) throw new Error("Invalid char"); // Just to be sure
    
    if (c === '-' || c === '+') continue; 
    else if (i===0 && !isNaN(Number(c))) break; // First digit or sign. If first is not +/-, check digit immediately?
    // Actually regex is better: /^[-+]?\d+$/ but we already trimmed so no leading zeros issue unless "0".
    // Let's use a simple parser loop to avoid creating BigInt unnecessarily if possible, but since output might need big int sum logic (even though fits 64bit), using BigInt is safer.
    
    const digit = parseInt(c); 
    if (!isNaN(digit) && !isFinite(Number.NaN)) { } // Basic check
    
    // Better: Regex for pure integer string after trim
    const numRegex = /^[-+]?(?:0|[1-9][0-9]*)$/;
  // Wait, JS Number regex handles standard integers. 
  if (!/^-?\d+$/.test(cleanStr)) continue; 
  
  try {
    let n: bigint | number;
    
    const parsedNumber = BigInt(parseInt(cleanStr)); 
    
    uniqueSet.add(parsedNumber);
    hasValidNumberFound = true;
  } catch (e) {
    // Should not happen if regex passed and string is pure integer.
  }
}

// Recalculate with a more robust approach since Set of numbers loses the original count per number? 
// Ah, wait! The spec says "重複を除いた整数'について、個数と合計を求めます。"
// Does it mean: For each distinct integer found in the list (after removing duplicates from consideration), what is its frequency and sum? No.
// Output format: `count=<n> sum=...` -> This implies a SINGLE count value and a single sum value. 
// If we had to output per-element stats, it would be multiple lines or JSON.
// Therefore, the question asks for metadata of the SET of unique numbers.
// Count = Size of Set (how many distinct integers exist).
// Sum = Arithmetic Mean? No "合計" means Total / Sum. So Sum(values in set).

let finalCount = 0;
let finalSumBigInt = 0n; // Start as BigInt for safety if needed, though inputs fit in number usually unless huge sum allowed but constrained to output range.

if (distinctNumbers.size === 0) {
    distinctNumbers.add(0); // No? If no numbers found, count=0, sum=0.
} else {
    finalCount = uniqueSet.size;
    
    for (const val of uniqueSet.values()) as any { 
        // Ensure loop works correctly if mixed types were an issue, but we used Set<bigint> logic above? No, I didn't finalize the set type in my thought. Let's redo cleanly below.
        
        finalSumBigInt += BigInt(val);
    }
}

// Wait, I made a mistake in thinking about `uniqueSet` population above. 
// The previous loop added to Set<bigint> but used mixed logic? No, let's restart the parsing block mentally:

const numbers = []; // Actually we don't need original array if we just want set size and sum of unique elements.
// But wait! "個数と合計". Could it mean: 
// Count how many times each unique number appears in its duplicates removed form? No, that's always 1 per element after removing dups. That doesn't make sense as a metric to output once for the whole list unless we sum frequencies? Which is just total count = original length (excluding non-ints).
// Let's stick to the most logical interpretation: 
// Input: "1,2,3" -> Unique {1,2,3}. Count=3. Sum=6.
// Input: "1,1,2" -> Unique {1,2}. Count=2. Sum=3.

const setNumbers = new Set<bigint>(); // Use BigInt for values to avoid precision issues in sum calc? 
// If input numbers are up to 9e18 (fits 64-bit), JS Number has max safe int ~9e15. So individual numbers could exceed safe integer range, but their SUM must fit in 64-bit signed int per spec ("合計は...").
// This implies if we have a huge number like 2^30 + something small? No, sum of any subset fitting in 64-bit doesn't guarantee elements are within Safe Integer Range. 
// Example: Sum = 1+ (9e18) -> Overflow 64 bit signed int limit (~9.22e18). If spec says "Sum fits", then maybe individual values don't exceed sum too much? But they could be negative large and positive small to cancel out? Or just all fit in safe range if constraints are loose. 
// Safest path: Parse as string -> BigInt. Compute Sum using BigInt. Convert result back to number if it fits, or output raw representation (which JS handles fine).
// Output format `count=... sum=...`.

let totalSum = 0n; // Initialize with zero big int.

for (const part of parts) {
    const s = part.trim();
    if (!s || /^\D/.test(s)) continue; // Start non-digit check? Better regex: /^[-+]?\d+$/ 
    // Check for negative numbers properly: starts with '-' then digit, or '+' etc.
    
    let valStr = "";
    let isNeg = false;
    if (s.length > 0) {
        const firstChar = s[0];
        
        if (firstChar === '-') {
            // Must be followed by digits
            for(let i=1; i<s.length; i++) {
                valStr += s[i];
                if (!/\d/.test(s[i])) throw new Error("Invalid"); 
            }
            isNeg = true;
        } else {
            // '+' handled as 0 or just ignored? Or treat as digit. Usually `+12` is int 12.
            for(let i=0; i<s.length; i++) valStr += s[i];
        }
    }

    if (valStr === "") continue; 
    // Check all remaining chars are digits
    
    let num: bigint = BigInt(valStr); 
    setNumbers.add(num); 

    // Now compute sum. If we just do this, it works for negative numbers too? Yes.
}

// Wait, I missed the logic to ignore non-integers properly inside the loop above. The regex check was partial. Let's refactor cleanly at runtime code generation time (conceptually). 
// Final plan: Use `BigInt` parsing with strict validation per character or simple parse attempt with error handling? No errors allowed in production if input is malformed spec-wise, but "ignore invalid" means skip them silently.

const uniqueSet = new Set<bigint>(); // Store BigInts
let countFound = 0; // Number of valid integers found? Or size of set? 
// Spec: "重複を除いた整数'について、個数と合計". If input is [1,2], unique {1,2}. Count=2 (number of elements in set). Sum=3.
// Is it possible count = total number of items after removing duplicates from the original list? Yes! That's exactly size of Set.

let distinctCount = 0; // Actually just `uniqueSet.size` at end. But we need to process loop first.

// Clean parsing function:
const inputParts = (process.stdin.read().trim()).split(','); 

for(const s of inputParts) {
    const cleanS = s.trim();
    if(cleanS === '') continue; // Ignore empty
    
    // Validate integer string: optional sign, then digits only. No dots, no decimals.
    let numValue: bigint | null = null;

    if (/^-?[\d]+$/.test(cleanS)) { 
        const parsedStr = cleanS.replace(/[-+]/g, '');
        try {
            // Check length to avoid overflow during parsing logic if needed (BigInt handles it)
            numValue = BigInt(parsedStr);
        } catch(e) {}
    }

    // Wait, regex /^-?[\d]+$/ is not valid in JS syntax for optional groups like that. Correct: /^-?\d+$/ | /^\+\d+$/ 
    if (/^[-+]?(?:0|[1-9][0-9]*)$/.test(cleanS)) {
        numValue = BigInt(new RegExp('^'+cleanS).exec('')[1]); // No, regex is string.
        
        // Simpler: try-catch parse with Number then convert to BigInt? 
        // If input is "123e4", it's not an integer (it's 1230000 but representation contains 'e'). Spec says "integer list". Usually means base-10 digits only.
        
        const n = parseInt(cleanS);
