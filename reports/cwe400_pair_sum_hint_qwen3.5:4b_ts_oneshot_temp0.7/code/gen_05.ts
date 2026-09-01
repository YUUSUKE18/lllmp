const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let targetVal: bigint = 0;
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (!firstLine || !/\d/.test(firstLine)) {
      console.log("pairs=0");
      return;
    }
    targetVal = BigInt(firstLine);
  } else {
    console.log("pairs=0");
    return;
  }

  const nums: bigint[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    try {
      const n = BigInt(line);
      if (isNaN(n)) continue;
      nums.push(n);
    } catch (e) {
      // 解析エラーは無視
    }
  }

  const n = nums.length;
  let count = 0n;
  
  // 2 重ループで O(N^2) の計算を行うが、N が数十万程度なら実用的な範囲内である（JavaScript BigInt の overhead を考慮しても）
  // より高速にするためにハッシュマップを使うアプローチも検討できるが、単一言語の制約とメモリ効率を考慮し、ここでは単純かつ確実な実装を選択する。
  // ただし、N が非常に大きい場合（例：10^5 以上）では O(N^2) は TLE するため、ハッシュマップベースの解法を採用する。
  
  const seen = new Map<bigint, number>(); // 値 -> インデックスのリスト (重複対応ため配列を使う必要があるが、BigInt キーは OK)
  // 注意: Map のキーに BigInt を使うと非常に重いことがあるため、値を count として管理し、再計算しないようにする。
  // しかし、問題は「足して目標値になる 2 個の組（位置が異なる 2 個）の個数」である。
  
  // O(N^2) が TLE するため、O(N log N) または O(N) の解法が必要。
  // 解法: 各要素 x に対して (target - x) が既に見つかったか確認する。
  // ただし、同じ値が複数回現れる場合、組み合わせの数を考慮する必要がある。
  
  // 再実装: 2 つのケースに分ける。
  // 1. target は偶数で、target/2 = x となる整数がある場合 (x, x) のペア
  // 2. target が奇数または target/2 != x の場合 (x, y) で x < y
  
  const sorted = [...nums].sort((a, b) => a - b);
  const targetHalf = targetVal / 2n;
  
  let countPairs = 0n;
  
  // 同じ値の出現回数をカウントする
  const freq: Record<string, bigint> = {};
  for (const x of sorted) {
    const key = String(x);
    freq[key] = (freq[key] || 0n) + 1n;
  }
  
  // 同じ値が出現する組み合わせの計算
  // もし target/2 == x の場合、回数が c なら C(c, 2) = c*(c-1)/2
  if (targetVal % 2n === 0n) {
    const keyHalf = String(targetHalf);
    if (freq[keyHalf] >= 2n) {
      const c = freq[keyHalf];
      countPairs += (c - 1n) * c / 2n;
    }
  }
  
  // 異なる値の組み合わせを計算する
  for (const x of sorted) {
    const keyX = String(x);
    if (!freq[keyX]) continue;
    
    let remainingVal = targetVal - x;
    let keyY = String(remainingVal);
    
    // x が目標値そのものである場合は無視（x + y = target, x=y の場合は上記で計算済み）
    // ただし、x != y であることを保証するために、y < x の条件を追加する必要があるが、ソート順を利用すればよい。
    // ここでは、y < x となるような y が存在するかを確認する。
    // より正確には、すべての異なる値のペア (i, j) について i + j = target とし、その組み合わせ数を計算する。
    
    // 簡易化: 各要素 x に対して、(target - x) を検索するが、同じ値の場合を除外する。
    // また、x == target/2 の場合は既に計算済みなのでスキップする。
    
    if (String(x) === keyHalf && targetVal % 2n === 0n) continue;
    
    const needed = targetVal - x;
    const keyNeeded = String(needed);
    
    if (!freq[keyNeeded]) continue;
    
    // x と y が異なる値であることと、x < y の条件を課す。
    // もし x < y なら、y の回数を c_y, x の回数を c_x とすると、c_x * c_y の組み合わせになる。
    // しかし、ソート済み配列を使用しているため、x が固定されたとき、必要な y > x となるかどうかが重要。
    
    // より安全なアプローチ: 各値 v を取り、v + u = target となる u が存在し、u < v かつ u != v の組み合わせを計算する。
    // または、単純にすべての異なる値のペアについて (count1 * count2) を足す。
    
    for (const [valStr, cnt] of Object.entries(freq)) {
      const valB = BigInt(valStr);
      const neededVal = targetVal - valB;
      if (neededVal === valB) continue; // 同じ値のペアは既に計算済み
      
      if (!freq[String(neededVal)]) continue;
      
      // x < y の条件を満たすように、小さい方から計算する。
      // すでに v がループしているため、v が小さい場合と大きい場合がある。
      // ここで単純に、v と neededVal が異なる値であれば、両方の組み合わせ (cnt * freq[neededVal]) を加算し、後で半分にする必要があるか？
      // いや、問題は「位置が異なる 2 個の組」なので、(index_i, index_j) で i != j。
      // 値が異なる場合、v に関するインデックスと neededVal に関するインデックスを組み合わせるだけ。
      // したがって、cnt * freq[neededVal] が答えになる。
      
      // しかし、このループは各値に対してもう一度全値をチェックしており O(M^2) になる（M は異なる値の数）。
      // M が大きい場合は TLE。
      
      // より効率的な方法: ソート済みの配列を使用し、二重指針でペアを見つける。
      // しかし、同じ値が複数回ある場合の組み合わせ数を計算する必要がある。
      
      // 最終解法: 異なる値を抽出し、それらが target に合うかを確認する。
      const uniqueVals = Object.keys(freq).map(Number); // BigInt を Number に変換（64bit で OK）
      const m = uniqueVals.length;
      let countDiff = 0n;
      
      for (let i = 0; i < m; i++) {
        const a = uniqueVals[i];
        const bNeeded = targetVal - a;
        
        if (!uniqueVals.includes(bNeeded)) continue;
        
        // 異なる値のペアについて計算する。
        // x と y が異なる場合、x * y の組み合わせ。
        // ただし、i > j のみカウントすることで重複を避ける。
        
        const idx = uniqueVals.indexOf(BigInt(bNeeded));
        if (idx === -1) continue;
        
        const countA = freq[String(a)];
        const countB = freq[String(bNeeded)];
        
        // 既に計算済みか？
        // もし a < bNeeded の場合、i < idx でカウント済みの場合があるが、ここでは一意にカウントする。
        // a と bNeeded が異なる値であるため、必ず i != idx。
        
        if (a < BigInt(bNeeded)) {
          countDiff += countA * countB;
        } else if (a > BigInt(bNeeded)) {
          // 既に a > bNeeded の場合、bNeeded < a なので、このペアは既に i' < idx' でカウント済み
          // したがってスキップ。
        }
      }
      
      countPairs += countDiff;
    }
    
    break; // uniqueVals のループ内で計算済みのため、一度だけ実行する必要があるが、上記の構造は O(M^2) になる可能性がある。
    // 修正: 二重指針またはハッシュマップで効率化。
  }
  
  // より高速な実装に置き換える：
  // 1. 異なる値とその出現回数を取得する。
  // 2. ソートした一意の値リストを作成する。
  // 3. 二重指針で target に合うペアを見つける。
  
  const uniqueValsSorted = [...uniqueVals].sort((a, b) => a - b);
  const m = uniqueValsSorted.length;
  
  let left = 0;
  let right = m - 1;
  
  while (left < right) {
    const valL = BigInt(uniqueValsSorted[left]);
    const valR = BigInt(uniqueValsSorted[right]);
    
    const sum = valL + valR;
    
    if (sum === targetVal) {
      // 値が異なるため、組み合わせ数 = countL * countR
      // ただし、valL != valR なので常に成り立つ。
      const cL = freq[String(valL)];
      const cR = freq[String(valR)];
      countPairs += cL * cR;
      
      left++;
      right--;
    } else if (sum < targetVal) {
      left++;
    } else {
      right--;
    }
  }
  
  console.log(`pairs=${countPairs}`);
});
