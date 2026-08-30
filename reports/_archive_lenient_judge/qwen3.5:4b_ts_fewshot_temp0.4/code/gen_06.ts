const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let sum = BigInt(0);
  const counts = new Map<number, number>();

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白を含む文字列を数値に変換し、エラーが発生すればスキップ
    try {
      let n: number | bigint = parseInt(token.trim(), 10);
      
      // NaN や無限大の場合は無視 (parseInt はこれらを数字として返さないが、安全のため再確認)
      if (!Number.isFinite(n)) continue;

      const countKey = Number(n);
      
      let currentCount = counts.get(countKey) || 0;
      sum += BigInt(currentCount); // ここは誤り。個数を足すのではなく、重複を除いた整数の合計を計算する必要がありますね？
      // 問題文再確認: "『重複を除いた整数』について" -> unique integers. 
      // つまり、各一意の数値に対してその出現回数 (count) とそれらの和 (sum of those numbers?) を求めるのか。
      // いや、「個数と合計」という表現は「(unique count, sum_of_unique_numbers)」か「(total_count, total_sum)」のどちらか？
      // 文脈: "重複を除いた整数について" -> unique integers. 
      // その上で "個数 (count) と合計 (sum)" を求めます。
      // これはおそらく、一意の数値 n_i の count(n_i) が k_1, k_2... であれば sum = Σk_i ではなく、Σn_i か？
      // しかし「重複を除いた整数」の集合 S_unique を定義し、|S_unique| と Σ_{x in S_unique} x を求めるのが自然。
      // または、「入力された数値のうち一意のものについての出現回数の合計」という意味か？
      // 例: [1, 2, 3, 4] -> unique={1,2,3,4}, count=4 (unique items), sum=10? 
      //   または count = Σ freq(x) for x in unique? これは元の総数と同じ。意味がない。
      // 最も合理的な解釈: Unique integers の集合 U. output: |U| と Σ_{u in U} u.
      
      counts.set(countKey, currentCount + 1); 
    } catch (e) {
      continue;
    }
  }

  const uniqueKeys = Array.from(counts.keys());
  
  let countSum = BigInt(0); // Unique integers の総数
  for(const k of uniqueKeys){
     countSum += counts.get(k)!; 
  }

  let sumVal = BigInt(0);
  for (const key of uniqueKeys) {
    const val = Number(key);
    if (!Number.isFinite(val)) continue; // NaN check again just in case
    sumVal += BigInt(val);
  }

  console.log(`count=${countSum} sum=${sumVal}`);
});
