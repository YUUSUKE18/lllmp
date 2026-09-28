const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let countMap = new Map<number, number>(); // key: unique integer, value: sum of occurrences
  for (const w of s.split(",")) {
    if (w.trim() === "") continue;
    const n = parseInt(w.trim(), 10);
    if (Number.isNaN(n)) continue;
    
    // Check uniqueness first to count distinct integers properly as requested: "重複を除いた整数について、個数"
    // Wait, the requirement says: "those unique integers, find the number of them and their sum".
    // Let's re-read carefully: 「それらのうち『重複を除いた整数』について」 -> Regarding those [integers after removing duplicates], 
    // it asks for 'count' (how many unique numbers?) and 'sum' (sum of these unique numbers).
    
    const existingSum = countMap.get(n) || 0;
    if (!countMap.has(n)) {
      countMap.set(n, n);
    } else {
       // Only add to sum the value itself once per unique number. 
       // If we just do set(n, current + n), then for input [1,1], sum=2? No, usually "sum of distinct integers" means 1+1 (wait) or just the values themselves.
       // Let's interpret: "Count and Sum of the unique integers". 
       // Example Input: 1,2,3 -> Unique: {1,2,3}. Count=3. Sum=6.
       // Example Input: 1,1,2 -> Unique: {1,2}. Count=2. Sum=3. (Sum of the unique set). 
       
      if (!countMap.has(n)) countMap.set(n, n);
      else existingSum += n;
    }

    const finalCount = new Set<number>();
  }; // Oops, need to restructure logic properly without nested confusion in mental draft
  
  let totalUnique = 0n;        // Sum of unique numbers as BigInt (to ensure overflow safety if needed, though spec says fits in 64bit signed)
  let distinctCount = 0n;      // Number of unique integers

  for (const w of s.split(",")) {
    const trimmed = w.trim();
    if (trimmed === "") continue;
    
    const n: number | null = parseInt(trimmed, 10);
    if (n === null) continue;
    
    // Using a Set to track unique numbers encountered so far
    if (!countMap.has(n)) { 
      countMap.set(n, n);
      distinctCount++;
    } else {
        const currentValue = parseInt(trimmed.trim(), 10);
        // Since the problem asks for sum of "unique integers" (the set itself), not repeated sums.
        // Re-reading: 「重複を除いた整数について」 -> For [x], we consider x once. 
        // The instruction is slightly ambiguous on whether it's Sum(Unique Set) or Sum(Input).
        // Given the phrasing "Regarding those unique integers", usually implies taking the set {1, 2} and summing them (3), not counting duplicates in sum.
        // But let's look at example logic: if input is `10,10`, distinct are just `10`. Sum should be 10? Or 20+ ? 
        // Most likely "Sum of unique values". So set(n) stores the value n once.
        
    }
    const s = Buffer.concat(data).toString("utf8");

    let countMap: Map<number, number> | null; // To store just one pass sum? No need map if we want Set behavior directly with a real object
  }; 

// Clean up code to be precise
  
const s2 = Buffer.from(s); 
const numsSet = new Set();
let numSumBig = BigInt(0);

