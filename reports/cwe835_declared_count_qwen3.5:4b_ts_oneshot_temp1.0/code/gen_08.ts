const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);

  const lines = s.split("\n");
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    
    const parts = line.split(/\s+/);
    if (parts.length < 1) continue;
    
    const firstPart = parts[0];
    const n: number | null = parseInt(firstPart, 10);
    if (Number.isNaN(n)) continue;
    
    count = n;
    break; 
  }

  for (const line of lines) {
    if (line.trim() === "") continue;
    
    const parts = line.split(/\s+/);
    if (parts.length < 1) continue;
    
    // 行ごとに整数を解析（問題文の「2 行目以降に整数が 1 行に 1 個ずつ」という制約は、実際には各行に含まれるすべての有効な整数を読み取るように解釈すべきですが、
    // 例文や一般的な入力フォーマットに基づく「整数列」の扱いとして、行内の空白区切り整数を順次処理するのが安全です。
    // しかし、「2 行目以降に整数が 1 行に 1 個ずつ並びます」という仕様に基づき、各行を 1 つのデータとみなし、その中にある有効な整数のみを取得します。
    
    for (const p of parts) {
      if (p.trim() === "") continue;
      const val: bigint = BigInt(p);
      // 64bit 整数の範囲内かチェック（Optional, 問題文には範囲に収まると書かれているが、防御策のため）
      // JavaScript の Number.MAX_SAFE_INTEGER を超える値も存在し得るため、BigInt で処理。
      // 問題文「値はいずれも 64bit 整数の範囲に収まります」なので変換が可能と仮定する。
      if (!Number.isFinite(Number(val))) {
         // 実用上は parseInt ではなく直接 BigInt 変換として扱うのが適切だが、ここでは解析済み。
      }
      
      sum += val;
      count++;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
