import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');

if (input.length < 2) {
    console.log('pairs=0\n');
    process.exit(0);
}

const target = parseInt(input[0], 10);
const lines = input.slice(1).filter(line => line.trim() !== '');

const numbers: number[] = [];
for (const line of lines) {
    const parts = line.split(/\s+/);
    for (const part of parts) {
        const num = parseInt(part, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }
}

if (numbers.length < 2) {
    console.log('pairs=0\n');
    process.exit(0);
}

const count = new Map<number, number>();
let pairs = 0;

for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (count.has(num)) {
        const freq = count.get(num)!;
        pairs += freq;
        count.set(num, freq + 1);
    } else {
        count.set(num, 1);
    }

    const complement = target - num;
    if (complement !== num && count.has(complement)) {
        pairs += count.get(complement)!;
    } else if (complement === num) {
        // This case is handled by the first block when we encounter the second occurrence of num
        // But since we are iterating, we need to check if complement exists in the map.
        // If complement == num, we need at least 2 occurrences.
        // The logic above handles distinct pairs (i != j).
        // Let's re-evaluate: We want pairs (i, j) with i < j such that numbers[i] + numbers[j] = target.
        // Using a frequency map:
        // For current number 'num':
        // 1. If we have seen 'complement' before, add its count to pairs.
        // 2. If num == complement, we need to check if we have seen it at least once before? 
        //    Actually, the standard two-sum with frequency map logic is:
        //    - Check for complement in map. Add count.
        //    - Increment current number's count.
        // This works perfectly.
        
        // Wait, my previous logic was slightly mixed. Let's stick to the cleanest approach:
        // 1. Check if (target - num) exists in map. If so, add its frequency.
        // 2. Increment the frequency of 'num' in map.
        
        // Re-running the loop logic mentally:
        // i=0, num=x. Map has nothing. Add x to map.
        // i=1, num=y. Check target-y. If exists, add count. Add y to map.
        // This counts pairs correctly.
    }
}

// Correct Logic Implementation inside the loop:
count.clear();
pairs = 0;
for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    const complement = target - num;
    
    if (complement !== num) {
        if (count.has(complement)) {
            pairs += count.get(complement)!;
        }
    } else {
        // If complement == num, we need to check how many times 'num' has appeared before.
        // But wait, the standard algorithm is:
        // For each number x:
        //   if (map.has(target - x)) count += map.get(target - x)
        //   map.set(x, map.get(x) + 1)
        // This works for all cases including duplicates.
        
        // Let's re-verify the "complement === num" case with the standard algorithm.
        // Example: target=4, nums=[2, 2]
        // i=0, num=2. complement=2. map has no 2. map.set(2, 1).
        // i=1, num=2. complement=2. map has 2 (count 1). pairs += 1. map.set(2, 2).
        // Result: 1 pair. Correct.
        
        // Example: target=4, nums=[2, 2, 2]
        // i=0, num=2. complement=2. map has no 2. map.set(2, 1).
        // i=1, num=2. complement=2. map has 2 (count 1). pairs += 1. map.set(2, 2).
        // i=2, num=2. complement=2. map has 2 (count 2). pairs += 2. map.set(2, 3).
        // Result: 3 pairs. Correct (indices (0,1), (0,2), (1,2)).
        
        if (count.has(complement)) {
            pairs += count.get(complement)!;
        }
    }
    
    const currentCount = count.get(num) || 0;
    count.set(num, currentCount + 1);
}

console.log(`pairs=${pairs}\n`);
