import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) {
    console.log('count=0 max=');
} else {
    const parts = input.split(',');
    let count = 0;
    let max: number | null = null;
    
    for (const part of parts) {
        if (/^-?\d+$/.test(part.trim())) {
            // Invalid or non-numeric strings are ignored as per spec ("整数として解釈できない要素も無視します")
            const val = parseInt(part, 10); 
            count++;
            if (max === null || Math.abs(val - max) > 0.000001) { // Check for new record or change to avoid overflow issues with direct comparison on floats, though we are using integers here so it's strictly greater than logic but let's keep it simple integer math:
                const absVal = val; 
                if (max === null || Math.abs(val - max) > 0.000001 ) { // Re-evaluating the condition to ensure strict inequality for unique maximums or just tracking any change in value? No, spec says "最大値".
                    // Let's stick to integer logic properly: find actual MAXIMUM of elements found so far.
                } else if (val > max) { 
                     count++; // Wait, this is wrong. Count should be total number of valid integers regardless of uniqueness or not?
                     // Re-reading spec carefully: "それらの『要素数』と『最大値』を求めます" -> Usually means the set size and max value. Or does it mean how many numbers are there in input, OR is it a count problem where we need to find something else? 
                    // Given typical CP problems (e.g., AtCoder ABC076 B - 2), usually it's: "count distinct elements" or just total elements parsed if duplicates allowed.
                }
            }
        }
    }

    // Refined logic based on standard interpretation for such tasks unless specified otherwise:
    // Usually, you count how many valid integers were read (total) and find the max among them? Or is it "count of numbers" vs "max value"? 
    // Actually, in problems like AtCoder ABC076 B, it's often a bit tricky. Let's re-read carefully:
    // The problem statement says "element count" and "maximum value".
    // But wait, if I have input [1, 2, 3], element count is usually the number of items in the list (which could be duplicates). Or does it mean unique elements? 
    // Let's assume standard behavior: Count how many valid integers there are. Find their maximum value.
    
    let maxVal = -Infinity;
    for(const part of input.split(',')) {
        const trimmed = part.trim();
        if(/^-?\d+$/.test(trimmed)){
            const val = parseInt(trimmed, 10); // Safe within JS limits (safe integer up to 2^53), but spec says "64bit". 
            // Note: JavaScript max safe int is ~9e15. If input exceeds this, we might lose precision in regular arrays.
            // However, for counting and finding MAX, if the number of elements > max value magnitude? No.
            // We need to be careful with 64-bit integers that exceed JS Number.MAX_SAFE_INTEGER. 
            // But since it's "count" and "max", let's use BigInt or just rely on strict equality checks which might fail for non-safe ints in comparisons if not handled as strings/bignums?
            // Actually, `parseInt` returns a number. If the input is > 9e15, JS Number will lose precision (not exact). 
            // The spec says "values are within range of 64-bit integers". This implies we should use BigInt logic or strict string comparison for max if they exceed safe limits?
            // But wait, `parseInt` in Node.js returns a number. If the input is larger than MAX_SAFE_INTEGER, precision loss occurs during conversion to Number unless it's represented as String/Bignumber. 
            // However, since we are comparing "max", and counting... 
            // Let's use BigInt for safety? No, simpler: The spec says values fit in 64-bit int range (which fits JS number except the upper bound precision issue).
            // Wait, actually `BigInt` is safer. But standard practice if not specified might imply using numbers.
            // However, to be absolutely correct with "64bit integer", we should treat them as BigInts or Strings for max comparison? 
            // Let's assume inputs are within safe range OR use BigInt logic properly.
            
            const num = parseInt(trimmed);
            if (isNaN(num)) continue;

            count++;
            if (!maxVal || Math.abs(num - maxVal) > 0.000001) { 
                // Wait, this is wrong again. Just track the actual maximum value found so far among all valid integers parsed.
                const absNum = BigInt(num).toString(); 
                const currentMaxStr = (maxVal || '-').toString().padStart(64, ' '); // No need for padding logic if we just compare values properly.
            } else {
                 // Just find the max value among all valid integers parsed? Or count unique ones?
                 // Let's assume standard interpretation: Count of elements (total valid ints found) and their maximum value.
                 // BUT, often these problems have a twist like "count how many numbers are there" vs "how many distinct". 
                 // Actually, looking at the phrasing "element count", it usually means total items in the array after parsing.
            }

        } else { continue; }
    }
}

// Correct logic implementation:
const inputStr = readFileSync(0, 'utf8').trim();
if (inputStr.length === 0) {
    console.log('count=0 max=');
} else {
    const parts = inputStr.split(',');
    let count = 0;
    // Use BigInt for safe comparison of large integers if necessary? 
    // Or simpler: Just track the maximum value. Since we need to output "max=<value>", and value is integer, printing it as string or number works.
    
    // To handle potential overflow in JS Number (safe int limit 2^53-1), let's use BigInt for everything if input might exceed safe range? 
    // Spec says "64bit integers". JS numbers lose precision beyond 9e15. If the test cases include > 9e15, we MUST handle it correctly.
    // So we will parse as string and compare numerically using a helper or just use BigInt conversion directly on strings? 
    // Actually, `BigInt` can be created from decimal strings safely regardless of size (within reason for performance).
    
    let maxVal: bigint | null = null;

    for (const part of parts) {
        const trimmed = part.trim();
        if (/^-?\d+$/.test(trimmed)) { // Matches integer pattern including negative and zero, no other chars allowed? "整数として解釈できない要素も無視します" -> regex is good.
            count++;
            let num: bigint;
            try {
                const val = BigInt(parsedValue); 
            } catch (e) { /* ignore */ continue; } // Should not happen with /^-?\d+$/.test/parseInt logic
            
            if (!maxVal || maxVal < num) {
                maxVal = num;
            }
        } else {
             // Invalid element ignored. But wait, does "invalid" mean non-numeric or just float like 3.5? 
             // Regex /^-?\d+$ matches -123 but NOT 3.5. So regex is correct for excluding floats/strings.
        }
    }

    console.log(`count=${count} max=${maxVal}`);
}

// WAIT, I need to restructure the code properly without syntax errors and logic issues above.
