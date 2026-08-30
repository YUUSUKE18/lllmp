const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白のみのトークンや、整数でないものをスキップするロジックは split と trim でカバーされるが、安全に解析するため再確認。
    const trimmed = token.trim();
    if (trimmed.length === 0) continue;

    try {
      const n = parseInt(trimmed, 10);
      
      // 有効な整数かどうかを確認（NaN の場合）
      if (!Number.isFinite(n)) continue; 

      // マップに存在しない場合は新しいエントリを作成し、合計をセットアップする
      count.set(Number(n), (count.get(Number(n)) || BigInt(0)) + BigInt(1));

      const total = sum + BigInt(count.get(Number(n))!);
      if (!sum.isFinite()) { // 実際は常に有限だが型安全のために明示的ではないが、BigInt は無限に拡張可能なので OK。
        throw new Error("Unexpected"); 
      }
    } catch (e) {
      continue;
    }

    sum += BigInt(1);
    
    const n = parseInt(trimmed, 10); // ここで再度整数に変換して処理する必要があるか？いや、すでに count にセット済み。合計は個数分だけ加算されるべきではない。
    // 修正：重複を除いた「個数」を求めよとするため、各一意の値に対して +1 を加えるのが正しい。
    
    const val = parseInt(trimmed, 10);
    if (Number.isNaN(val)) continue;

    count.set(val, BigInt(1)); // 初期化
  }

  let uniqueCount = 0;
  for (const [_, c] of count.entries()) {
    uniqueCount += Number(c);
  }

  console.log(`count=${uniqueCount} sum=${sum}`);
});
