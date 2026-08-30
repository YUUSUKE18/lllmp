const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  // カンマで分割し、各要素を整形して整数として取得するフィルタリングを行う配列を作成。
  // parseInt を使って空白を含めても数値に変換可能なように処理すると良いが、
  // 仕様は「空要素・前後の空白は無視」「整数として解釈できない要素も無視」なので、
  // カンマ分割後に trim が行われたものに対してparseIntで取得する。
  
  let numCount = new Map<number, number>();
  let currentSum: bigint | null = BigInt(0);

  const parts = s.split(',');
  
  for (const part of parts) {
    // 空文字列または空白のみを含む場合はスキップ
    if (!part.trim()) continue;
    
    try {
      const numStr = part.replace(/\s+/g, ''); // 前後および中の空白を除去して数値として解析可能かチェック用（ここでは trim と同じ処理が効果的）
      // より厳密に：空白が含まれていても parseInt がエラーにならないように注意する必要があるが、
      // JavaScript のparseInt はleading zero を無視し、文字列の先頭から連続した数字だけを解釈する。
      // しかし、「整数として解釈できない要素も無視」なので、trim 後に空でないことが前提でよい。
      
      const n = parseInt(part.trim(), 10);
      if (Number.isNaN(n)) continue;

      let count = numCount.get(n) || 0n;
      // 個数を累加（BigInt を用いると安全だが、int で済む場合もあるが要件に合わせると BigInt の方が間違いがない）
      const newTotalSum = currentSum ?? BigInt(0);
      
      if (currentSum !== null && typeof currentSum === 'bigint') {
        // すでに合計を持っておく。ただし、個別の数値を蓄積する必要はないので直接足し算すればよい。
        // しかし、「個数」は重複を除いた整数の総数（一意に定まる数だけ）と「その数の出現回数の总和」か？
        // 「『重複を除いた整数』について、個数和合計」という表現を再解釈：
        // 1. unique integers: {value, count} pairs exist? No -> "unique" はセット。つまり一意に定まる各値の「count」（出現回数）と「sum」は計算すべき対象ではない？
        // いや、「『重複を除いた整数』について」という文脈から、単一ずつではなく集合全体の合計であるか？
        // 例：1,2,3 -> unique are {1:1, 2:1, 3:1} ? No. 
        // 「重复を除けた整数」つまり唯一一意に定まる数値のセットに対する計算。
        // しかし、入力「1,1,2,3」において、「重複を除いた」と言われているので unique set は {1, 2, 3} と解釈すべきか？
        // または "count" がその数を何回見つけたかという意味？ 
        // いや、「個数と合計を求めます」とあり、対象が「重複を除いた整数」である場合：
        // A) unique set に含まれる各 element の count (出現回数 + 1? no, just appearance times?) and sum of all values.
        // B) 「重複を除く前」の総数と合計？No。文面は明確に「重複を除いた整数について」。
        
        let c = numCount.get(n);
        if (!c && (n in numCount)) { 
             // 既に存在する場合、個数を累加
         } else {
            // unique elements に含まれているかチェックする必要はない。単純に数値を count の Map と sum を維持し続けるしかないのか？
             // しかし、「重複を除いた整数」についてとありますので：
             // Unique Set = {1, 2, 3}. Count for each is its frequency? Or just "count" of unique items (which would be length)? 
             // Contextually: If we have duplicates like [1, 1], then 'duplicate removed' implies treating them as one entity.
             // So count = number of distinct integers present in the input. Sum = sum of those distinct integers.
         }

        if (!numCount.has(n)) { 
            numCount.set(n, new Map<bigint, bigint>(); ) // 間違った構造。シンプルにする：set が重複を除いたものなら、その count は各数値の出現回数の和（frequency）ではなく単体での「count」？
             // "個数と合計" -> Count of unique integers? Sum of those unique integers.
        }

    } catch (e) { console.error(e); continue; }} else {} 

  const s = Buffer.concat(data).toString("utf8");
  
  if (!s.trim()) {
      process.exit(0); // Empty input -> nothing to output per spec? Or maybe no newline. But example has max=0 logic on empty or single item. Here: count and sum of unique ints. If none, what then? Spec says "output 1 line". Likely "count=0 sum=0"? Or not at all if no valid integers found. Let's assume outputting count=0 sum=0 is safest for strictness unless specified otherwise (like example showing max=0).
      // Actually spec: '空要素・前後の空白は無視、整数として解釈できない要素も無視'. If input has NO integer -> Output? 
      // Example 1 on empty string might not output anything or print max=0. But let's check logic. The loop runs, nothing updates max, prints `max=${initial}` which is likely undefined (if no update). Here init with null/undefined would crash unless set to default.
  
  }

  const tokens = s.split(',').map(x => parseInt(x.trim(), 10)).filter(n => !Number.isNaN(Number.parseInt))); // filter only valid integers
  
  if (tokens.length === 0) { console.log("count=0 sum=0"); return; }
  
  // Unique integers set: 
  const uniqueValues = new Set<number>(tokens);
  let count = uniqueValues.size;
  let totalSum = BigInt(0n);
    
  for (const n of tokens) { // Using original list to avoid missing, but need sum of UNIQUE values only. 
      // Re-read: "『重複を除いた整数』について、個数と合計を求めます" -> The object is the set of unique integers found. 
      // Therefore count = number of distinct elements. Sum = sum of these distinct elements.
  }

  const sortedTokens = [...uniqueValues].sort((a,b) => a-b);
  
  for (const n of tokens.filter(t => t === Number.parseInt)) {
       // Logic fix: iterate over unique values and accumulate their value once? 
    // Actually simpler: sum the distinct numbers.
      }

  const result = [count, totalSum];

}
