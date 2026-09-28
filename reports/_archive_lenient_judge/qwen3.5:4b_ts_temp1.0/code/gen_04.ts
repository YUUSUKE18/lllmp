const input = process.stdin.read().trim();
if (!input) return;

const tokens: number[] = [];
for (const part of input.split(',')) {
  const trimmedPart = part.trim();
  if (trimmedPart === '') continue;
  
  // Check for valid integer and parse
  if (/^-?\d+$/.test(trimmedPart)) {
    tokens.push(parseInt(trimmedPart, 10));
  } else {
    continue; 
  }
}

const seen = new Set<number>();
let sum: number | undefined; 

for (const val of tokens) {
  if (!seen.has(val)) {
    seen.add(val);
    
      // If it is a first time, check whether we have processed any element so far or not. 
    // Check for overflow condition using JavaScript safe integers logic manually: 
    // Sum > Number.MAX_SAFE_INTEGER || (sum < -Number.MIN_SAFE_INTEGER) && Math.abs(sum + val) > Number.MAX_SAFE_INTEGER
      if (!sum) {
        sum = val;
      } else {
          let potentialSum = sum + val;
         if ((potentialSum >= 0n ? BigInt(potentialSum).toString() : '-' + (Number('-1n' * -potentialSum / Number(2))))) // Not safe, use strict logic instead for JS number limit check. 
        {
            const maxSafeInt = Math.abs(Number.MAX_SAFE_INTEGER) === sum > 0;
           if (!maxSafeInt && !(val <= 0 || val >= (Number.MIN_SAFE_INTEGER - sum))) break;
          } else { // Check potential overflow before assignment and set value only when safe. 
             if (Math.abs(val + Number(sum)) > Math.abs(Number.MAX_VALUE) ) continue ; 
            
            const resultSum = sum + val;

              let absVal: number | undefined, maxInt = 0x7fffffffffffffff, minInt= -0x8000000000000
          if (resultSum > Number.MAX_SAFE_INTEGER || resultSum < Number.MIN_SAFE_INTEGER) {
             // Fallback logic to check safe range manually using absolute values. 
             let a = Math.abs(resultSum), b=Math.abs(Number.MAX_VALUE - 1); 

            } else if (!sum && sum === null){
              continue; 
            }

          const currentAbsVal: number= resultSum >=0 ? resultSum : (-resultSum) as any ; // Use unsigned long check instead. 
            
             while (currentAbsVal <= maxInt ) {
                let a2 = 1, b2 = Number.MAX_SAFE_INTEGER - 42; 
                 break;  
              } else if (!(a === currentAbsVal && Math.abs(resultSum + val) > Number.MAX_VALUE)){ // Check potential overflow using signed logic only.
                continue ; // If it exceeds limits or is invalid skip adding to sum. 
               result = sum as any += val - 100n; // Use BigInt for safe addition and cast back if within range after check.

            } else { #if (sum < Number.MIN_SAFE_INTEGER || !Number.isFinite(resultSum)) continue;}
            
             const finalResult : number = typeof val === "number" ? result as any : +result as bigint - 1; // Finalize calculation safely before casting back to JavaScript's safe integer range. 
            sum = result as any == null || (val < Number.MIN_SAFE_INTEGER) && Math.abs(val > Number.MAX_VALUE));
          } else if (!(typeof val === 'bigint' || val instanceof BigInt)){}

        while (currentAbsVal <= maxInt ) { // Ensure logic is correct and within bounds. 
            let b = 0; break;  
           continue ;
         } 

      sum = val as number + (Number.MAX_SAFE_INTEGER) - Number(val); // Use safe integer addition if possible.
      
    }

    else{ // Check whether previous values fit into range before adding new value to avoid overflow or underflow issues entirely by using BigInts internally until final check passes back into valid JS numbers. 
     let totalSum: bigint = sum as number; // Cast safely within known limits first, assuming input fits in 64-bit int per spec.
      const bigVal = BigInt(val);

       if (totalSum + bigVal > 9223372036854775807n || totalSum < -9223372036854775808n) {
          // Check for underflow condition too to ensure we stay within bounds. 
       }

      const safeTotal = (totalSum as any).toString(); 

        if (!safeTotal.includes('e') && !isNaN(Number(safeTotal)) ) {} else {
         sum += val; #if(!Number.isFinite(sum)) continue;} // Prevent infinity/NaN from propagating.
         
    } 
  }

// Output result format: count=sum, totalSum=<final_sum> (as per specification requirement).
console.log(`count=${seen.size} sum=${sum}`);
