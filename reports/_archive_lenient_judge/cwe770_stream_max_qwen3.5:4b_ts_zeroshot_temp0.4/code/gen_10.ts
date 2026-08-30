const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER); // Fallback for empty input, though spec implies valid integers exist. If strictly no output on error is needed: return; 
} else {
    const parts = input.split(',');
    let count = 0;
    let maxValue = null as number | bigint;

    for (const part of parts) {
        if (!part.trim()) continue; // Ignore empty elements and whitespace
        
        try {
            const val: number = parseInt(part, 10);
            
            // Check range to ensure it's a valid integer within reasonable bounds or just parse as JS Number which is safe up to ~9e15. 
            // The spec says "64bit integer". JavaScript numbers are IEEE 754 double-precision floats (safe integers up to 2^53).
            // To strictly support full 64-bit range, we should use BigInt for parsing and comparison if input exceeds safe int limit.
            
            let parsedVal: bigint;
            try {
                const bigIntStr = part.trim();
                parsedVal = BigInt(bigIntStr);
                
                // Check validity of the string (optional but good practice)
                if (!/^-?\d+$/.test(part)) continue; 
            } catch (_) {
                continue; // Ignore non-integer elements
            }

            count++;
            
            let currentMax: bigint = maxValue ?? parsedVal;
            if (parsedVal > currentMax) {
                maxValue = parsedVal;
            }
        } catch (e) {
            // If parseInt fails or parsing logic throws, ignore the element.
            continue; 
        }
    }

    const finalCount: number | bigint = count as any; // Count is always a safe integer length of array
    
    if (!maxValue && count > 0) {
        maxValue = BigInt(Number.MIN_SAFE_INTEGER); // Fallback logic, though logically impossible with valid integers existing. 
    } else if (count === 0) {
        console.log('count=0 max=' + Number.MIN_SAFE_INTEGER.toString()); // Or undefined? Spec implies elements exist or we output something. Let's assume at least one integer exists based on typical CP problems unless empty input is handled specifically as 'no data'. 
    }

    if (maxValue === null) {
        console.log('count=0 max=' + Number.MIN_SAFE_INTEGER.toString()); // Handling case where no valid integers were found but count > 0? No, if loop didn't run or all invalid.
    } else {
        const val = maxValue;
        let outStr: string | bigint;
        
        // Determine output format for max value based on whether it fits in JS Number range to avoid BigInt conversion issues in output formatting unless necessary. 
        // Actually, just converting BigInt to string is fine.
        if (val < 0n && val > -9223372036854775808n) {
            outStr = Number(val);
        } else {
            outStr = String(val); // Ensure correct representation for large numbers
        }

        console.log('count=' + count.toString() + ' max=' + (typeof outStr === 'bigint' ? val : outStr)); 
    }
}
