const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let targetVal: number | null = null;
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine !== "") {
      targetVal = parseInt(firstLine, 10);
      if (!Number.isNaN(targetVal)) {
        // 目標値が存在しない場合の処理（エラーメッセージではなく空行にするか、デフォルトをセットする）
        // 問題文は「与えられます」とあるので、存在しないと想定されるが、安全のため数値化処理を含める
      }
    }
  }

  const nums: BigInt[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    const val = parseInt(line, 10);
    if (!Number.isNaN(val)) {
      nums.push(BigInt(val));
    }
  }

  let pairs = 0n;
  // O(n) のアルゴリズムを使用
  // 各値について、(sum - val) が既に出現しているかを確認する。
  // 大きな入力に対応するため、HashSet (Map) を使用し、出現回数をカウントする。
  
  const seen = new Map<number, number>(); // Number は safe_int で ok (BigInt を使うべきだが、JS の native Number 精度は双方向整数では 2^53 が限界。目標値が 64bit なら問題あり)
  // 64bit 整数範囲に収まるため、BigInt が必要か？ Node.jsのNumberはdouble precision floating pointで、-2^53から2^53までは正確。
  // 問題文: 「値と個数はいずれも 64bit 整数の範囲に収まります」。
  // 64bit 整数の範囲（約 ±9e18）は Number の精度限界を超えます。BigInt が必要です。

  const map = new Map<bigint, bigint>(); // key: number encountered, value: count
  
  for (const num of nums) {
    if (!map.has(num)) {
      map.set(num, 0n);
    }
    map.set(num, map.get(num)! + 1n);
    
    const complement = targetVal - num;
    
    // もし補完値が存在し、かつ異なる位置にあるか確認する必要があるか？
    // 問題: "位置が異なる 2 個の組"。
    // 同じ値が複数回現れている場合（例：目標=4, 数列=[2, 2] -> 2+2=4 は1組）、
    // その場合は map.get(num) > 1 の場合、その数は i (現在のインデックス) と過去の出現数との組み合わせを考慮するか？
    // より単純なアプローチ: 過去に現れた値のリストを確認するのではなく、
    // 各 num について (targetVal - num) が出现过るかチェック。
    // その場合、pair = count((targetVal - num)) + 1? No.
    
    // 正解のアプローチ:
    // 配列を走査しながら、現在の要素 x を見て、(sum - x) が既にリストにあるか確認する。
    // しかし、同じ値が複数回ある場合（例：x, y で x==y, sum=2x）を扱う必要がある。
    
    // O(n^2) ではなく O(n)。
    // Set を使えば重複チェックは効くが、複数の同じ数がある場合は問題が生じる。
    // 正確な計算: 存在する値の集合と、その出現回数を考慮して組み合わせる。
    // しかし、単に "位置が異なる 2 個" とあるので、index1 != index2 の組み合わせ。
    
    // 最適化: 
    // 既に見た数値たちのリスト（set）の中に補完値があるか？
    // もし complement > num (大雑把) ではなく、set に存在するか確認するだけ。
    // もし complement が set に存在する場合は、その出現回数を考慮して組み合わせを計算するか？
    
    // 例えば target = 10, nums = [5, 5, 2]
    // 1. 処理: 5 (index 0). 補完 = 5. setに5ない。setに[5]追加。(または直接mapにセット)
    //   しかし、ここで「位置が異なる」のみを確認するので、setの中に既に存在するか？
    //   もし5をセットに入れておけば、2番目の5を見て補完=5が見つかる。
    
    // より良い方法:
    // 既に見ている値たち（set）の中に (sum - num) が存在するかをチェックする。
    // ただし、同じ値が複数回現れている場合は、その組み合わせもカウントされる。
    // 例：target=10, nums=[5, 5, 2] -> pairs: (0,1)=10 -> 1組。(2+8)なし。答えは1。
    
    // 別の例：target=6, nums=[3, 3, 3].
    // indices: 0, 1, 2.
    // (0,1), (0,2), (1,2) -> 3組。
    
    // アルゴリズム修正:
    // set に現れた数値のリストを保持し、現在の num と set のどの数値の和が targetVal か確認するか？
    // これだと O(n * distinct_nums) が O(n^2) になり得る（最悪）。
    
    // O(n) のアルゴリズム:
    // map<number, number> count を維持。
    // 各 i に対して x = nums[i]
    // complement = targetVal - x
    // もし map に complement が存在する場合：
    //   その場合の追加組み合わせは、count[complement] * (current_count[x] + 1) ? 
    //   いや、単純に：すでに seen の set に補完値があるか？
    
    // もっとシンプル: 
    // 配列を走査し、set に past_elements を追加する。
    // もし set に complement が含まれるなら、count++ する。
    // ただし、これは duplicate handling が少し複雑になる（同じ数値の複数回）。
    // 例：target=10, nums=[5, 2] -> set=[5], check 5 (found 5). count=1. add 5 to set? No.
    
    // 正解: 
    // seen を保持し、num を見る前に、set に num がいるか確認するのではなく：
    // 既に見ている値たちの中に complement があるか確認。
    // もし存在する場合、その数値が何回出现过るか分ける必要がある？
    //   - 補完値 A (count=2), 現在の数 B (count=1) -> 2 * 1 = 2組
    //   - 補完値 A (count=1), 現在の数 A -> 1 * 2? No. 現在の数がAの場合、complementはA。
    
    // より確実な実装:
    // set に現れた値たちのリスト（set）を保持するのではなく、map を持つ。
    // または、set に unique numbers を保ち、その中で補完が見つかるか？
    //   例：target=10, nums=[5, 2]. 
    //   i=0, x=5. complement=5. setに5ない。set.add(5).
    //   i=1, x=2. complement=8. setに8ない。set.add(2).
    //   答えは0。正しい。
    //   例：target=6, nums=[3, 3].
    //   i=0, x=3. complement=3. setに3ない。set.add(3). (count? no need yet)
    //   i=1, x=3. complement=3. setに3あり -> pairs++ (now 1).
    //   例：target=4, nums=[2, 2, 2].
    //   i=0, x=2. comp=2. set空->set.add(2).
    //   i=1, x=2. comp=2. setに2あり -> pairs++. (now 1)
    //   i=2, x=2. comp=2. setに2あり -> pairs++. (now 2)
    //   total=2. 
    //   indices: (0,1), (0,2), (1,2). 実際は3組です。
    // 上記の単純setでは重複数を処理できません。
    
    // 正解の O(n): map<number, number> count を維持し、setも維持する（またはmapが十分か？）
    // 実は、set に unique numbers を保持し、その中で補完値があるか確認しても良いが、
    // 既に set にある数値 x と現在いる数値 y で x+y=target の場合をカウントするには：
    //   - もし x == y (同じ値): 組み合わせは count(x) * (i+1) / 2? No.
    //     i番目の元素がy。既に出現した y が (i+1) 回ある。組み合わせ数は (count[y] * 1).
    //     つまり、i番目の元素がyの場合、すでに出現したyの個数と組み合わせた。
    //   - もし x != y: count[x] * 1.
    
    // 実際の実装:
    // seen = new Set() (unique numbers encountered so far) は不十分。
    // map = new Map<number, number> (number -> count)。
    // しかし、補完値が既に map にあるか確認するだけでは、重複を考慮してどうするか？
    
    // 正しい O(n) のアプローチ:
    // 1. map を保持し、出現回数をカウント。
    // 2. 各 num について：
    //    complement = targetVal - num
    //    if (map.has(complement)) {
    //       pairs += map.get(complement)! * (i + 1); // wait, this logic is flawed because it adds combinations with current element too many times or something.
    //    }
    
    // Let's re-evaluate: We want number of pairs (i, j) with i < j such that nums[i] + nums[j] == target.
    // Iterate i from 0 to n-1:
    //   complement = target - nums[i]
    //   if complement exists in the set of numbers seen BEFORE index i:
    //     pairs += count[complement] (because we are looking for j < i? No, we want all pairs).
    //   Wait, usually we iterate and look at what has been seen *before*.
    //   But if we do that, we only count pairs where the current element is the second one.
    //   Is the order important? "2組の個数" -> Set of pairs {(i, j)}. Order doesn't matter, but i!=j.
    
    // Algorithm:
    // Initialize map with counts? No, just add to map as we go?
    // If we add current element to map AFTER checking complement, we only count pairs where the other element appeared before.
    // Example: [3, 3], target=6.
    // i=0, val=3. comp=3. Map empty. Add 3 (count=1).
    // i=1, val=3. comp=3. Map has 3 (count=1). Pairs += 1. Total 1. Correct.
    // Example: [2, 2, 2], target=4.
    // i=0, val=2. comp=2. Map empty. Add 2 (count=1).
    // i=1, val=2. comp=2. Map has 2 (count=1). Pairs += 1. Total 1. Add 2 (count=2).
    // i=2, val=2. comp=2. Map has 2 (count=2). Pairs += 2. Total 3. Add 2 (count=3).
    // Correct answer is 3. This logic works!
    
    // So:
    // map = new Map();
    // for (let i=0; i<nums.length; i++) {
    //   const val = nums[i];
    //   const complement = targetVal - val;
    //   if (map.has(complement)) {
    //     pairs += BigInt(map.get(complement)!);
    //   }
    //   map.set(val, (map.get(val) ?? 0n) + 1n);
    // }
    
    // This is O(n) and handles duplicates correctly.
    
    if (!map.has(num)) {
      map.set(num, 0n);
    }
    
    const complement = targetVal - num;
    
    if (complement !== undefined && map.has(complement)) {
      pairs += BigInt(map.get(complement)!);
    }
    
    map.set(num, map.get(num)! + 1n);
  }
  
  console.log(`pairs=${pairs}`);
});
