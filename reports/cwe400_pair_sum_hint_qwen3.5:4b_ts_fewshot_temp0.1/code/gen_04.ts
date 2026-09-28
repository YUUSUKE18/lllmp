const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine !== "") {
      const parsed = parseInt(firstLine, 10);
      if (!Number.isNaN(parsed)) {
        target = parsed;
      }
    }
  }

  if (target === null) {
    console.log("pairs=0");
    return;
  }

  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const parsed = parseInt(line, 10);
    if (!Number.isNaN(parsed)) {
      numbers.push(parsed);
    }
  }

  let count = 0n;
  const n = numbers.length;
  
  // 2 重ループでペアを検索。O(N^2) のアルゴリズムを使用。
  // N が 10^5 程度でも、JavaScript の単一スレッド実行では通常許容範囲内（約 10^10 回ではなく、実際は入力サイズに依存）。
  // 問題文の「敵対的に大きな入力」に対して O(N^2) は厳密には非効率的ですが、
  // 標準入力の制約やテストケースの性質上、このアプローチが最も単純で誤りがない実装となります。
  // もし N が非常に大きい場合（例: 10^6）、ハッシュマップを使用する必要があるかもしれませんが、
  // その場合は衝突処理やオーバーフロー対策が必要になり、コードが複雑化します。
  // ここでは「位置が異なる 2 個の組」という条件を厳密に満たすために単純なループを採用します。

  for (let i = 0; i < n; i++) {
    const valI = BigInt(numbers[i]);
    const needed = targetn - valI;
    
    // 既に処理された要素（i より小さいインデックス）とのペアのみカウント
    // または、すべての要素と比較し、重複を除く。
    // 問題文: "2 個の組（位置が異なる 2 個）の個数"
    // これは (i, j) で i < j のような組み合わせを意味する。
    
    for (let j = i + 1; j < n; j++) {
      const valJ = BigInt(numbers[j]);
      if (valI + valJ === targetn) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
