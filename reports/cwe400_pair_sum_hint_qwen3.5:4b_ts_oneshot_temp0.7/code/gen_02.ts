const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);

  let targetLineIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "") continue;
    try {
      const val = parseInt(lines[i], 10);
      if (!Number.isNaN(val)) {
        targetLineIndex = i;
        break;
      }
    } catch {}
  }

  if (targetLineIndex === -1) {
    console.log("pairs=0");
    return;
  }

  const targetVal = parseInt(lines[targetLineIndex], 10);
  const values: bigint[] = [];
  const valueSet = new Set<string>();

  for (let i = targetLineIndex + 1; i < lines.length; i++) {
    if (lines[i].trim() === "") continue;
    try {
      const val = BigInt(parseInt(lines[i], 10));
      if (!Number.isNaN(val)) {
        values.push(val);
        valueSet.add(val.toString());
      }
    } catch {}
  }

  let count = 0n;
  for (let i = 0; i < values.length; i++) {
    const v1 = values[i];
    if (valueSet.has((targetVal - v1).toString())) {
      // Check if the pair is not (i, j) where j <= i. 
      // Since we are iterating through the list and checking a Set of all values encountered so far? 
      // No, the problem asks for pairs with different positions.
      // A simple approach: iterate all pairs. But that's O(N^2). 
      // The input can be large (64-bit integers), but N isn't specified as small.
      // However, if N is very large (e.g., 10^5 or more), O(N^2) might TLE.
      // Let's re-read the constraint: "敵対的に大きな入力に対しても、実用的な時間とメモリで完了".
      // This usually implies an efficient algorithm, likely O(N log N) or O(N).
      
      // Using a frequency map (Map<bigint, number>) is better than a Set if duplicates exist.
      // We need to count pairs (i, j) with i < j such that values[i] + values[j] == targetVal.
      // If we use a Map:
      // 1. Iterate through the array.
      // 2. For current value v, check how many previous values are equal to target - v.
      // 3. Add count of (target - v) to total pairs.
      // 4. Increment count of v in the map.
      
      // Wait, does "different positions" mean just i != j? Yes. 
      // If we have duplicates, e.g., target=10, values=[5, 5]. 
      // 5+5=10. That's one pair (index 0, index 1).
      // Using the map approach:
      // Process first 5: need 5. Map has 0 of 5. Add 0. Map[5]=1.
      // Process second 5: need 5. Map has 1 of 5. Add 1. Map[5]=2.
      // Total = 1. Correct.
      
      // What if target=10, values=[5, 4, 6]. 
      // First 5: need 5. Map[5]=0. Add 0. Map[5]=1.
      // Second 4: need 6. Map[6]=0. Add 0. Map[4]=1.
      // Third 6: need 4. Map[4]=1. Add 1. Map[6]=1.
      // Total = 1. Correct (4+6).
      
      // So we can do this in O(N) with a Map.
      
      const needed = targetVal - v1;
      count += valueSet.get(needed.toString()) ?? 0n; 
      // Wait, Set doesn't give counts if duplicates exist.
      // I used Set earlier but need counts for duplicate values to handle cases like [5, 5] correctly?
      // Actually, if I use a Map to store frequencies of elements seen SO FAR:
      // But the problem says "positioning is different". It doesn't restrict order (i < j or any).
      // Counting pairs {a, b} where a + b = target. Order doesn't matter for the set of values, but indices do.
      // The number of such pairs is unique regardless of order if we just count combinations.
      
      // Let's refine:
      // We can iterate through the array once.
      // Maintain a frequency map of numbers seen so far.
      // For each number x in the array:
      //   target - x might be in the map. If yes, add its frequency to count.
      //   Increment frequency of x in the map.
      
      // Is this correct? 
      // Example: [5, 5], target=10.
      // i=0, x=5. needed=5. Map has {} -> count += 0. Map[5]=1.
      // i=1, x=5. needed=5. Map has {5:1} -> count += 1. Map[5]=2.
      // Total 1. Correct.
      
      // Example: [4, 6], target=10.
      // i=0, x=4. needed=6. Map {} -> count+=0. Map[4]=1.
      // i=1, x=6. needed=4. Map {4:1} -> count+=1. Map[6]=1.
      // Total 1. Correct.
      
      // Example: [3, 7, 3], target=10.
      // i=0, x=3. needed=7. Map {} -> 0. Map[3]=1.
      // i=1, x=7. needed=3. Map {3:1} -> 1. Map[7]=1.
      // i=2, x=3. needed=7. Map {3:1, 7:1} -> 1. Map[3]=2.
      // Total 2. Pairs are (0,1) and (1,2). Correct.
      
      // So the algorithm is:
      // Initialize count = 0n, map = new Map<bigint, number>().
      // For each val in values:
      //   needed = targetVal - val
      //   if map.has(needed) -> count += map.get(needed)!
      //   map.set(val, (map.get(val) ?? 0) + 1)
      
      // This is O(N) time and O(N) space. Efficient enough for large inputs.
      
      const needed = targetVal - v1;
      let found = valueSet.get(needed.toString()); 
      // Wait, I switched back to Set but need counts.
      // Let's use a Map from start. It's more robust.
      
      // Re-declare map inside the loop logic? No, define it outside.
    }
  }
  
  // Re-implementing the counting logic properly with a Map
  const freqMap = new Map<bigint, number>();
  for (const val of values) {
    const needed = targetVal - val;
    if (freqMap.has(needed)) {
      count += BigInt(freqMap.get(needed)!);
    }
    freqMap.set(val, (freqMap.get(val) ?? 0) + 1);
  }

  console.log(`pairs=${count}`);
});
