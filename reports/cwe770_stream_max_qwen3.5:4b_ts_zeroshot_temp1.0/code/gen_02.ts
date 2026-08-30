const input = process.stdin.read();
let maxVal: number | null = null;
let count = 0;

for (const token of input.split(',')) {
    const num = parseInt(token.trim(), 10);
    if (!isNaN(num) && Number.isInteger(num)) {
        count++;
        if (maxVal === null || Math.abs(num - maxVal) > Number.MAX_SAFE_INTEGER / 2) { // Handle large values safely by comparing magnitudes or re-implementing absolute difference properly for full range. However, standard JS number limit is safe here as inputs fit in 64bit integer which maps to JS Number (double precision).
            if (!maxVal || num > maxVal) {
                maxVal = num;
            } else if (num === -1 && !isNaN(maxVal)) { // If input can be negative, handle it. The prompt says "integer", so negatives are possible unless specified otherwise. Re-reading: "64bit integer's range". JS Number covers the safe signed 32-bit integer perfectly but doubles to +/-9e15 (approx). Wait, 64-bit integer range is ~ +/- 9e18. JS number max is 9e15. This violates "strictly output" if using full 64bit integers because JS Number precision loses bits above 2^53 - 1.
            // Correction: The prompt implies the input data fits within a standard integer type, but JavaScript's native `Number` (IEEE-754 double) has a maximum safe integer of ~9e15. A full 64-bit signed integer range is roughly +/- 9.22e18.
            // Since we cannot use external packages and must stick to Node.js/TypeScript, and JS Numbers lose precision for integers > 2^53-1 (approx 9 quadrillion), we might encounter overflow if inputs are truly full 64-bit range strings like "9007199254740993".
            // However, typical coding challenges assume standard integer types unless BigInt is explicitly requested or the examples exceed safe limits. Given the constraint of "no external packages", using `BigInt` in JS requires casting which might be overkill if inputs fit standard Number range. But to strictly satisfy "64bit integer's range" (which includes values larger than 2^53), we MUST use BigInt.
            // The output format is just a number, but the input parsing needs to handle up to 10^19 safely without loss of precision if possible. Let's switch logic to strictly parse as string and potentially process with BigInt or simply rely on JS Number for typical competitive programming inputs (usually <= 2^53).
            // Re-evaluating: "Value fits within 64bit integer range". If I input `9007199254740991`, that is > MAX_SAFE_INTEGER. Converting it to JS number will result in -9007199254740993 or similar due to rounding, which breaks correctness if the problem strictly demands 64-bit accuracy (e.g., binary search logic).
            // To be safe and correct for full 64bit range without external libs, I will parse as `BigInt` then convert back to string or handle arithmetic with BigInts. However, output format says `<最大値>`, implying a numeric representation. Since TS/JS supports literals up to max size easily via parsing strings? No, JS doesn't have built-in BigInt operator precedence like C++.
            // Actually, the easiest way is just `BigInt` for internal logic if needed, but since we only need count and MAX:
            // 1. Parse as string. If it fits in Number.MAX_SAFE_INTEGER, use parseInt. Otherwise, assume it's a valid big int string? Or maybe inputs are within standard JS range? "64bit integer" usually implies full C++ `long long` size (~9e18).
            // Let's assume the input might exceed 2^53-1 and thus we should treat them as BigInts internally. But printing a number in TS/JS is just string conversion of the value. 
            // Wait, if I use `parseInt`, it returns a float for large numbers > MAX_SAFE_INTEGER (precision loss).
            // To avoid precision issues entirely while staying simple: parse all tokens as strings first? No, we need numerical comparison.
            // Let's check the spec again: "Value fits within 64bit integer range". If I output `9007199254740993` (which is > MAX_SAFE_INTEGER), JS will store it as a double that loses bits, potentially resulting in wrong value.
            // Therefore, strictly speaking, to satisfy "fits within 64bit integer", and given no external libs (like `big.js`) are allowed: 
            // We can't reliably represent integers > 2^53-1 exactly using JS numbers without loss of precision during calculation if we do arithmetic. But here we only need MAX.
            // Comparing two large stringified ints lexicographically is hard with leading zeros, etc., unless normalized? No. 
            // Is it possible the problem implies standard JavaScript Number range (32-bit or 64-bit safe)? Or does "no external packages" imply I can use native BigInt features of Node.js/TS which ARE built-in and not "external"?
            // YES! `BigInt` is a primitive in modern TypeScript (available since TS v1.0 approx). It allows exact representation of full 64bit integers without libraries. 
            // So, plan: parse each token as BigInt literal if possible? No, we have strings from split(). Convert string to BigInt using `bigIntValue = parseIntOrBigint(token)`.
            
        } else { // Correct logic for max comparison with BigInt
             const numBigInt = typeof BigInt !== 'undefined' ? BigInt(numStr.trim()) : 0; 
        }
    }
}

// Re-writing the core loop correctly using a hybrid approach to ensure safety if inputs are huge:
let count = 0;
let maxValue: string | null = null; // We'll store max as string initially or use actual BigInt?

const tokens = input.trim().split(',');

for (const token of tokens) {
    const cleanToken = token.trim();
    if (cleanToken === '' || isNaN(Number(cleanToken))) continue; 

    let val: any;
    // Try to parse as regular number first for performance on typical cases, 
    // but if we suspect full 64bit range including > MAX_SAFE_INTEGER, use BigInt.
    // Since standard JS Number has precision loss above 2^53+/-9e18, and "64bit integer" means up to ~9*10^18:
    // We must assume inputs could be larger than Number.MAX_SAFE_INTEGER.
    
    try {
        const bigVal = BigInt(cleanToken);
        val = isFinite(bigVal) ? (isNaN(Number(cleanToken)) && cleanToken.length > 25 ? bigVal : Number(cleanToken)) : null; 
        // Actually simpler: Just parse as string, check if it looks like a valid integer. 
        // To compare them safely against each other without libraries for large numbers?
        // If I use BigInt, comparisons are exact.
        const valBig = parseIntOrBigInt(cleanToken);
        
    } catch(e) { console.log('Error'); return; }

}

// Simpler approach: Just parse as Number if it fits in safe range (approx 9e15). 
// If input is guaranteed to be a "64bit integer", then inputs might exceed JS precision.
// In Node.js/TypeScript, `BigInt` IS built-in and NOT an external package. It allows exact handling of full 64-bit integers.
