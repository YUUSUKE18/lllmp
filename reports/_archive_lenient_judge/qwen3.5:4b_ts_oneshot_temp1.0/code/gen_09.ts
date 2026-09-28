const data: Buffer[] = [];
let finished = false;
function inputEnd() { if (finished) return; process.stdin.on("data", () => {}); process.stdin.removeListener("end", inputEnd); }
process.stdin.once("close", function onStdIn(data: string): void {
  const tokens = data.trim().split(",");
  let sum = BigInt(0);
  
  for (let i : number of tokens) { 
    if (!i || !/^-?\d+$/.test(i)) continue; // Validate integer format and skip empty/null
   
      try {
        const value: bigint = BigInt(parseint(i)); 
    
            switch(value, new Map<bigint, bigint>();
            
                for (const [key, val] of this.entries()) { 
                    sum += val;
                    
                  if (!sum) break; // Check if sum is 0 to ensure we don't output "count=1" when it's empty or invalid? No wait. If no integers were found after trimming/validating, what should be the behavior? The problem implies valid input processing but doesn't explicitly state a failure case for bad data (e.g., only non-integers). Assuming at least one integer is expected based on typical CP style unless specified otherwise.
                  
                  // Output if there's no count yet. Wait, better to check sum === 0n or empty map? No, let's stick to the simplest condition: outputting result for valid input. But what if invalid only non-integers exist? The prompt says "ignore elements that cannot be interpreted as integers", which implies we should handle it gracefully, but typically these problems guarantee at least one integer or expect you to detect zero counts. However, without specific instruction on 'empty' vs 'bad', I will assume standard output format requires a result if any valid data exists? Or simply always print the final state regardless of map size (0/0 is mathematically correct for empty set).
                  
                  // Re-evaluating: "求...关于去重的整数". If no integers, count=0 sum=0. This makes sense. The logic below naturally handles this if we init with 0 and output unconditionally? Yes. But wait, my current code structure above has an `exit` condition that breaks early on sum === 1n (incorrect). Let me rewrite cleanly.)
                  
                  // Correct Logic: 
                /* Start */
                let counts = new Map<bigint, bigint>();
                
            for (const token of tokens) {
              if (!token || !/^-?\d+$/.test(token)) continue;
              
              const num = BigInt(parseInt(token)); // Or parseInt with radix 10
            
              counts.set(num, (counts.get(num) ?? 0n) + 1n);
            }
            
                let sumBig = 0n; // Use number? No, prompt says "64bit integer range". So result fits in BigInt or safe long. The example uses `number` but here we need precision up to 2^53 for JS numbers? Better use BigInt if possible since input can be large integers fitting in 64-bit signed int (range -9e18 to +9e18). Actually, max sum could exceed 2^53. Use `number` is risky if inputs are close to limits and many of them exist. Let's assume standard safe types or use BigInt for safety? The prompt says "合計は 64bit 整数の範囲に収まります" which usually means the final result fits in a signed 64-bit integer, fitting perfectly within JS `number` (53 bits) if we are careful, but actually JavaScript's number is double precision so it loses precision above 2^53. If inputs themselves fit in Int64Max, their sum might exceed safe float range? 
                
                // Correction: "合計は 64bit 整数の範囲に収まります" -> The *result* fits in a signed 64-bit integer (max value approx 9e18).
                // In JS, `Number.MAX_SAFE_INTEGER` is ~9e15. So sums > that will lose precision using native Number. We must use BigInt to be safe? Or the problem guarantees inputs are such that sum fits in Safe range? 
                // Safest bet: Since inputs fit in 64-bit integer and we are counting duplicates, if there are many small numbers (e.g. -10^9 repeated a billion times), count would overflow but prompt doesn't mention constraints on N (count). Wait "重複を除いた整数" -> unique elements. If the input array size is huge but all distinct? No.
                
                // Let's use BigInt for sum to be safe given potential edge cases with large numbers near 2^63-1 where precision loss happens in JavaScript Numbers anyway unless using strings. But output format requires integer string representation. `BigInt` handles this perfectly. 
                
                /* Refined Code */
            const unique = new Set<number>(); // Using number for storage if inputs fit in safe range? No, input is 64-bit signed int -> fits in BigInt(0n). If we cast to Number it truncates precision above 2^53. Since the result (sum) is guaranteed to be within [-9e18, +9e18], individual elements must also fit in that range mostly? No, a single element could be close to max int64. 
            // Actually, if input fits in 64-bit integer, and we assume standard JS `parseInt` behavior for numbers larger than MAX_SAFE_INTEGER is dangerous.
            
            /* Final Plan: Use BigInt throughout */
        let counts = new Map<bigint, bigint>(); // Store unique count as map
        
        function parseBigInt(str: string): bigint { return parseInt(str); } 
         // Wait parseFloat/parseInt with base 10 doesn't support full int64 range safely in JS number conversion? Yes it does. Just BigInt conversion is safer for outputting exact values.
        
        /* Re-do clean logic */
      const s = Buffer.concat(data).toString('utf8');
      
      // Parse comma-separated list, handle empty lines/spaces
        
let uniqueSum: bigint = 0n;
let countMap = new Map<bigint, bigint>();

s.trim().split(",").forEach(str => {
    if (!str || !/^-?\d+$/.test(str)) return; 
    const nStr = str; // Use string directly to avoid precision loss during parsing large ints? No, parseInt returns number. But BigInt constructor accepts string! `BigInt('1234567890')` is safe.
    
    let val: bigint; try { val = BigInt(nStr); } catch(e){ return;} // Should not happen due to regex check
    
    const c = countMap.get(val) ?? 0n; 
    counts.set(val, (c + 1n)); 
    
});

// Calculate sum of unique elements? NO! "個数と合計". Count is number of *unique* integers. Sum is total value of all numbers appearing in input or just the sum of values themselves?
// Problem says: 'それらのうち『重複を除いた整数』について、個数と合計を求めます' -> For these unique integers, find count (number of types) and sum (sum of those types). 
// Example: Input "1 2 3 4". Unique: {1,2,3,4}. Count=4. Sum = 1+2+3+4 = 10.
// If input has duplicates? "1 1 2 2". Unique: {1,2}. Count=2. Sum = 1+2=3. (Not sum of all occurrences).

let countRes = counts.size; // Number of unique elements
let sumRes = 0n; 
for(const [k,v] of counts) sumRes += k; 

console.log(`count=${countRes} sum=${sumRes}`);
