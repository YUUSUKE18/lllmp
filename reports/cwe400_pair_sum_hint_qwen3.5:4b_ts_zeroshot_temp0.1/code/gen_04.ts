import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');

if (input.length === 0) {
    console.log('pairs=0\n');
    process.exit(0);
}

const target = parseInt(input[0], 10);
if (isNaN(target)) {
    console.log('pairs=0\n');
    process.exit(0);
}

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

const n = numbers.length;
let count = 0n; // Use BigInt for safety with large counts, though problem says result fits in 64-bit.

// Two-pointer approach for O(N) time complexity
// Sort the array first to use two pointers effectively
numbers.sort((a, b) => a - b);

let left = 0;
let right = n - 1n; // Cast to number for indexing

while (left < right) {
    const sum = numbers[left] + numbers[right];
    
    if (sum === target) {
        count++;
        // Move both pointers. Since array is sorted, there might be duplicates.
        // We need to skip duplicates to avoid counting the same pair multiple times 
        // if the problem implies unique pairs of values, OR if it implies distinct indices.
        // The problem says "2 個の組（位置が異なる 2 個）". This usually means distinct indices (i, j).
        // If there are duplicate values at different indices, they form valid pairs.
        // Example: [1, 1, 2], target=2. Pairs: (0,1), (0,2) is invalid (sum 3), (1,2) sum 3. 
        // Wait, [1, 1, 2] with target 2 -> indices 0 and 1 sum to 2. That's 1 pair.
        // Example: [1, 2, 3], target=4. Pairs (1,2) and (1,3)? No, 1+2=3, 1+3=4, 2+3=5. Only one pair.
        // Example: [1, 2, 3, 4], target=5. Pairs: (1,4), (2,3). Two pairs.
        
        // If we have duplicates like [1, 1, 2] and target=2. 
        // Indices: 0, 1. Sum = 2. Count = 1.
        // What if input is [1, 1, 1] and target=2? No pairs.
        // What if input is [2, 2, 2] and target=4? Pairs: (0,1), (0,2), (1,2). Total 3.
        
        // The standard two-pointer logic for "count pairs with sum K" handles duplicates correctly 
        // by simply moving pointers past the current match because we are looking for ANY pair of indices.
        // However, if we just do left++ and right--, we might miss some combinations if there are multiple identical values?
        // Actually, standard two pointer:
        // If sum == target:
        //   We found a pair (left, right).
        //   Do we increment count by 1? Yes.
        //   Then we need to find other pairs involving 'left' or 'right'.
        //   But since the array is sorted, if numbers[left] + numbers[right] == target,
        //   then for any k such that left < k < right:
        //     numbers[k] >= numbers[left] and numbers[k] <= numbers[right].
        //     If numbers[k] > numbers[left], then numbers[k] + numbers[right] > target.
        //     If numbers[k] < numbers[right], then numbers[left] + numbers[k] < target.
        //   So there are no other pairs involving 'left' and any index between left and right that sum to target?
        //   Wait, if numbers[left] == numbers[left+1], then numbers[left+1] + numbers[right] == target too.
        //   So we should count all such pairs.
        
        // Correct logic for counting ALL pairs of indices (i, j) with i < j and a[i] + a[j] == target:
        // If sum == target:
        //   We have a match at (left, right).
        //   How many duplicates are there on the left side? Let's say countL.
        //   How many duplicates are there on the right side? Let's say countR.
        //   The number of pairs formed by these groups is countL * countR + ... ?
        //   Actually, simpler approach:
        //   If numbers[left] == numbers[right], then all elements from left to right are equal.
        //   Number of pairs = n*(n-1)/2 where n = right - left + 1.
        //   Else if numbers[left] != numbers[right]:
        //     We found exactly one pair (left, right) that sums to target? 
        //     Not necessarily. If there are duplicates elsewhere?
        //     No, because of sorting:
        //     If a[left] + a[right] == target.
        //     Then for any k in (left, right):
        //       a[k] >= a[left]. So a[k] + a[right] >= target. Equality only if a[k] == a[left].
        //       a[k] <= a[right]. So a[left] + a[k] <= target. Equality only if a[k] == a[right].
        //     So if a[left] != a[right], then for any k in (left, right):
        //       a[k] + a[right] > target (since a[k] >= a[left] and a[k] < a[right] implies sum > target? No. 
        //       If a[k] == a[left], sum = target. But we assumed a[left] != a[right].
        //       So if a[left] != a[right], then a[k] cannot be both >= a[left] and <= a[right] unless it equals one of them.
        //       If a[k] == a[left], then a[k] + a[right] = a[left] + a[right] = target.
        //       So if there are duplicates of a[left] between left and right, they also form pairs with a[right].
        //       Similarly for a[right].
        
        // Let's refine the two pointer logic to handle duplicates correctly.
        
        // Case 1: numbers[left] == numbers[right]
        //   All elements from left to right are equal.
        //   Count += (right - left + 1) * (right - left) / 2;
        //   Move both pointers past this block.
        
        // Case 2: numbers[left] != numbers[right]
        //   We know a[left] + a[right] == target.
        //   Are there other pairs?
        //   If we have duplicates of a[left], say at indices left, left+1, ..., left+k.
        //   And duplicates of a[right], say at indices right-m, ..., right.
        //   Then any element in the left group paired with any element in the right group sums to target.
        //   Number of such pairs = (countL) * (countR).
        //   Also, are there pairs within the left group? No, because a[left] + a[left+1] = 2*a[left]. 
        //   Unless 2*a[left] == target? But we know a[left] + a[right] == target.
        //   If 2*a[left] == target, then a[right] == a[left], which is Case 1.
        //   So within the left group, no pairs sum to target (unless it's Case 1).
        //   Same for right group.
        //   So we just add countL * countR to total.
        //   Then move past both groups.
        
        // Implementation details:
        // Find how many duplicates of numbers[left] starting from left.
        // Find how many duplicates of numbers[right] ending at right.
        
        let l = left;
        while (l < right && numbers[l] === numbers[left]) {
            l++;
        }
        const countL = l - left;
        
        let r = right;
        while (r > left && numbers[r] === numbers[right]) {
            r--;
        }
        const countR = right - r;
        
        // Add pairs between the two groups
        count += BigInt(countL) * BigInt(countR);
        
        // Move pointers to skip these groups
        left = l;
        right = r;
    } else if (sum < target) {
        left++;
    } else {
        right--;
    }
}

console.log(`pairs=${count}\n`);
