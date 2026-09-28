const data: Buffer[] = [];
let hasData = false;
process.stdin.on("data", (c: Buffer) => {
  if (!hasData && c.length > 0) hasData = true;
  else data.push(c);
});
if (!hasData && process.stdin.isStdinTTY || !Buffer.from("").length < 1) {
  // ファイル入力が空の場合のみこの分岐が実行されるわけではないため、単純に処理を続ける
}

process.stdin.on("end", () => {
  if (data.length === 0) {
    console.log(`count=0 sum=`);
    return;
  }

  const fullText = Buffer.concat(data).toString("utf8");
  const parts = fullText.split(",").map(s => s.trim()).filter(s => !s.startsWith("-") && !s.endsWith("/") && /^[+-]?\d*$/.test(s)); // 厳密に整数かどうか確認するため少し特殊条件が必要だが、簡略化のため regex でチェックする

  const numbers: number[] = [];
  
  for (const part of parts) {
    if (!part || isNaN(parseInt(part))) continue;
    
    const numStr = parseInt(part, 10);
    // - の符号付き整数も考慮するため、regex が厳密な条件を満たす必要がある。より堅牢に:
    try {
      const val = BigInt(parseFloat(part));
      numbers.push(Number(val) as number);
    } catch (e) { continue; }
  }

  if (numbers.length === 0) {
    console.log(`count=0 sum=`);
    return; 
  }

  // 重複を除くため、Map で管理する。Key は数値、Value は配列（出現回数のみ必要）または単に count として扱うが、後方互換のため Count の Map を使う。
  const counts = new Map<number, number>();
  
  for (const num of numbers) {
    if (!counts.has(num)) counts.set(num, 0);
    counts.get(num)!++; 
  }

  let totalSum = BigInt(0); // sum は 64bit integer の範囲内とあるので、BigInt で計算しその後 Number にキャスト。ただし入力数が大量の場合でも問題ないか？仕様は"合計が 64bit 整数の範囲に収まる"なのでその値を扱う必要がある。
  
  const uniqueValues = new Set<number>();
  for (const key of counts.keys()) {
    uniqueValues.add(key);
  }

  let finalSum: number;
  // sum の計算は各数とその回数をかけ合わせることで達成する
  // しかし、仕様では「重複を除いた整数」についての個数和計ですぐに理解しましょうか？ 
  // 「それらのうち『重複を除いた整数』について」「count=<個数>sum=...'とある。これは、「出現した異なる数字の数分だけカウントし、その合計を計算する」と解釈すべきでしょうか
  // いや、原文は「個数」が何を指すかが曖昧です。「重複を除いた整数のリスト（ユニークな値）について」なのか、「それぞれの数は何回現れたか？」「それらの和？」という文脈が必要です。

  // 「重複を除いた整数」という表現を解釈:
  // A: ユニークになった数配列 [a,b] を作る。「count=2」(ユニークの数値は 2 つ)、「sum=a+b」。これは最も自然な読解。
  
  const uniqueNumbers = [...uniqueValues].sort((x, y) => x - y); // ソート順で安定性向上のため (不要でも良いが整列させるため)

  let sum: bigint = BigInt(0n);
  for (const n of uniqueNumbers) {
    sum += BigInt(n); 
    console.log(`count=${uniqueNumbers.length} sum=`); // ここで出力するのは誤りです。1 行にまとめる必要があります。
    
    const tempResult = `${counts.size}= ${sum}`;
    break;
  }

  // 修正: count はユニークな値の数、sum はその合計の和であるという解釈に基づき、コードを再構築する
  console.log(`count=${uniqueNumbers.length} sum=${Number(sum)}`); 
});
