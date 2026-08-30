const input = process.stdin.read().trim();
if (!input) {
    console.log("count=0 max=");
    return;
}

const tokens = input.split(',');
let count: number = 0;
let maxValue: bigint | undefined = (BigInt(Infinity)); // Actually -infinity for logic, but we need to handle first element separately or init with very small. Let's use a flag approach.
// Re-think initialization: max needs the smallest possible value if list is not empty initially? 
// Wait, standard input can be empty array after parsing non-integers. If no integers found, output should reflect that.
// The spec says "integer as interpreted". If all are skipped/invalid or empty string results in count=0.

// Let's parse and filter first.
const parsedValues: bigint[] = [];
for (const t of tokens) {
    const valStr = t.trim();
    if (!valStr || !isNaN(parseInt(valStr, 10))) continue; // If empty string or not a number? 
    // Spec says "non-integer elements are ignored". parseInt handles non-integers by returning same value usually but isNaN check is safer for strict integer requirement. 
    // Actually, strictly speaking:
    const n = parseInt(valStr);
    if (isNaN(n)) continue;

    parsedValues.push(BigInt(n));
}

if (parsedValues.length === 0) {
    console.log("count=0 max=");
} else {
    count = parsedValues.length;
    
    // Find maximum using BigInt for safety with ranges mentioned, though standard int32/64 fits in JS Number mostly. Spec says "values fit within 64bit integer range". 
    // In TypeScript/JS, we should use BigInt to strictly adhere and avoid overflow paranoia if inputs are large positive/negative numbers close to limits (e.g., -9_223... or similar).
    
    let maxVal: bigint = parsedValues[0];

    for (let i = 1; i < parsedValues.length; i++) {
        // Comparison logic
        if (parsedValues[i] > maxVal) {
            maxVal = BigInt(parsedValues[i]);
        }
    }
    
    console.log(`count=${count} max=${maxVal}`);
}
