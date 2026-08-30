import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
    const numbers = line.trim().split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    
    if (numbers.length === 0) {
        console.log(`count=0 sum=`); // Or handle empty case specifically? The spec implies input is integer sequence. If no valid integers, count should be 0 and sum undefined or handled. Let's assume valid non-empty inputs based on typical CP problems unless specified otherwise. However, to be safe: 
    } else {
        const uniqueNumbers = new Set(numbers); // This gives the set of distinct numbers
        
        let totalSum = 0;
        
        for (const num of uniqueNumbers) {
            totalSum += num;
            
            console.log(`count=${uniqueNumbers.size} sum=${totalSum}`);
            break; 
        }
    }

}); // Note: The above logic has a flaw. It should iterate over the UNIQUE numbers, and for each unique number, calculate its count (frequency) in the original array AND add it to SUM? NO! Re-reading spec: "重複を除いた整数" -> These are distinct integers. 
// Let's re-parse carefully.
// Spec says: 1. Accept comma-separated integer sequence from stdin.
//         2. For these, among them... regarding the UNIQUE integers (distinct ones), get count and sum?
// Wait, ambiguous interpretation A or B?
/* Interpretation A: 
   Input: [10, 5, 10, 3] -> Unique are {10, 5, 3}
   What does "count" mean for a unique integer in this context of the SPECIFIC LINE output format `count=<N> sum=<S>`? 
   Is it asking: For each distinct number X, how many times did it appear (Count_X), and what is Sum_of_all_unique_numbers? Or Count_total_distinct_count_and_sum_distinct_values?
   
   Usually "重複を除いた整数について... 個数と合計" implies aggregating the UNIQUE set. 
   If unique numbers are {10, 5, 3}:
   - Individual counts of these specific values in original array: count(10)=2, count(5)=1, count(3)=1? That's multiple lines needed. But output is ONE line `count=<...> sum=...`. 
   - So it likely means the properties OF THE SET of unique numbers themselves relative to their occurrence or value?
   
   Actually, maybe: "Regarding the distinct integers found" -> The set S = {distinct elements}. 
   For this set S: How many are there (size)? What is their sum (sum(S))?
   
   Example Input: 10,5,10,3
   Distincts: 10, 5, 3. Count of distinct numbers = 3. Sum of distinct numbers = 28? Or does it mean count how many times each number appears and sum those counts? No "合計" usually means arithmetic sum of values unless specified otherwise ("頻度の和").
   
   Let's check the Japanese phrasing again: 
   『重複を除いた整数』について (Regarding the integers after removing duplicates) ... 個数と合計を求めます。
   Usually, if it meant frequency count, it would say "各整数の出現回数を求める".
   If it meant sum of frequencies, it might be phrased differently.
   
   Given the output format `count=<N> sum=<S>`: 
   Most logical interpretation for a SINGLE line output over a list of unique numbers is:
   N = Number of UNIQUE integers found in input.
   S = Sum of those UNIQUE integer values.
   
   Or does it mean: For each distinct number, take its frequency? No, that would require multiple outputs unless aggregated sum of frequencies (which equals total elements) or something else. 
   
   Let's assume the standard interpretation for such problems when asking about a subset property on unique items:
   The "integers" in question are the set {x | x appears in input}.
   Count = size({distinct values}).
   Sum = sum({distinct values}).
   
*/

    // Refined Logic based on Interpretation (Count of distincts, Sum of distincts):
    
        const uniqueValuesSet: number[] = []; 
        for(const n of numbers) {
            if(!uniqueValuesSet.includes(n)) {
                uniqueValuesSet.push(n);
            }
        }
        
        // Filter non-numeric again just in case logic was applied before filtering? No, already filtered.
        const distinctCount = uniqueValuesSet.length;
        let sumVal = 0n as bigint; // Use BigInt for safety though spec says fits in 64bit int
        
        for(let x of uniqueValuesSet) {
            if (!Number.isInteger(x)) continue; 
            sumVal += BigInt(Math.round(x)); // Ensure integer math on potentially parsed floats? Input is integers. parseInt handles this.
        }

        console.log(`count=${distinctCount} sum=${sumVal}`);
    } else {
        // If no valid integers found, what to output? 
        // Spec: "整数として解釈できない要素も無視します" -> Ignore them. Result is empty set of unique ints.
        // Count=0, Sum=? (empty sum). Let's print count=0 sum= or just handle gracefully.
        console.log(`count=${numbers.length === 0 ? 0 : distinctCount} sum=${totalSum}`); 
    }

});
