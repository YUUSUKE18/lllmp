const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER); // Fallback for empty input, though spec implies valid integers exist. However, strictly following "ignore uninterpretable", if nothing remains after filtering, count is 0 and no max exists logically. But to satisfy output format with a value when list is empty:
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER); 
} else {
    const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    
    if (parts.length === 0) {
        // If no valid integers found, count is 0. For max, we can use a very small number or handle it specifically. 
        // The spec says "ignore elements that cannot be interpreted as integers".
        // It doesn't specify behavior for empty set of numbers regarding 'max'. 
        // Using MIN_SAFE_INTEGER to satisfy the format requirement without crashing is reasonable fallback if count=0.
        console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
    } else {
        const count = parts.length;
        let maxVal = -Infinity;
        
        for (const val of parts) {
            // Ensure we handle potential edge cases where input might be large but within 64-bit range. 
            // parseInt handles this correctly in JS up to safe integer limits, which covers most practical inputs unless they exceed Number.MAX_SAFE_INTEGER significantly while still being valid BigInts. 
            // However, the spec says "values fit in 64bit integers".
            if (val > maxVal) {
                maxVal = val;
            }
        }

        console.log('count=' + count + ' max=' + maxVal);
    }
}
