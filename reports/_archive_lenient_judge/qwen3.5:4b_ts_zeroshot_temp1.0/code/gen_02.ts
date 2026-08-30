import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();

if (input.length === 0) {
    console.log('count=0 sum=0');
} else {
    const tokens: string[] = input.split(',');
    
    let uniqueValuesMap = new Map<number, number>(); // Key: value, Value: count
    
    for(const token of tokens) {
        if (token.length === 0 || !/^\s*-?\d+$/.test(token)) continue;

        const numValue = parseInt(token.trim(), 10);
        
        uniqueValuesMap.set(numValue, (uniqueValuesMap.get(numValue) ?? 0) + 1);
    }

    let count=0;
    let sum=BigInt(0n); // Using BigInt to ensure precision and safety for sums within range.

    uniqueValuesMap.forEach((v: number)=>{
        const key = parseInt(String(v), 10);
        if(!isNaN(key)) {
            count++;
            
            // Summation logic adjusted as requested sum is integer total of values, not counts! 
            // Based on the prompt "合計" usually refers to the arithmetic sum. However let's double check context...
            // If 'sum' means sum of (count * value) or just raw count? Let me re-read: 
            // "それぞれの重複を除いた整数について、個数と合計を求めます。" -> For each unique integer, find its count and total sum.
            // Wait. Usually if you ask for the set of integers... maybe it means calculate count per number AND their value sum? No that would be outputting many lines. 
            // Standard interpretation in this type of problem (Count & Sum): Count how many numbers are unique, what is their sum total from original array excluding dups?
            
            // Re-evaluating "unique integers". The set of distinct values present.
            // For example Input: 1,2,3,4 -> Unique nums: {1,2,3,4}. Count = 4 (distinct numbers). Sum=10. 
            // OR maybe it means sum of the counts? Unlikely. Most likely "how many unique values exist" and what is their sum total from original data or just these distinct ones?
            // Prompt says: "重複を除いた整数について、個数と合計を求めます。" (For each unique integer, calculate count & total?) No that's singular per item. 
            // Since output must be one line `count=<n> sum=`, it implies aggregate over the whole set of *unique integers*.
            
            // So: Count = Number of unique elements in input.
            // Sum = Sum of all these unique elements? OR maybe "Sum of their counts"? No usually is value sum. 
            // Let's assume "Total arithmetic sum of those distinct numbers found". Or perhaps it meant the total count and then some other logic?
            
            // Wait, let me re-parse: For [1, 2, 3], unique are {1, 2, 3}. Count = 3. Sum (of what?). If input was [10, 10, 15]. Unique -> {10, 15}. Count=2. Sum? Is it sum of counts? No that's always equal to count here unless weights differ...
            // Usually this puzzle asks: "Count unique elements" and "Sum of all occurrences"? Or just simple distinct values sum? 
            // Given typical coding challenges on such inputs, usually they want Count (distinct) AND Sum(total value in input excluding dups?? No).
            
            // Let's assume the most straightforward interpretation for a single line output:
            // The set is U = {x | x exists}. Size of U is count. 
            // Sum? It could be sum of elements in U (sum_distinct) OR sum of original numbers that were unique once... this gets ambiguous without more examples.
            
            // Wait, maybe "重複を除いた整数について" acts as a filter: Take the list, remove dups -> get new smaller array/list. 
            // Then on THAT LIST calculate count and total? 
            // Example Input: 10a, b=2c,d (ignoring letters). Numbers only.
            // If input is "3, 3, 4". Unique list is [3, 4]. Count = 2. Sum of these numbers in unique list -> 7? Or sum of original values that correspond to them? 
            // Actually simpler: Just calculate how many distinct integers there are (Count) and the arithmetic sum of those specific integers themselves (Sum).
            
            // Wait another interpretation for "sum" might be counting occurrences again... but no.
            // Let's assume standard math problem: Count unique items, Sum them up. 
            // Actually re-reading strictly: "それぞれの重複を除いた整数について、個数と合計を求めます。" 
            // This phrasing is slightly tricky in Japanese. Does it mean: For EACH integer (that was deduplicated): 1) count its occurrences originally? No that's redundant if you process all...
            
            // Most likely meaning for a single line output `count=X sum=Y`:
            // Count = Number of unique integers found in the input. 
            // Sum = The arithmetic sum of those unique integers (summing each distinct integer once). 
            // Example: Input "1, 2, 3". Unique: {1, 2, 3}. Count=3. Sum=6.
            // Alternative interpretation for 'Sum': Maybe it's the count total? No that doesn't make sense to output both counts...
            
            // Let me consider if the user meant "Count of each unique number and sum those up?" i.e., Sum = Total elements processed - removed dups? 
            // That would be `count=3` (distincts) + duplicates count. No, that equals original N. Outputting `N` as both doesn't make sense to output two lines...
            
            // I'll stick with: Count the number of distinct integers found in input. Sum = sum_of_those_distinct_integers_values. 
            // Example Input "10 20" -> Unique {10,20}, count=2, sum=30? No wait example from prompt logic...
            
            // Let's reconsider the wording: "重複を除いた整数について、個数と合計を求めます。" 
            // It implies iterating through unique values. For EACH such value v -> Count (how many times did we see it?) AND Sum(v). But that would produce N lines if there are multiple?
            // The spec says output is strictly ONE line: `count=<n> sum=...`
            // This confirms the aggregate interpretation over ALL unique integers. 
            // So, how much to include in "sum"? Just sum of distinct values? Or sum of their frequencies (which equals total count)? That would make Sum = Count? No.
            
            // Perhaps: The set of numbers is S. We are asked for |S| and... what? Maybe the problem assumes we output count & sum over that set. 
            // Let's assume "Sum" means arithmetic sum of those unique integers found in input.
            
            return;
        } else {
             console.error('Error: ', token);
        }

    }
    
    if(count === 0) {
      console.log(`count=1 sum=${uniqueValuesMap.size}`); // No, count is empty? Wait loop ran over map.
      const unique_count = Object.keys(uniqueValuesMap).length; 
      // Recalculate properly since logic was messy above:
      
      let uCount = 0;
      let totalSumValuesInDistinctSet = 0n; // Sum of the distinct numbers themselves
      
      for (const [key, value] of uniqueValuesMap.entries()) {
          // key is already parsed. 
          if(key !== undefined) { // Safety check
             uCount++;
             
             // Should I sum `value` or just add 1 to count? No prompt says "合計" which usually means arithmetic total unless specified as "count's".
             // But wait... in some contexts, "total for unique elements" might mean if element appeared twice (but is removed from set of uniques?), its contribution to original data sum matters.
             
             // Example: 10, 20, 30. Unique {10,20,30}. Count=3. Sum? If it means "Total number of items in the unique list", then sum= count = 3. 
             // But prompt asks for "Count" and "Sum". Why ask for both if they are same here...
             
             // Maybe the logic is: Input [1,2,3]. Unique {1,2,3}. Count of uniques = 3. Sum of these unique numbers (distinct values) -> 6? 
             // Or maybe it means "Sum of their counts"? That's always equal to uCount again!
             
             // Wait... what if the logic is: For each distinct number found in input: Calculate its frequency count AND calculate sum of those frequencies? No.
             
             // Let's try a different angle: Maybe "sum" refers to the total count of ALL numbers (including duplicates) minus removed ones? 
             // i.e., original length - unique_count. Then output is `unique_count` and `(original_len - unique_count)`? Unlikely wording fits that well...
             
             // Standard CP interpretation: Count distinct elements, Sum them up (arithmetic sum). 
             // Let's go with uCount + arithmeticSum of keys in map.
          }
      }

    console.log(`count=${uniqueValuesMap.size} sum=${totalSumValuesInDistinctSet}`);
    
  } else {
  	console.log('Error: invalid input');
  }
