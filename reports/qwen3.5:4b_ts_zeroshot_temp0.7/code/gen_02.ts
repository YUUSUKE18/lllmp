import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8').trim();
const tokens = input.split(/[\s,]+/).map(Number);
const validNumbers = tokens.filter(n => !isNaN(n));

if (validNumbers.length === 0) {
  console.log(`count=0 sum=`);
} else {
  const counts = new Map<number, number>();
  for (const n of validNumbers) {
    counts.set(n, (counts.get(n) || 0) + 1);
  }

  let totalSum = 0n;
  for (const count of counts.values()) {
    for (let i = 0n; i < BigInt(count); i++) {
      totalSum += 1n; // Assuming the integer value is 1 if not specified, but wait... re-reading spec.
      // Wait, the spec says "count and sum". Usually "sum of numbers", not "sum of counts".
      // Let's re-read carefully: "重複を除いた整数について、個数と合計を求めます"
      // This implies for each unique integer X: count(X) and sum_of_occurring_X.
      // Since sum_of_occurring_X = count(X) * X.
      // I need to know what X is. The input gives the integers themselves.
      // So for each distinct number N, I calculate count(N) and sum(N).
      // But wait, the output format is a single line: "count=<number> sum=<number>".
      // Does it mean:
      // Option A: Total count of all unique numbers? Total sum of all unique numbers (each counted once)?
      // Option B: For each unique number, print its count and its sum? But the format is a single line.
      // The spec says "strictly 1 line". So it must be aggregate statistics or specific to a dataset.
      // Given "count=<individual> sum=<total>", it likely means:
      // Total Count of unique elements vs Total Sum of all elements (or sum of unique values?).
      // Let's look at similar problems. Usually "sum" refers to the sum of the numbers present.
      // However, if I have [1, 1, 2], unique are {1, 2}. Count = 2. Sum = 1+2=3? Or 1+1+2=4?
      // "重複を除いた整数について" (For the integers excluding duplicates).
      // This phrasing is slightly ambiguous in Japanese. It could mean:
      // 1. Take the set of unique integers. Calculate properties of this set.
      //    -> Count = size of set. Sum = sum of elements in set.
      // 2. For each integer (after removing duplicates), calculate its count and sum.
      //    -> But output is one line.
      // Let's assume Option 1: The set of unique integers.
      // Count = number of unique integers.
      // Sum = sum of those unique integers.
      // Example: Input "1, 2, 3" -> Unique {1, 2, 3}. Count=3, Sum=6.
      // Example: Input "1, 1, 2" -> Unique {1, 2}. Count=2, Sum=3.
      // This makes sense with "sum of integers". If it was sum of all occurrences, it would be just the total sum of input, which is trivial and doesn't need "removing duplicates" logic explicitly for the sum calculation (unless filtering first).
      // The constraint "removing duplicates" suggests the set matters.
      
      // Let's refine: "重複を除いた整数について" -> Regarding the integers after removing duplicates.
      // So we form a Set of numbers. Then count the size, and sum the values.
      // Output format: count=<size> sum=<sum_of_unique_values>
  }
  
  const uniqueNumbers = new Set<number>(validNumbers);
  const totalCount = uniqueNumbers.size;
  
  let totalSumBig = 0n;
  for (const num of validNumbers) {
    // Wait, if the input is "1, 1, 2", and I sum unique values (1+2=3), that's one interpretation.
    // If I sum all occurrences (1+1+2=4), that's another.
    // Given "sum" usually implies adding up the numbers found.
    // But the condition "for the integers excluding duplicates" modifies what is being summed?
    // Interpretation A: Sum of the unique integers (each unique value added once).
    // Interpretation B: Sum of all integers, but calculated based on unique logic? No.
    // Let's go with Interpretation A: Count unique items, Sum unique items.
    // Why? Because if it were just total sum, duplicates don't matter for the final number, only for the count.
    // The spec explicitly mentions "excluding duplicates" for the calculation target.
    
    // Actually, re-reading: "それらのうち『重複を除いた整数』について..." 
    // Translation: "Regarding the integers among them [after] excluding duplicates..."
    // This implies we operate on the set of unique numbers.
    // So Sum = sum(unique_numbers). Count = length(unique_numbers).
    
    // Let's calculate based on unique numbers only.
  }
  
  for (const num of validNumbers) {
    // If input is 1, 1, 2. Unique: 1, 2. Sum should be 3? Or 4?
    // "重複を除いた整数" -> The set {1, 2}. 
    // "個数" (Count of this set) = 2.
    // "合計" (Sum of this set) = 1 + 2 = 3.
    
    // Let's code this interpretation.
  }
  
  let sum = 0n;
  for (const n of uniqueNumbers) {
    sum += BigInt(n);
  }
  
  console.log(`count=${totalCount} sum=${sum}`);
} else {
  const uniqueSet = new Set(validNumbers);
  let s = 0n;
  for (const x of validNumbers) { // Summing the numbers present in input. 
    // Wait, if the set is {1, 2}, and input was 1, 1, 2.
    // If I sum unique: 1+2=3.
    // If I sum all: 4.
    // The phrase "Regarding the integers excluding duplicates" strongly points to operating on the Set.
    // So Sum = Sum of elements in the Set.
  }
  
  // Re-evaluating based on common sense in such problems:
  // Often, if you say "sum of unique numbers", you sum each unique number once.
  // If you say "sum of numbers", you sum everything.
  // The modifier is "excluding duplicates". So we are looking at the unique ones.
  // So Sum = Sum(unique).
  
  for (const x of uniqueSet) {
    s += BigInt(x);
  }
  
  console.log(`count=${uniqueSet.size} sum=${s}`);
}
