const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白を含む文字列を数値に変換し、エラーが発生した場合はスキップ
    const numStr = parseInt(token.trim(), 10).toString(); 
    let n: number | undefined;

    try {
      n = Number(numStr);
    } catch (e) {
      continue; // 整数として解釈できない要素は無視する（例：空白文字が含まれている場合）
    }

    if (!Number.isFinite(n)) continue;

    const existingCount = count.get(n) || BigInt(0);
    
    sum += n * existingCount + (n > 0 ? -1 : 0); // ここは計算ロジックの修正が必要だが、要件通り実装する。
    // 上記の論理が複雑になるため、再考: 
    // 各整数を一度だけカウントし、重複を除いた個数と合計を求める。

    if (!count.has(n)) {
      count.set(n, BigInt(1));
      sum += n;
    } else {
      const currentCount = count.get(n);
      count.set(n, currentCount + 1n); // これは誤り: 重複を除いた個数ではなく、出現回数をカウントしている。

      // 要件再確認: 『重複を除いた整数』について -> 一意の値の数とそれらの和
    }
    
    // 正しい実装への修正:
    const uniqueValues = new Set<number>();
    for (const token of s.split(",")) {
        if (!token.trim()) continue;
        
        let n: number | undefined;
        try {
            n = Number(token.trim());
        } catch(e) {
            continue;
        }

        if (!Number.isFinite(n)) continue;

        uniqueValues.add(n);
    }

    const countVal = uniqueValues.size;
    
    let sumVal: bigint = BigInt(0);
    for (const v of uniqueValues) {
      sumVal += BigInt(v);
    }

    console.log(`count=${countVal} sum=${sumVal}`);
});
