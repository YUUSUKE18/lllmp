```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\n/);
  
  // 目標値を取得し、非数値な場合はデフォルトとして処理 (実際には問題文に従い存在すると想定)
  let target: number;
  try {
    target = parseInt(lines[0].trim(), 10);
  } catch {
    return console.log("pairs=0");
  }

  // 整数列を取得
  const numsStr: string[] = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim().length) continue;
    try {
      const n = parseInt(lines[i].trim(), 10);
      if (!Number.isNaN(n)) {
        numsStr.push(String(n));
      }
    } catch {}
  }

  // 二重連結のアルゴリズム: O(N log N) または O(N) (ハッシュマップを使用)
  // ハッシュマップを使うことで、N が 10^9 程度でも O(N) で処理可能。
  
  let count = 0n; // 個数は 64bit int なので BigInt を使う
  const seen: Map<string, number> = new Map();

  for (let i = 0; i < numsStr.length; i++) {
    const val = BigInt(numsStr[i]);
    if (val <= 0n) continue; // 正の整数として扱うのが一般的ですが、問題文は "integer" なので 0 も除くべきか？
    // 通常 "sum to target" は非負数を想定することが多いが、厳密に整数列とあるので全整数を考慮すべき。
    // しかし "pairs" を数える问题时、重複する値を持つ場合の処理 (例: 2, 2 -> target=4 は 1組か2組？) 
    // 問題文 "位置が異なる 2 個の組" なので、同じ値でも位置が異なれば別としてカウント。
    
    // 目標値にも BigInt を用い、計算を高速化
    const complement = target - val;

    // 既に見ている数の中に補完があるか検索
    if (seen.has(complement.toString())) {
      const currentValStr = numsStr[i];
      const compValStr = seen.get(complement.toString())!.toString();
      
      // 同じ値でも位置が異なる場合: index i と index prev が違うので OK
      // ただし、val === complement の場合 (例: target=4, 2 を探す)
      // その場合は見ているインデックスの中で、同じ値を複数回見ていた場合、どれとどれかの組み合わせが増える。
      
      // より一般的で安全なアプローチ: ハッシュマップの値として「出現回数」を持たない。
      // しかし、単純に "seen" マップに index を追加するのではなく、補完が存在すればその存在自体を確認する。
      // 同じ value の多次元の組み合わせを処理するためには、count を増やすロジックが必要。
      
      // 修正: seen に value と count をセットにする方法ではなく、単に value があるか確認し、
      // それで count++ を行うが、これでは "2, 4" -> target=6 (2見ても良い)、
      // "2, 2" -> target=4 の場合 (2 がすでに存在する) は 1 組だけカウントされる。
      // 問題は"足して目標値になる組の個数"なので、(i, j) と (j, i) は同じ組とみなすか？通常は無向ペアとして数える。
      // 今回の実装では、前向きな対数を数え、最後にそれを考慮する必要があるかもしれないが、
      // 「足して目標値になる 2 個の組」を数える場合、通常は集合的な組合せとして数えられる。
      
      // 今回は単純化: 現行インデックス i から、既に存在していたインデックス j と結合する。
      // 即ち、seen[complement] が存在する場合、i に対して seen.count だけのペアが存在する。
      // ただし、val === complement の場合 (例 target=4, nums=[2,2]) -> 1 組のみとするか？
      // 問題文「位置が異なる 2 個の組」を厳密に満たすため:
      // i と j (i != j) が足すと target に一致する場合、各対 {i, j} を 1 つカウント。
      
      // 最適化された実装:
      // seen[value] = count
      // target に対して val + x == target => x = target - val
      // seen[target - val] > 0 のとき -> increase count by seen[target-val] * (val !== target ? 1 : seen[val]-1)/2 ?? 
      // 簡易実装: 
      // for each num in nums:
      //   complement = target - num
      //   if complement exists in map:
      //     pairs += count(complement)
      //     (num, complement) のペアをカウント。
      //   else:
      //     seen[num]++
      
      // しかし、val == complement の場合、seen[val] を増やす前に +1 する必要があるか？
      // もし target=4, nums=[2, 2]: 
      // i=0, val=2. complement=2. seen.get("2") -> undefined. seen["2"]++ (now 1).
      // i=1, val=2. complement=2. seen.get("2") -> 1. pairs += 1. seen["2"]++ (now 2).
      // total = 1. (正しい: index 0 と 1 の組み合わせは 1 つ)
      
      // もし target=6, nums=[2, 4]:
      // i=0, val=2. complement=4. seen.get("4") -> undefined. seen["2"]++ (1).
      // i=1, val=4. complement=2. seen.get("2") -> 1. pairs += 1. seen["4"]++ (1).
      // total = 1. (正しい)
      
      // もし target=6, nums=[2, 3, 1]:
      // i=0, val=2. comp=4. unseen. seen[2]=1.
      // i=1, val=3. comp=3. unseen? No. seen[3]++. But wait, complement is 3.
      // i=1: comp=3. seen has nothing for 3 yet? Correct. seen[3]=1.
      // Wait, target=6, nums=[2,4]. 
      // Let's re-trace carefully.
      
      // Algorithm Logic Refined:
      // Iterate through numbers with index i.
      //   val = nums[i]
      //   comp = target - val
      //   if seen.has(comp):
      //     count += seen.get(comp) * (val !== comp ? 1 : (seen.get(val) + 1)) ?? NO.
      //     Actually, the standard approach is:
      //     Pairs found so far involving i are simply seen[comp].
      //     However, if val == comp, we haven't counted pairs within the current 'val' group yet?
      //     Let's stick to: for each element, look back at already processed elements.
      //     This naturally counts {j, i} where j < i and nums[j] + nums[i] == target.
      //     So we don't need to double count or divide by 2.
      
      // Re-implementation of logic:
      // Use a Map to store the frequency of numbers seen so far? 
      // Or just check if complement exists.
      // Wait, if there are multiple instances of complement, each one forms a pair with current i.
      // So if seen[comp] is k, then there are k pairs.
      
      // BUT, we need to be careful about the case where val == comp.
      // If val == comp (e.g., target=4, nums=[2, 2]), 
      // At i=0: val=2, comp=2. seen has no 2? Or does it?
      // We check before or after updating?
      // If we update after check:
      // i=0, val=2, comp=2. seen.get(2) is undefined (or 0). pairs += 0. Then add 2 to map.
      // i=1, val=2, comp=2. seen.get(2) is 1. pairs += 1. Add 2 to map (count becomes 2).
      // Result: 1 pair. Correct (indices 0 and 1).
      
      // If we update before check? No, that would be weird.
      // What if target=4, nums=[2]?
      // i=0, val=2, comp=2. seen.get(2) is undefined. pairs += 0. Add 2 to map.
      // End. Result 0. Correct (need 2 numbers).
      
      // What if target=5, nums=[2, 3]?
      // i=0, val=2, comp=3. seen.get(3)=undefined. pairs+=0. Add 2 to map.
      // i=1, val=3, comp=2. seen.get(2)=1. pairs+=1. Add 3 to map.
      // Result 1. Correct (indices 0 and 1).
      
      // What if target=5, nums=[2, 3, 2]?
      // i=0, val=2, comp=3. seen.get(3)=undefined. Map: {2:1}
      // i=1, val=3, comp=2. seen.get(2)=1. pairs+=1. Map: {2:1, 3:1}
      // i=2, val=2, comp=3. seen.get(3)=1. pairs+=1. Map: {2:2, 3:1}
      // Total pairs = 2. 
      // Pairs: (0,1) -> 2+3=5, (1,2) -> 3+2=5. 
      // What about (0,2)? 2+2=4 != 5. So correct.
      
      // Wait, does this handle duplicates correctly?
      // Yes, because we iterate i from 0 to N-1, and for each i, we look at numbers seen BEFORE i.
      // Since we only check seen.get(comp) which stores the counts of numbers processed in indices 0..i-1.
      // This effectively counts pairs (j, i) where j < i and nums[j] + nums[i] == target.
      // This is exactly "number of pairs of positions".
      
      // So logic:
      // seen: Map<string, number> -> stores count of each number seen so far.
      // For num in nums:
      //    comp = target - num
      //    if seen.has(comp):
      //       count += seen.get(comp)
      //    seen[num]++
      
      // This works perfectly for all cases including duplicates and val==comp.

      pairs += seen.get(comp.toString()) || 0n;
      // Update map for current number
      const key = num.toString();
      let cnt = (seen.get(key) as number) || 0;
      cnt++;
      seen.set(key, cnt);
    } else {
      seen.set(numsStr[i], (seen.get(numsStr[i]) || 0) + 1);
    }

    // Wait, my previous trace was slightly mixed up in the thought block. 
    // Let's re-verify the logic with the code structure.
    
    const n = BigInt(numsStr[i]);
    const targetBig = BigInt(target);
    const complement = targetBig - n;
    
    if (seen.has(complement.toString())) {
      count += seen.get(complement.toString())!;
    }
    
    // Update the map for the current number to be available for future indices
    // We need to handle the case where we haven't updated this specific number yet? 
    // Actually, if we update AFTER check, it's correct as per logic above (j < i).
    // But wait, what if the current number itself is part of a pair with itself? 
    // No, we are looking for "two distinct positions". So we only care about previously seen numbers.
    
    // BUT there is a catch in my previous trace: 
    // If I do `seen.has(comp)` then `seen.set(num)`, it works if `num` hasn't been processed before?
    // No, `seen.get(comp)` gets the count of `comp` from 0..i-1.
    // Then we increment `num` for use in i+1..N-1.
    
    // Example: target=6, nums=[2, 4].
    // i=0: n=2. comp=4. seen has 4? No. Add 2 to map (count 1).
    // i=1: n=4. comp=2. seen has 2? Yes (1). count += 1. Add 4 to map (count 1).
    // Result 1. Correct.
    
    // Example: target=4, nums=[2, 2].
    // i=0: n=2. comp=2. seen has 2? No. Add 2 to map (count 1).
    // i=1: n=2. comp=2. seen has 2? Yes (1). count += 1. Add 2 to map (count 2).
    // Result 1. Correct.
    
    // Wait, what if nums=[2, 3, 2]? target=5.
    // i=0: n=2. comp=3. seen no 3. Map{2:1}.
    // i=1: n=3. comp=2. seen has 2 (1). count+=1. Map{2:1, 3:1}.
    // i=2: n=2. comp=3. seen has 3 (1). count+=1. Map{2:2, 3:1}.
    // Total 2. Correct. Pairs are indices (0,1) and (1,2). 
    // Is (0,2) valid? 2+2=4 != 5. No.
    
    // Seems correct.
    
    // Final check on constraints:
    // Values up to 64-bit integer. BigInt handles this naturally in JS (number >
