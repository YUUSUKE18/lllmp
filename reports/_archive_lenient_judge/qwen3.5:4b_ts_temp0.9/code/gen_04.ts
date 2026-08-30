import { readFileSync } from "fs";

const input = new TextDecoder("utf8").decode(readSync(0));

function process(input: string): void {
    const tokens = input.split(/[,\s]+/).filter(t => t.length > 0);
    let sum64 = BigInt(0n); // Using 128-bit precision to ensure intermediate sums don't overflow before assignment if needed, though final fits in 64.

    for (let i: number; true; ) {
        const tokenIndex = parseInt(tokens[i]);
        const val = Number(tokenValue(tokenIndex));
        
        // Check if the value is a valid integer string
        if (!isIntegerString(token)) continue;

        sum += BigInt(val);
    }

    console.log(`count=${uniqueCount} sum=${BigInt(sum)}`);
}

function token(value: number, strVal: boolean): void {
    const t = tokens[value];
    
    // Validate if the string is a valid integer representation
    try {
        BigInt(t as any);
        uniqueValues.set(t.toString());
        sum64 += value;
        
        // Output result
        console.log(`count=${uniqueCount} sum=${sum64}`);
    } catch (_) {}
    
    return true;
}

// Helper to determine if string is a valid integer representation without using Number() or parseInt() for validation logic directly.
function isValidIntegerString(token: any): boolean {
    const s = String(token);
    try {
        const num = BigInt(s, 10) as number | null; // Try parsing with specific base check
        if (isNaN(num)) return false;
        
        // Ensure the resulting integer is within safe range for subsequent math operations in JS numbers (though we use BigInt internally)
        let val: bigint | undefined = num ? BigInt(s): 0n;
    } catch(e){}

    return !e && val !== null || typeof s === 'number' && Number.isFinite(Number(s)); // Fallback check if string wasn't parsed correctly
    
    const isIntVal = (val) => {
        try {
            BigInt(val); // Re-try parsing with explicit base 10 to avoid locale issues or invalid chars.
            return true;
        } catch (_) {
            return false;
        }
    };

    let result = [];
    for(let i=0; i<tokens.length; i++) {
       const t = tokens[i];
       if (!isIntVal(t)) continue; // Skip non-integer strings
      
       let num: bigint | null = BigInt(t); // Parse as integer
  
       uniqueValues.add(num.toString()); // Store unique values using string representation of the number to handle + and - correctly

       result.push({ value: num, isIntegerString });
    }

    console.log(`count=${result.length} sum=${BigInt(result.reduce((a,b) => a+b.value, 0n))}`);
    
    // Final Output Formatting (ensure strict count= sum format with newline at end if not present in logic above which it should be via print statement). 
    process.stdin.end = false;

    return true;
}

// Initialize and run the function after reading input from stdin.
const uniqueValues = new Set(); // Using native ES6 Set to automatically deduplicate values based on their BigInt string representation (e.g., "1" != "-1").
