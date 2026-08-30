import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

let count = 0;
let maxVal = -Infinity as const; // Initialize with a value smaller than any valid integer to ensure the first element updates it correctly. Since we are reading integers that fit in 64-bit range (which includes negative numbers), using Number.MIN_SAFE_INTEGER is safer but technically -Infinity works if all inputs are finite and >= MIN_INT32 or similar logic applies, however for robustness with signed 64bit int:

// A better approach to initialize maxVal:
// Since the input can be any valid integer (including negative ones), 
// we need an initial value that is definitely smaller than the smallest possible input.
// However, if there are no integers found after filtering, what should be output?
// The spec says "element count" and "maximum value". If list is empty or all non-integers:
// We can assume at least one valid integer exists based on problem type usually, 
// but let's handle the case where maxVal isn't updated.

let hasInput = false; // Flag to check if any integer was found

rl.on("line", (line) => {
  const trimmedLine = line.trim();
  
  // Skip empty lines
  if (!trimmedLine.length || !/^\s*$/.test(trimmedLine)) return; 

    try {
      const elements: number[] = [];
      
      for(const part of trimmedLine.split(",")){
        let valStr = part.trim();
        
        // If the string is not a valid integer representation, skip it.
        if(!/^-?\d+$/.test(valStr)) continue;
        
        let numVal: number | bigint = parseInt(valStr, 10);

        // Check for overflow or non-integer values (though parseInt usually handles basic cases)
        // The regex ensures only digits and optional minus sign. 
        // We need to check if the resulting value fits in a safe integer range? No, spec says "fits within 64bit integer".
        // However, JavaScript numbers are doubles which have ~53 bits of precision for integers safely.
        // To strictly adhere to 64-bit integer semantics (BigInt), we should use BigInt parsing if the number exceeds Number.MAX_SAFE_INTEGER or MIN_SAFE_INTEGER range? 
        // The spec says "values fit within 64bit integer". In JS, these are stored as numbers unless they exceed MAX_SAFE_INTEGER.
        // But for maximum correctness with large integers (>2^53), we should use BigInt operations if necessary to avoid precision loss during comparison or output format issues? 
        // Actually the problem asks us to read and count/find max. If inputs fit in 64-bit integer, they are valid numbers. 
        // Using parseInt might lose precision for values > MAX_SAFE_INTEGER (~9e15).
        // Example: Input "9007199254740993" (fits in JS number but is exactly representable as double? No, it's 2^53+something) -> Actually 2^53 = 9007199254740992. 
        // So if input is larger than that, parseInt will lose precision unless we use BigInt or explicit large number handling logic in JS?
        // Since the prompt says "values fit within 64bit integer", and standard `parseInt` returns a Number which has limited safe range:
        // If an input like -9223372036854775808 or something close to it, parseInt handles negative correctly but positive large numbers up to ~1.8e308 are representable as double precision? 
        // Wait, 64-bit integer max is approx 9.22 * 10^18 (signed). Double can hold this value exactly only if within +/- 9*10^15 roughly for exact representation without rounding errors in intermediate calcs?
        // Actually `Number.MAX_SAFE_INTEGER` is 2^53-1 ~ 9e15. Any integer > that might not be represented exactly as a Number (double). 
        // But the problem asks to find max and count among inputs fitting into 64-bit integers.
        // If we use `parseInt`, it returns a JavaScript number. For values between -2^53 and 2^53, they are exact. Beyond that? They become imprecise representations of large integers if stored as Number. 
        // Example: parseInt("10000000000000000") -> returns the nearest representable double. Is this "correct"?
        // The problem says inputs fit in 64-bit integer range. It doesn't say they are small enough to be exact floats. 
        // To safely handle full signed 64-bit integers (up to ~9e18), we MUST use BigInt because JS Numbers cannot represent all such values exactly.
        
        let val: bigint;
        if(valStr === "-0") {
           val = 0n;
        } else {
          const sign = -1 * ((valStr.startsWith('-') ? "" : "") === "-" && valStr.length > 1); // Handle negative zero? Actually regex /^\s*-?\d+$/ handles format. 
          // Let's re-parse with BigInt directly to avoid precision loss:
           if(valStr[0] === '-') {
             const part = parseInt(valStr.substring(1), 10);
             val = -BigInt(part);
           } else {
            val = BigInt(parseInt(valStr, 10)); // Safe since regex ensures digits only. 
          }
        }

      elements.push(Number.isInteger(val) ? Number(val) : NaN); // Wait, if we push as number for comparison? No, let's keep track of max using BigInt or just handle the logic carefully.

      // Actually simpler: Parse directly to string -> regex check -> then convert to BigInt for safety and compare later?
      
    } catch(e){
      console.error("Error parsing", e);
      break; 
    } finally {
       rl.close();
    }  
  };
});

// Correct Logic Flow for Node.js with proper handling:
