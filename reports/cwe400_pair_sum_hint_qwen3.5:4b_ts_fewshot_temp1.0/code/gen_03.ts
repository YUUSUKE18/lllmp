```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let target = 0;
  let lineNum = 0;
  for (const row of s.split("\n")) {
    if (row.trim() === "") continue;
    lineNum++;
    const n = parseInt(row, 10);
    if (Number.isNaN(n)) continue;
    if (lineNum === 1) {
      target = n;
    } else {
      numbers.push(n);
    }
  }
  numbers.sort((a, b) => a - b);
  let count = 0;
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    if (numbers[left] + numbers[right] === target) {
      count++;
      // 同じ値の場合（重複元）も考慮するため、左を進める（ただし右側も同じ場合は避ける必要があるか？）
      // 問題文: "位置が異なる 2 個の組" -> [i, j] を i < j とし、numbers[i] + numbers[j] == target としてカウント。
      // 例: 入力 5, 1, 4, 3. Target=5. 
      // pairs: (0,2)->5+1=6(no), (0,3)->5+4=9(no)... wait input is numbers array after first line.
      // Let's trace example: Input: \n\n5 \n1 \n4 \n3. Target=5. nums=[1,4,3]. 
      // 1+4=5 -> ok (left=0,right=2). count++
      // next: if we move left only -> 2(3)+? no. 
      // Wait, what about duplicate values? e.g. target=4, nums=[2,2]. left=0, right=1. 2+2=4 ok. count++. left++, right-- -> loop ends. Correct.
      // What about nums=[1,2,3,4], target=5. 
      // 1+4=5 (L=0,R=3). count++. L++(1), R--(2). 2+3=5 (L=1,R=2). count++. End. Correct.
      
      // Optimization: moving both is correct only if all values are unique or we handle duplicates carefully?
      // Actually, standard two-sum counting logic:
      // Since sorted, for a fixed 'left', there can be at most one 'right' such that sum==target.
      // If numbers[left] + numbers[right] == target:
      //   It means index left and right form a pair.
      //   Is it possible to have another index k (left < k < right) such that numbers[k] + numbers[other] == target?
      //   If we move only left, we might find more pairs involving numbers[left].
      //   Wait, the question asks for number of *pairs* (indices i != j).
      //   Standard 2SUM: for each element, does there exist another? We need count of pairs.
      //   Approach: Two pointers is O(N log N) due to sorting. The scan is O(N).
      //   Logic with duplicates:
      //   If nums[left] + nums[right] == target:
      //     This pair (left, right) is valid.
      //     We can potentially have other pairs. For example nums=[1,2,3,4], target=5 -> (1,4), (2,3).
      //     If we increment left and decrement right, we skip checking numbers[left+1] with numbers[right-1]?
      //     No, we should check if there are other elements equal to nums[left] or nums[right].
      //     However, since the array is sorted:
      //     If nums[left] + nums[right] == target:
      //       Any element larger than nums[left] (but < nums[left+1] maybe?) plus any smaller than nums[right]?
      //       Actually, simpler logic: iterate 'left' from 0 to n-2. For each left, find number of valid rights? 
      //       That's O(N^2) worst case without binary search. Binary search is O(N log N).
      //       But since we are using two pointers on sorted array, can we do better than O(N)? 
      //       No, we need to count pairs. The standard two pointer approach finds *if* a pair exists. To count *how many*,
      //       we need to handle duplicates.
      //       Better approach for counting pairs in sorted array:
      //       Count frequencies of each number? Then use combinatorics? 
      //       Let's stick to the "move both" strategy but verify correctness.
      //       Actually, the standard O(N) counting sort approach:
      //       1. Sort.
      //       2. Use two pointers.
      //       If sum < target: left++ (try larger number).
      //       If sum > target: right-- (try smaller number).
      //       If sum == target: 
      //          We found a pair (L, R).
      //          Now we must check if there are duplicates.
      //          Let valL = nums[L], valR = nums[R].
      //          If valL == valR: this implies 2*valL = target. All elements between L and R (exclusive) must also be equal to valL because array is sorted.
      //             Count = (count of this value). Formula: C(k, 2) where k is frequency.
      //          If valL != valR: 
      //             Check how many times valL appears (say cL) and valR (say cR).
      //             Then we have cL * cR pairs formed by these two distinct values.
      //             Then we must advance both L and R past the duplicates of current values? 
      //             Yes, because if nums[L] is fixed, any other pair with it would require a partner smaller than nums[R]? No, larger than nums[L].
      //             Wait, if we have 1, 1, 4, 4. Target=5. Pairs: (idx0, idx2), (idx0, idx3), (idx1, idx2), (idx1, idx3). Total 4.
      //             Sorted: 1, 1, 4, 4. L=0, R=3. Sum=5. 
      //             freq(1)=2, freq(4)=2. Contribution = 2*2=4.
      //             Next L should point to the second 1? Or move L forward? If we don't increment L, we will re-process 1 again.
      //             So we need to advance L past all occurrences of nums[L] and R past all occurrences of nums[R].
      //       Algorithm refinement:
      //         while L < R:
      //           if nums[L] + nums[R] == target:
      //             cL = 0; while L+cL < R and nums[L+cL] == nums[L]: cL++;
      //             cR = 0; while R-cR > L and nums[R-cR] == nums[R]: cR++;
      //             count += (cL * cR);
      //             L += cL; 
      //             R -= cR; // Wait, if we increment L by cL, it points to the first duplicate? No.
      //             Let's trace 1,1,4,4 again.
      //             L=0, R=3. Sum=5. cL (count of 1s from L): indices 0,1 -> cL=2. cR (count of 4s from R): indices 3,2 -> cR=2.
      //             count += 4.
      //             Next: if we set L = L + 1? No, we consumed all 1s and all 4s involved in this range.
      //             Actually, since 1 < 4, no cross pairs can exist between {1s} and {4s} other than (1,4). 
      //             And we have accounted for all. So we can just set L to start of next distinct group? 
      //             But simpler: if sum == target, add contribution, then move L forward by 1 and R backward by 1?
      //             No, that misses duplicates logic correctly without counting.
      //             Let's restart the two-pointer logic for counting.
      //             It is known that sorting + counting duplicates via pointer movement works.
      //             While L < R:
      //                sum = nums[L] + nums[R]
      //                if sum < target: 
      //                   # we need larger sum -> increase L
      //                   while L < R and nums[L] == nums[L+1]: L++ (move past duplicates of L) -- WAIT, this is tricky.
      //                      If we skip all duplicates of L now, we might miss combinations with intermediate values? 
      //                      But in sorted array, if nums[L] + nums[R] < target, then for any other index k where nums[k] == nums[L], 
      //                      nums[k] + nums[R] is also < target. So skipping duplicates of L is safe *if* we are sure no other combination works.
      //                      Actually, simpler: just move L forward by 1. If there are duplicates, they will be checked in the next iteration (same value, different index) 
      //                      unless we skip them explicitly to optimize.
      //                      But skipping is complex if target logic changes.
      //                         Let's try the "count frequency map" approach? O(N) time + O(N) space. 
      //                         Constraints: 64-bit integers. Input size not specified but "practical time/memory". 
      //                         Map approach:
      //                         Iterate nums. For current x, we need target - x.
      //                         Check map.get(target - x). If exists, add count * map.get(target - x) to total?
      //                         Wait, order doesn't matter (i < j).
      //                         Case 1: distinct values a, b. Pairs = freq[a] * freq[b].
      //                         Case 2: same value a, a + a = target. Pairs = freq[a] * (freq[a]-1) / 2.
      //                         Algorithm:
      //                           sort nums (or just iterate and use hash map? Hash map is O(N) average but sorting is stable). 
      //                           Actually, we don't need to sort for the map approach if we process correctly.
      //                           But handling order i < j requires processing elements as we see them? 
      //                           Or just count frequencies of all numbers first, then iterate unique numbers.
      //                           If unique numbers u1, u2... uk sorted? Not needed.
      //                           Loop through unique numbers:
      //                             For each u:
      //                               target_u = target - u
      //                               if map exists(u):
      //                                 v_count = map[target_u]
      //                                 u_count = map[u]
      //                                 If u == target_u (i.e. 2*u == target):
      //                                    add u_count * (u_count - 1) / 2
      //                                 Else:
      //                                    if target_u < u: (to avoid double counting pairs (u, v) and (v, u))
      //                                       pass? 
      //                                    elif target_u > u:
      //                                       add u_count * v_count.
      //                                    else: 
      //                                       ... wait.
      //                           Better logic with map iteration over keys in descending order or just unique iteration:
      //                             Initialize total = 0.
      //                             For each distinct number 'u' in nums:
      //                                rem = target - u
      //                                if map.has(rem):
      //                                   count_rem = map.get(rem)
      //                                   if u < rem: 
      //                                      total += map.get(u) * count_rem
      //                                   else if u == rem:
      //                                      c = map.get(u)
      //                                      total += c * (c - 1) / 2
      //                                    return total
      //                            This works perfectly. O(N) time, O(N) space. 
      //                            Is N small enough? "Practical time/memory". Usually implies N can be large (millions). 
      //                            O(N log N) sort is fine too. Map approach might have high constant overhead or memory fragmentation?
      //                            Sorting + two pointer with duplicate counting is very cache friendly and robust.
      //                            Let's refine the two-pointer with duplicates logic for correctness and speed.
      //                            
      //                            Refined Two Pointer:
      //                            1. Sort nums.
      //                            2. L=0, R=len-1.
      //                            3. while L < R:
      //                               sum = nums[L] + nums[R]
      //                               if sum == target:
      //                                  // Count duplicates of L from left side (including L) and R from right side (including R).
      //                                  // Actually, we need to know how many numbers equal nums[L] are in [L, R]?
      //                                  // No, all numbers between L and R (exclusive) must be strictly between nums[L] and nums[R] if distinct? 
      //                                  // Not necessarily. Example: 1, 1, 4, 4. L=0, R=3. nums[L]=1, nums[R]=4.
      //                                  // Numbers equal to 1 in range [L, R]: indices 0,1. Count cL=2.
      //                                  // Numbers equal to 4 in range [L, R]: indices 2,3. Count cR=2.
      //                                  // Pairs = cL * cR = 4.
      //                                  // Then we can safely advance L and R past these duplicates? 
      //                                  // Yes, because any future pair must involve a number > 1 or < 4.
      //                                  // Since nums[L] is the smallest available, and nums[R] largest.
      //                                  // Any x in (nums[L], nums[R]) cannot pair with anything in [L+1...R-1]?
      //                                  // Wait, what if there is a y such that y + z = target where L < idx(y) < idx(z) < R?
      //                                  // But we know nums[L] + nums[R] == target.
      //                                  // If we have 1, 2, 3, 4 (sum=5). 
      //                                  // nums[L]=1, nums[R]=4. cL=1, cR=1. P
