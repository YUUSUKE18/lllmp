```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  // 1 行目から目標値を読み込む (空白を無視して整数として解析)
  let target: number | null = null;
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    const parsed = parseInt(firstLine, 10);
    if (!Number.isNaN(parsed)) {
      target = parsed;
    }
  }

  // 2 行目以降の整数を読み込む (空白を無視して整数として解析、空行や非整数は無視)
  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue; // 空行スキップ
    const parsed = parseInt(line, 10);
    if (!Number.isNaN(parsed)) {
      nums.push(parsed);
    }
  }

  // 足して目標値になる組の数を数える
  let pairs = 0;
  if (nums.length >= 2) {
    // 2 重ループを使用。O(N^2) のアルゴリズムだが、問題文では「敵対的に大きな入力」に対しても実用的な時間とメモリで完了するようにとあり、かつ「整数として解釈できない行も無視します」という制約があるため、N が十分大きい場合の最適化（ハッシュマップなど）を考慮する必要がある。
    // しかし、問題文の例を見ると、入力形式は非常に単純である（1 行に 1 個ずつ）。もし N が 10^5 程度の場合、O(N^2) は TLE する可能性がある。
    // より効率的な方法として、ハッシュマップまたはソート + 二分探索（または二点法）を使用する。
    // ここでは、値の範囲が整数型であるため、ハッシュマップを用いて O(N log N) または O(N) のアルゴリズムを実装する。
    
    // ハッシュマップアプローチ (O(N))
    const seen = new Map<number, number>(); // 値 -> 出現回数のマッピング
    for (let i = 0; i < nums.length; i++) {
      const val = nums[i];
      const complement = target - val;
      
      // もし補完数が既に存在する場合は、その出現回数分ペアが作れる
      if (seen.has(complement)) {
        pairs += seen.get(complement)!;
      }
      
      // 現在の値を記録（同じ値が複数回現れた場合も処理が必要）
      seen.set(val, (seen.get(val) || 0) + 1);
    }
    
    // ただし、上記のロジックには注意が必要な点がある。例えば、target=4, nums=[2, 2] の場合、
    // i=0: val=2, complement=2. seen に 2 がいないので pairs+=0. seen.set(2, 1).
    // i=1: val=2, complement=2. seen に 2 が 1 つあるので pairs+=1. seen.set(2, 2).
    // 結果は 1 通り (indices 0, 1)。これは正しい。
    
    // さらに、target=4, nums=[2, 2, 2] の場合:
    // i=0: val=2, comp=2. seenにない. set(2,1)
    // i=1: val=2, comp=2. seenに1つある.pairs+=1. set(2,2)
    // i=2: val=2, comp=2. seenに2個ある.pairs+=2. set(2,3)
    // 結果は 3 通り (0,1), (0,2), (1,2)。これは combinatorics で nC2 = 3C2 = 3。正しい。
    
    // 念のため、別のアプローチ（ソート + 二点法）も検討するが、ハッシュマップの方が単純で適切である。
    // ただし、JavaScript の Map は大規模データ時にパフォーマンス低下を起こす可能性があり、かつ整数の値が非常に大きすぎる場合のオーバーフローリスクもあるが、64bit 整数範囲内であれば OK。
    // さらに、N が 10^7 程度の場合、Map のオーバーヘッドが大きすぎる可能性があるため、ソート + 指針移動の方がメモリ効率的で高速である可能性もある。
    // しかし、Node.js で純 TS かつ外部ライブラリーなしという制約下では、標準の Array ソートと二点法が最も安定している実装方法となる。
    
    // 再考：ソート + 二点法 (O(N log N))
    nums.sort((a, b) => a - b);
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
      const sum = nums[left] + nums[right];
      if (sum === target) {
        pairs++; // 各値が一意である場合、1 つのペア。もし duplicates がある場合は複雑になる。
        // duplicates を考慮する必要がある。
        // 例えば target=4, nums=[2, 2, 2] の場合:
        // left=0, right=2 -> sum=4. pairs++. 左側の 2 と右側の 2 をペアとする。
        // 次に左側の 2 と右側のもう一つの 2 をペアとすべきか？
        // 上記のハッシュマップのロジックは indices を区別せずに「組の数」を計算しているが、問題文の「位置が異なる 2 個の組」という表現から、indices の組み合わせ数を指すことが自然である。
        
        // ハッシュマップのロジックを再確認:
        // target=4, nums=[2, 2, 2]
        // i=0 (idx 0): val=2, comp=2. seen{2:0} -> pairs+=0. seen{2:1}
        // i=1 (idx 1): val=2, comp=2. seen{2:1} -> pairs+=1. seen{2:2}
        // i=2 (idx 2): val=2, comp=2. seen{2:2} -> pairs+=2. seen{2:3}
        // Total = 3. これは indices (0,1), (0,2), (1,2) の 3 つを正しくカウントしている。
        
        // target=4, nums=[2, 2, 3, 3] (sums: 2+2=4, 2+3=5, 3+3=6 -> 1 組のみ? いや、2+2=4 はあり)
        // indices: 0,1 are 2; 2,3 are 3. target=4.
        // i=0 (idx 0): val=2, comp=2. seen{2:0} -> pairs+=0. seen{2:1}
        // i=1 (idx 1): val=2, comp=2. seen{2:1} -> pairs+=1. seen{2:2}
        // i=2 (idx 2): val=3, comp=1. seen{2:2, 1:0} -> pairs+=0. seen{2:2, 3:1}
        // i=3 (idx 3): val=3, comp=1. seen{2:2, 3:1, 1:0} -> pairs+=0. seen{2:2, 3:2}
        // Total = 1. indices (0,1). 正しい。
        
        // target=6, nums=[3, 3]
        // i=0: val=3, comp=3. seen{3:0} -> pairs+=0. seen{3:1}
        // i=1: val=3, comp=3. seen{3:1} -> pairs+=1. seen{3:2}
        // Total = 1. indices (0,1). 正しい。
        
        // target=6, nums=[3, 3, 3]
        // i=0: val=3, comp=3. seen{3:0} -> pairs+=0. seen{3:1}
        // i=1: val=3, comp=3. seen{3:1} -> pairs+=1. seen{3:2}
        // i=2: val=3, comp=3. seen{3:2} -> pairs+=2. seen{3:3}
        // Total = 3. indices (0,1), (0,2), (1,2). 正しい。
        
        // このハッシュマップロジックは、indices の組み合わせ数を正確に計算する。
        // ただし、N が非常に大きい場合（例：10^6）、Map のオーバーヘッドとメモリ使用量が懸念される。
        // ソート + 二点法を修正して duplicates を考慮する場合:
        // target=4, nums=[2, 2, 2] -> sort [2, 2, 2]
        // l=0, r=2. sum=4. pairs += (r-l+1). Why? 
        // indices i in [l, mid], j in [mid+1, r] such that nums[i]+nums[j]=target.
        // ここで duplicates が連続している場合、その間の組み合わせ数を計算する必要がある。
        
        // 簡易的にソートして処理:
        // l=0, r=2 (val=2). sum=4. target=4. match.
        // 左側に k 個、右側に m 個の値がある場合（同じ値が連続している）、その間の組み合わせ数は k*m? いや、左右に分ける位置は任意である。
        
        // より確実なソート + 二点法の実装:
        let l = 0;
        let r = nums.length - 1;
        while (l < r) {
          const sum = nums[l] + nums[r];
          if (sum === target) {
            // duplicates を処理するため、同じ値が連続している場合の処理が必要。
            // l 側: nums[l] ... nums[k] が同じ値である場合
            // r 側: nums[m] ... nums[r] が同じ値である場合
            let countL = 1;
            while (l + 1 < r && nums[l] === nums[l+1]) {
              l++;
              countL++;
            }
            let countR = 1;
            while (r - 1 >= l && nums[r] === nums[r-1]) {
              r--;
              countR++;
            }
            // 注意: 上記の while ループは重複して処理しないように設計が必要。
            // 正しいソート + 二点法のロジック:
            // If nums[l] + nums[r] == target:
            //   If nums[l] != nums[r]: pairs += (r - l) * 1? No. indices (l, r), (l, r-1)... no.
            //   Actually, if unique values at l and r, then there is only 1 pair involving these specific indices? 
            //   No, we need to count all pairs (i, j) with i < j such that nums[i] + nums[j] == target.
            
            // Correct logic for duplicates:
            // If nums[l] != nums[r]:
            //   pairs += (r - l) * 1? No. 
            //   Example: [2, 3, 5], target=5. l=0(2), r=2(5). sum=7!=5.
            //   Example: [2, 3, 4, 5], target=7. l=0(2), r=3(5). sum=7. match.
            //   If no duplicates at these positions: pairs += 1 (pair (l,r)).
            //   Move both.
            
            // If nums[l] == nums[r]:
            //   This implies all elements between l and r are equal to nums[l].
            //   Number of pairs is nC2 where n = r - l + 1.
            //   pairs += (r - l) * (r - l - 1) / 2;
            //   Move both.
            
            // If nums[l] + nums[r] != target:
            //   If sum < target, increment l.
            //   If sum > target, decrement r.
            
            // Let's refine the loop:
            while (l < r) {
              const s = nums[l] + nums[r];
              if (s === target) {
                if (nums[l] === nums[r]) {
                  // All elements from l to r are the same.
                  const n = r - l + 1;
                  pairs += n * (n - 1) / 2;
                  break; 
                } else {
                  // If there are duplicates of nums[l] or nums[r], we need to skip them carefully.
                  // But if nums[l] != nums[r], then the only pair is (l, r)? 
                  // No, because there might be other elements equal to nums[l] or nums[r].
                  // Actually, if sorted, and nums[l] + nums[r] == target, and nums[l] != nums[r]:
                  // Then any k such that l < k < r must satisfy nums[k] != nums[l] and nums[k] != nums[r]? 
                  // Not necessarily. But since it's sorted, if nums[l] + nums[r] == target, then for any k with l < k < r:
                  // nums[l] <= nums[k] <= nums[r].
                  // If nums[k] + nums[j] == target for some j != k, we would have found it earlier or later.
                  // The standard 2-sum logic assumes unique elements. With duplicates, we need to be careful.
                  
                  // Correct approach for duplicates with sorted array:
                  // If nums[l] + nums[r] == target:
                  //   Count how many times nums[l] appears (say countL).
                  //   Count how many times nums[r] appears (say countR).
                  //   Pairs formed by one nums[l] and one nums[r]: countL * countR.
                  //   If nums[l] == nums[r], then it's the nC2 case above.
                  //   Else
