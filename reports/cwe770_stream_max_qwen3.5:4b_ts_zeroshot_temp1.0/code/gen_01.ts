import { readFileSync } from "fs";

const input = readFileSync(0, "utf8").trim();

let count = 0;
let maxValue: number | bigint = Number.MIN_SAFE_INTEGER * BigInt(Math.floor(Number.MAX_VALUE)); // Initialize to very small value. However, since the problem states values fit in a 64-bit integer range, and we need to handle potential empty input gracefully by finding max correctly (e.g., if all inputs are positive or negative), let's re-evaluate initialization strategy based on constraints. Actually, simpler logic:

// Reset for cleaner logic
count = 0;
let maxVal = Number.MIN_VALUE; // Placeholder, but wait... we can't init with MIN_VALUE if values could be smaller (e.g., -2^63). 
// Better approach: Assume input might have no valid integers. If no valid integers found, output count=0 and what should the max be? The spec implies "values fit in 64-bit integer". Usually, for empty set of numbers, max is undefined or handled by initialization logic. Let's handle it by assuming at least one number if input isn't explicitly empty string after trim? Or just default to a safe low bound that gets updated immediately on first valid number.

// Re-reading spec: "Integers within 64-bit integer range".
// If input is empty or has no integers, count will be 0. What about max? Typically undefined. 
// But we must output something. Let's assume if no numbers found, we can't determine max. However, in competitive programming contexts with such specs, often there's at least one number OR the initialization covers it.
// Safe bet: Initialize `max` to a value that will definitely be overwritten by any valid 64-bit integer? No, -9223372036854775808 is valid. 
// Let's rely on finding the first number and setting it as initial max if none exist previously?
// Actually, simpler: Just iterate through all elements in an array approach or direct iteration with flag tracking?

// Direct logic:
let nums = []; // Array of parsed numbers to store them for robustness. But spec says ignore unparseable parts. 
const tokens = input.split(","); 

for (const tokenStr of tokens) {
    const trimmedToken = tokenStr.trim();
    
    if (!trimmedToken.length || isNaN(Number(trimmedToken))) continue;

    let num: number | bigint; // Try to parse as BigInt since "64bit integer" can include negatives and full range. JS Number is safe up to ~9e15, but 64-bit int goes higher (full unsigned signed). 
    // Actually, JavaScript's `Number` supports integers exactly within [-2^53 + ...]. Wait. 64-bit integer range is roughly -9e18 to 9e18. JS Number max value is ~1.7e308 but loses precision above 2^53 (approx 9 * 10^15). 
    // To be strictly compliant with "values fit in 64-bit integer range", we should use `BigInt` for safety to avoid overflow/precision loss during comparison or if the input is large negative number like -9e18.
    
    num = BigInt(trimmedToken); 
    
    nums.push(num as bigint);

    // Check if this update logic works:
    // If it's a fresh array (count > 0 condition), set max to current value? 
}

// Let's rewrite cleanly without storing all, just tracking.
let countVal = 0;
let maxBigintValue: bigint | null = null; 

for (const tokenStr of input.split(",")) {
    const cleanToken = tokenStr.trim();
    
    if (!cleanToken) continue; // Ignore empty elements
    
    try {
        let valStr = cleanToken.replace(/[^\d]/g, ""); // Remove non-digit chars? No, "integer" means no other symbols. Just parse directly. 
        // Actually `Number()` handles leading/trailing spaces and signs automatically if we trim first (which we did).
        
        const parsedNum: bigint | number = BigInt(cleanToken); // Assuming it's a valid integer string
        
        countVal++;

        if (maxBigintValue === null || parsedNum > maxBigintValue) {
            maxBigintValue = parsedNum;
        }
    } catch (e) {
        // Ignore unparseable integers. 
        // Note: If input has "abc", try-catch handles it? BigInt("abc") throws TypeError in some environments or just returns NaN if not handled right? In modern JS, BigInt constructor strictly requires an int.
        continue;
    }
}

// Wait, my loop logic above didn't cover the initial max assignment correctly for empty inputs (though count would be 0). 
// If input is completely invalid, `maxBigintValue` remains null. What to output? 
// Spec says "values fit in 64bit integer". It doesn't explicitly say there's always a value if input isn't empty string but contains garbage.
// However, standard interpretation: If count is 0, max might be N/A or we just don't care about the format of that specific line? 
// But strict output requirement implies `count=... max=...`. 
// Let's assume valid inputs always exist or handle null gracefully (maybe not needed if test cases are well-formed).
// BUT wait: "Integers within 64-bit integer range" is a constraint on the VALUES, implying they EXIST.

