```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.trim().split(/\r?\n/);
  
  if (lines.length === 0 || lines[0].trim() === "") {
    console.log("pairs=0");
    return;
  }

  const target = parseInt(lines[0], 10);
  if (Number.isNaN(target) || !Number.isFinite(target)) {
    console.log("pairs=0");
    return;
  }

  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n) || !Number.isFinite(n)) continue;
    numbers.push(n);
  }

  let count = 0n;
  // 64bit signed integer range for values means roughly +/- 9e18.
  // If we have ~15M integers, O(N^2) is too slow (N^2 ~ 2e11).
  // We need a hash map or sorting approach. Given the "adversarial" requirement,
  // we should assume N could be up to ~2*10^6 at most for practical limits (1-2 sec time limit often),
  // or even larger if the language is fast enough, but typically O(N log N) or O(N) hashing is needed.
  // Since max value fits in 64-bit, we can use a Map or sort. 
  // Sorting two pointers is safer for memory than a huge HashMap in JS due to sparse large keys? 
  // Actually, with target up to 9e18 and numbers up to 9e18, the range of possible keys is massive.
  // But we only store N keys. A Map in JS handles objects efficiently.
  // However, constructing pairs: if A + B = T => B = T - A. We just need to count occurrences.
  // Let's use a frequency map (Map<number, bigint>).

  const freq: Record<number, bigint> = {};
  for (const x of numbers) {
    freq[x] = (freq[x] || 0n) + 1n;
  }

  let seenKeys = new Set<number>(); // To avoid double counting pairs within same frequency group or across groups?
  // Actually, standard way to count pairs (i, j) with i < j such that a[i] + a[j] == target:
  // Iterate through unique numbers present. For each number x:
  //   if we need y = target - x.
  //   If y == x: we need C(freq[x], 2) pairs.
  //   If y != x: we add freq[x] * freq[y]. But to avoid double counting, only process when x < y (lexicographically or value).
  
  // Wait, the problem says "2個の組（位置が異なる 2 個）". This implies index matters. 
  // So if input is [10, 20], target=30 -> pair (10, 20) and (20, 10) are different indices but same values?
  // Usually "number of pairs" means unordered pairs of indices {i, j} where i != j.
  // So [10, 20] -> 1 pair. [10, 20, 30], target=40 -> (10, 30) and (20, ?). If 20+20=40? No, distinct indices.
  // If input is [20, 20, 20], target=40. Pairs: idx(0,1), idx(0,2), idx(1,2) -> 3 pairs.
  // Correct logic:
  // Sum over all unique values v: 
  //   Let cnt = freq[v].
  //   Let needed = target - v.
  //   If needed == v: count += cnt * (cnt - 1) / 2;
  //   If needed != v: if (v < needed) count += cnt * freq[needed];
  
  for (const val in freq) {
    const x = parseInt(val, 10);
    const xBig = BigInt(x);
    
    // Optimization: sort keys to ensure we only process each pair once.
    // But iterating the map object is not ordered. Let's sort the array of numbers first? 
    // Sorting N elements is O(N log N). If N=2*10^6, this is fine in TypeScript/Node.js.
    // It avoids hash map overhead and potential sparse key issues if we use array indexing with offsets? 
    // No, values are huge (64-bit), so we can't index directly. We need Map or Sort+TwoPointer.
    // Two pointers on sorted array: O(N log N) due to sort. Very safe for memory and time.
    
  }
  
  // Re-evaluating strategy: Sorting + Two Pointers is robust against hash collisions and memory fragmentation.
  numbers.sort((a, b) => (a < b) ? -1 : ((b > a) ? 1 : 0));

  let left = 0;
  let right = numbers.length - 1n; // Use n bigint for count
  // Wait, two pointers works on indices.
  
  count = 0n;
  // Since we sorted by value, duplicate values are adjacent.
  // Standard two pointer logic:
  // sum = nums[left] + nums[right]
  // if sum == target: 
  //    handle duplicates.
  // else if sum < target: left++
  // else: right--
  
  while (left <= right) {
    let valSum = numbers[left] + numbers[right]; // JS handles large int as BigInt only if explicitly cast? No, JS Number is float64 max 9e15.
    // Problem says "values fit in 64bit integer". Max safe integer is 2^53-1. 
    // Values up to 2^63-1 might lose precision in JS sum if not BigInt.
    // The prompt says "value and count are within 64bit integer range".
    // So we must use BigInt for arithmetic to be safe, even though input parsing is Number?
    // parseInt returns Number. If input is > 9e15, it becomes Infinity or loses precision.
    // We should parse using BigInt directly or check limits. 
    // To be safe: if input string length > 16, it's risky with parseFloat/parseInt Number.
    // But standard `BigInt` constructor works on string. Let's parse as BigInt immediately to avoid overflow.

    // Refined Plan: Parse all numbers as BigInt initially.
  }
  
  // Reset for correct implementation with BigInt
  const bNums: bigint[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    let n: bigint;
    try {
      n = BigInt(line); // Handles full 64-bit string safely
    } catch (e) {
      // Invalid input, skip
      continue;
    }
    bNums.push(n);
  }

  bNums.sort((a, b) => a < b ? -1 : (b > a ? 1 : 0));

  let l = 0n;
  let r = BigInt(bNums.length) - 1n;
  
  count = 0n;
  const targetBig = BigInt(target);

  while (l <= r) {
    // Calculate sum using BigInt
    const sum = bNums[l] + bNums[r]; 

    if (sum === targetBig) {
      // Found a match. Count duplicates for this pair of indices.
      // We have potentially many identical values around l and r? 
      // Actually, standard logic:
      // 1. If bNums[l] < bNums[r]:
      //    Then we need unique pairs. Since array is sorted, all elements from l to (first different value - 1) are same as bNums[l].
      //    All elements from (last different value + 1) to r are same as bNums[r].
      //    Wait, if multiple copies of same value exist at both ends?
      //    Example: [20, 20, 30], target=40. l points to first 20 (idx 0), r points to 30 (idx 2). Sum=50 > 40. r--.
      //    l=0, r=1. bNums[0]=20, bNums[1]=20. Sum=40. Match!
      //    Now we have duplicates of the same value? Here l and r point to different indices with same value.
      //    Logic: 
      //    While l < rightSame and r >= leftSame... getting complicated.
      
      // Simpler approach for sorted array with duplicates:
      // Iterate through unique values? Or use a map again? 
      // Given the constraints (adversarial large input), Map might be slower or memory heavy due to object overhead, 
      // but sorting + two pointers is optimal O(N log N) space-wise too.
      
      // Let's restart the loop logic with robust duplicate handling:
      
      // Count occurrences of bNums[l] and bNums[r].
      let leftVal = bNums[l];
      let rightVal = bNums[r];

      // If values are same, it means we need l + something = r? 
      // No, if bNums[l] == bNums[r], then 2 * val == target.
      
      if (leftVal === rightVal) {
        // Only possible if target = 2 * leftVal
        // We found a set of indices where value is X and we need pairs within them.
        // All remaining elements from l to r are X? 
        // Yes, because sorted.
        const len = r - l + 1n;
        count += (len - 1n) * BigInt(len);
        // Wait, number of ways to choose 2 from k is k*(k-1)/2.
        // But wait, the loop condition `l <= r`. If we process all pairs at once here, we need to advance both l and r.
        // Actually, if bNums[l] == bNums[r], then ALL elements between l and r are equal to that value.
        // Because sorted. So count += (r - l + 1) * (r - l) / 2;
        // Then set l = r + 1 (break).
        
        const k = r - l + 1n;
        count += (k * BigInt(k-1)) / 2n;
        l = r + 1n; 
        continue; 
      }

      if (sum === targetBig) {
        // Count how many times leftVal appears (cntL) starting from l
        let cntL = 0n;
        while (l < right + 1n && bNums[l] === leftVal) { // l < r+1 because we are iterating up to current state
           cntL++;
           l++; 
        }
        
        // Count how many times rightVal appears ending from r backwards
        let cntR = 0n;
        while (r > l - 1n && bNums[r] === rightVal) { // r > l-1 means r >= l. Wait, we need to handle the range correctly.
           cntR++;
           r--;
        }
        
        // We must ensure we don't count the same pair twice. 
        // The standard logic for distinct values (leftVal != rightVal):
        // Add cntL * cntR to total.
        // BUT, we modified l and r in the while loops above! That's bad state if not careful.
        // Better: do the counting on the fly without mutating l/r permanently until done? 
        // Or restructure.

        // Correct two-pointer with duplicates:
        // 1. If bNums[l] == bNums[r]: handle block, break.
        // 2. If sum < target: l++. (Move to next unique)
        // 3. If sum > target: r--.
        // If sum == target:
        //   It could be that there are multiple copies of leftVal and multiple copies of rightVal.
        //   We need to count pairs between the block of leftVal's and block of rightVal's.
        //   Let i be index of first occurrence of leftVal (currently l).
        //   Let j be index of last occurrence of rightVal (currently r).
        //   Find end of leftVal block: next_l. Find start of rightVal block: prev_r.
        //   Count += (next_l - i) * (j - prev_r + 1n).
        //   Then set l = next_l, r = prev_r - 1n.
        
      }
      
    } else if (sum < targetBig) {
      l++;
    } else {
      r--;
    }
  }
  
  // Wait, the logic inside `if (sum === targetBig)` above was interrupted. Let's rewrite cleanly.

  count = 0n;
  l = 0n;
  r = BigInt(bNums.length) - 1n;

  while (l <= r) {
    const leftVal = bNums[l]; // BigInt
    const rightVal = bNums[r]; // BigInt
    
    if (leftVal === rightVal) {
      // All elements from l to r are same. We need pairs within this group.
      const countItems = r - l + 1n;
      count += (countItems * BigInt(countItems - 1)) / 2n;
      break; // Done with entire array as they are all same
    }

    let sum = leftVal + rightVal;

    if (sum < targetBig) {
      l++;
    } else if (sum > targetBig) {
      r--;
    } else {
      // Found a matching pair of values.
      // Count duplicates for both ends without messing up l and r prematurely.
      
      let i = l;
      let j = r;
      
      // Move i to end of same values
      while (i < r && bNums[i] === leftVal) { // strict less than r because rightVal != leftVal here? 
        // Wait, if leftVal != rightVal, then max(i) can be at most the block before r starts?
        // Not necessarily. We just need to find the count of leftVal starting from l.
        i++;
      }
      // The above while loop is flawed if we don't stop correctly. 
      // Let's do separate scans.
      
      // Count occurrences of leftVal in range [l, r]
      let cntL = 0n;
      let idxL = l;
      while (idxL <= r && bNums[idxL] === leftVal) {
        cntL++;
        idxL++;
      }
      
      // Count occurrences of rightVal in range [l, r]
      let cntR = 0n;
      let idxR = r;
      while (idxR >= l && bNums[idxR] === rightVal) {
        cntR++;
        idxR--;
      }
      
      // However, we must ensure that the overlapping part (if any) is handled?
      // Since leftVal != rightVal, the blocks of identical values are disjoint sets of indices.
      //