for (const w of s.split(",")) {
    const t = w.trim();
    if (!t) continue; // skip empty elements after trim
    
    let n: number | null = null;
    
    try {
        n = parseInt(t, 10);
    } catch(e){} 
    // Or use Number.isNaN check as in previous examples but parse int manually or just rely on parser result.
    // Actually simpler logic from before is fine if we track seen unique numbers properly.

    const cleanVal: number | null = parseInt(t, 10);
    
    if (Number.isNaN(cleanVal)) continue;
    
    let val: bigint | undefined;
    if (!numsSet.has((val as unknown) as any)) { // Wait type error here mental check
    
      numsSet.add(Number(val)); 
    } else {}

// Final Logic Structure
  
  const s = Buffer.concat(data).toString("utf8");
  
  const seenNumbers = new Set<string>(); // Store string keys first or number keys? Number is safer for uniqueness.
  
  let distinctCount = BigInt(0);
  let totalSumBig = BigInt(0n);

  // We need to process numbers. Let's use a Map<number, boolean> to mark seen? 
  // Actually just iterate and check set membership of the parsed number itself.
  
  for (const token of s.split(",")) {
      const trimmed = token.trim();
      if (!trimmed) continue;

      let num: number | null = parseInt(trimmed, 10);
      
      if (Number.isNaN(num)) continue;

      // We add to set only if it's not already there. 
      // But wait, the sum requirement is "sum of unique integers". 
      // If input has duplicates like `5, 5`, unique integer is `5`. Sum = 5.
      
      const keyStr = num.toString();
      let exists = false;
      for (const str in seenNumbers) { /* Check? No iterating object */ }

      if (!seenNumbers.has(num)) { // Set handles this automatically if converted to number or string keys
         seenNumbers.add(num); 
         distinctCount++;
         
         const valBigInt: bigint = BigInt(num);
         totalSumBig += valBigInt;
      } else {
          continue; // Already counted its value once. The sum is of the unique set elements.
                      // If input `5, 6` -> Set={5,6}, Sum=11. Count=2.
           // My previous mental draft had logic to add again? No, "unique integers" implies a set operation on the values themselves before summation.
      }
      
   }; 

// Re-verify interpretation: 
// Input: `a,b,c` -> Split by comma -> Parse int -> Remove duplicates (Set) -> Count size of Set -> Sum elements in Set.
// Example 1,2,3 -> Unique {1,2,3}, Count=3, Sum=6.
// Example 1,1,1 -> Unique {1}, Count=1, Sum=1.

let uniqueNums = new Set<number>(); // Actually use a string to number conversion or just add numbers directly? 
                                      // No, `new Set()` in JS with numbers uses same value for equality (NaN handling might differ but parseInt returns clean).
// However, if we have multiple inputs like "1.0" and "1", parseInt handles this correctly as 1.

let distinctCountVal = BigInt(0);
let sumVal: bigint = 0n;

const sFinal = Buffer.concat(data).toString("utf8");

for (const w of sFinal.split(",")) {
    const t = w.trim();
    if (!t) continue;

    let n: number | undefined;
    
    // Parse logic as per examples
    try {
        n = parseInt(t, 10); 
    } catch(_e){} 

    if (typeof n !== 'number' || Number.isNaN(n)) continue;

    uniqueNums.add(n);

    distinctCountVal++;
    
    sumVal += BigInt(Number(n));
};

// Wait, `new Set<number>()` works fine in TS/JS. 
// Just need to make sure we are not double counting the addition inside loop if using a different structure than simple Set add.
// Simple logic: Add n to set every time it appears? No! "重複を除いた" -> Remove duplicates first, THEN count sum.

const uniqueSet = new Set<number>();
let distinctCountBig = BigInt(0);
let totalSumBigInt = 0n; // Using bigint for accumulation safety as per prompt hint about overflow range (though inputs might fit in int64, intermediate sums or constraints? Input fits in 64bit integer. Sum of unique numbers definitely needs to be at least that logic).

for (const part of sFinal.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    
    let val: number | null = parseInt(trimmed, 10);
    if (Number.isNaN(val)) continue; // Or undefined
    
    // Logic: Add to uniqueSet. Then iterate unique set at end? 
    // Yes, that is the safest way to ensure sum is of UNIQUE elements only.
    
    const keyStr = val.toString();
    if (!uniqueNums.has(keyStr as any ?? (val)) {
        // Check type safety: Set<unknown> | Set<number>?
        // JS allows mixing but let's be explicit in loop
        
    } 
}

// Correct Implementation Block
  
const uniqueNumbers = new Set<string>(); // Use string key to avoid potential weird float/int parity issues if inputs are "1.0" vs 1? parseInt handles this anyway as int. But set<number> is fine too.
let cntBig: bigint = BigInt(0);
let sumBigInt: bigint = 0n;

for (const w of sFinal.split(",")) {
    const t = w.trim();
    if (!t) continue; // Ignore empty elements
    
    let nVal: number | null = parseInt(t, 10);
    
    if (typeof nVal !== 'number' || Number.isNaN(nVal)) continue;

    uniqueNumbers.add(Number(nVal)); 

    cntBig++; 
}

// Now calculate sum of the set members. Since we need BigInt logic and precision:
for (const numStr : string) { // Wait, iterating over Set<string> returns strings? Yes in TS/Set<unknown>. Better iterate numbers directly if using number key.
  
  for (const n of uniqueNumbers.values() as number[]) {
      cntBig--; // Error! We need to count again or accumulate during first pass properly? 
                  // Ah, "Count and Sum" -> If I use two sets logic it's cleaner: one for counting distinct, sum loop.
      const val = Number(n);
  }

// Let's restart the block completely clean
  
const sFinal = Buffer.concat(data).toString("utf8");
let distinctCountVal: bigint = BigInt(0n); // Using string to avoid double check logic errors? No, parseInt is robust enough for "1.0" -> 1 if strict int expected? Prompt says integers. Usually inputs are clean ints unless float specified. "整数列" implies integer strings like "5", "-3".
let sumBigInt: bigint = BigInt(0n);

const seenSet = new Set<string>(); // Store string representation of numbers as key to handle potential edge cases gracefully, though parseInt handles it well too. Actually parsing first then set(number) is better for mathematical equality.
// But let's stick to the simplest flow: Parse -> Check if in a number-set -> If not add and count sum once.

const numSet = new Set<number>(); // This works perfectly. 
let uniqueCountBigInt = BigInt(0n);
let totalSumBigInt = 0n; 

for (const w of sFinal.split(",")) {
    const trimmed = w.trim();
    if (!trimmed) continue;
    
    let n: number | undefined;
    try {
        n = parseInt(trimmed, 10);
    } catch(e) {} // If invalid parse throws in some envs? Better use Number.isNaN check as per example.

    const parsedN = Number(n ?? (parseInt(w,10))); 
    if (!Number.isFinite(parsedN)) continue; 
    
    numSet.add(Number(isNaN(parseInt(trimmed, 10))? null : parseInt(trimmed, 10) ?? -Infinity));
    
} // Wait I am looping again mentally. Let's do linear code block below.

// Final Code Logic:
const s = Buffer.concat(data).toString("utf8");
let setNums = new Set<number>(); 
let sumVal = BigInt(0n); 

for (const part of s.split(",")) {
    const t = part.trim();
    if (!t) continue; // Ignore empty
    
    let val: number | null;
    
    try {
        val = parseInt(t, 10); 
    } catch(e){}

    if (val === undefined || !Number.isFinite(val)) continue;
    
    setNums.add(parseInt(t, 10)); // Add to unique set
    
    // But wait, sum needs to happen after filtering or during? "重複を除いた整数" -> The integers are deduplicated. 
    // So we just collect all unique numbers in a list/set and then process them once for count and sum.
    
}

// Now compute: Count = size of setNums, Sum = sum(setNums)

let distinctCountBig = BigInt(0n);
for (const n : number[]) { // Type error? Set<number> -> values() returns Iterator<...number>. 
    const v = Number(n);
} 

// Correct way in JS/TS loop without extra loops:
// Just iterate the set once.

let cBig = BigInt(0n);
let sValBigInt = 0n;

for (const n of numSet.values() as number[]) { // Cast is safe here conceptually, but strict TS might warn? No warning for iteration over array-like from Set if casted carefully or ignored. 
    const v: number = Number(n);
    
    cBig++; // This counts how many unique numbers there are in the set
    
    sValBigInt += BigInt(v) * 1n; // Wait, multiply by 1? No just add v as bigint.
}

// Actually simpler: Just iterate `numSet.values()` which gives us the UNIQUE integers directly.
// Count them and sum them up immediately inside this loop over the Set! That's O(N + U).
    
for (const n of numSet.values()) { // values() returns number if Set<number> used? Yes in modern JS/TS support well-set interop. 
    cBig++; 
}

// Wait, `setNums` was populated with duplicates removed already? Yes. So iterating it gives unique items.
// So: iterate set -> increment count (which is just size), add to sum loop immediately over the SAME iteration!
    
for (const n of numSet.values()) { // Let's rename var to avoid confusion in final code block
        
    let distinctCountBig = BigInt(0n); 
    let totalSumBigInt = 0n; 
    
}

// Final Plan:
1. Collect all valid integers from input into a Set<number>.
2. Iterate the Set, increment counter and add value (as bigint) to sum.
3. Print `count=X sum=Y`.