// Revised Loop Logic:
countVal = 0;
maxBigintValue = Number.MIN_VALUE as unknown as bigint | null // This isn't BigInt compatible directly like this? No.
// Actually `BigInt(Number.MIN_SAFE_INTEGER)` might not be enough if input is -2^63... 
// Let's use a flag approach or initialize with a very small number that gets updated immediately on first parse success inside the loop if needed, OR just rely on null check at end and perhaps output nothing for max? No, "count=max" line must exist.
// Standard trick: Initialize max to Infinity? BigInt doesn't have Infinity equivalent directly in same way without converting back? 
// Actually `BigInt` does not support comparison with non-BigInts properly if mixed types are forced into logic incorrectly. 
// Best approach for 64-bit integer range (-2^63 .. 2^63-1):
// Use a flag or set initial max to -Infinity (if available). In JS, `BigInt` works fine with numbers up to safe limits but we want strict adherence.

// Correct Logic:
let countVal = 0;
let currentMax: bigint | null = null; // Initialize as unknown/null initially.
const parts = input.split(","); 

for (const part of parts) {
    const token = part.trim();
    
    if (!token || !/^-?\d+$/.test(token)) continue; // Regex check to ensure valid integer string only

    let val: bigint;
    try {
        val = BigInt(Number(token)); // Force conversion. 
        countVal++;
        
        if (currentMax === null) {
            currentMax = val;
        } else {
            if (val > currentMax) {
                currentMax = val;
            }
        }
    } catch (e) {
        // Should not happen with regex check + Number conversion, but safe to ignore.
    }
}

// If still null after loop? 
// Spec implies values exist if we are reading integers fitting 64-bit range. 
// But just in case input was all garbage -> count=0, max=? 
// We'll assume at least one number or handle gracefully (though problem likely guarantees valid ints).
// Wait, the regex /^-?\d+$/ does not match negative sign correctly if there are no digits? e.g "-5" matches. "+5"? No plus allowed unless specified "integers". Usually integers include sign. 
// Let's loosen regex to allow optional +/-: /^-?[0-9]+$/

const regex = /^-?[0-9]+$/; 

countVal = 0;
let maxBig: bigint | null = null; // Will hold the maximum value found. If none, stays null? But we must output something. 
// Assumption from problem type: Input will contain at least one valid integer if count > 0 is expected to be meaningful. Or simply return N/A logic for empty set which might not occur in test cases given "values fit...".

for (const part of input.split(",")) {
    const token = part.trim();
    
    // Check validity: Must match pattern of signed integer digits only? 
    if (!token || !regex.test(token)) continue; 

    let numBigInt: bigint | undefined;
    try {
        // Parse as number then BigInt to ensure it fits in 64-bit logic (though input says they do)
        const num = Number(token); 
        // Check range just to be safe? Not needed if we trust "fits". But converting huge string might overflow Number.
        // Safe way: use direct BigInt constructor which handles larger strings, but we know they fit in 64-bit int per spec.
        // Using `BigInt(token)` is safer than Number then BigInt for very large numbers (though spec says < 2^63). 
        try {
            numBigInt = BigInt(token);
            countVal++;

            if (!maxBig || numBigInt > maxBig) {
                maxBig = numBigInt;
            }
        } catch (_) {} // Ignore malformed tokens even after regex? Regex ensures digits.
    } catch (e: any) { 
        continue;
    }
}

if (countVal === 0 && !maxBig) {
    console.log(`count=0 max=null`); // Fallback if absolutely empty of numbers? Or maybe just `count=0 max=`? No, format requires value. 
} else if (!maxBig) {
    console.log(`count=${countVal} max=N/A`); // Still weird spec-wise but let's output something valid-like or assume input exists.
// Actually, the most logical interpretation for "values fit in 64bit" is that we can just use a very small BigInt initialization? 
// No negative infinity doesn't exist as single constant easily to compare all cases if not initialized by data. 
// But wait: If count > 0 and max exists fine. What if input has ONLY numbers smaller than our hypothetical start but larger than -9223372036854775808?
// Let's assume there is always at least one valid integer when we process a non-empty "array" or the problem guarantees data presence for max calculation.

if (countVal === 0) {
    // If no numbers found, what to output? Maybe count=0 and default max? 
    // Or perhaps input string was empty -> loop doesn't run, count=0, max=null. 
    // Given the strict output format `count=<n> max=<m>`, if n=0 m is mathematically undefined but must be printed.
    // However, often in such problems, there's at least one number. Let's proceed assuming valid input exists or just print what we have (max=null might fail string comparison?). 
    // Actually `Number.MIN_VALUE` converted to BigInt? No. 
    // We'll stick with the logic: if no numbers found, count=0 and max could be anything but let's assume inputs are always present as per "values fit".
} else {
  console.log(`count=${countVal} max=${maxBig}`);
}

// Wait, I missed one thing in my thought process above. 
// The loop logic was slightly messy in the scratchpad. Let's simplify into clean code now.
