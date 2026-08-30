const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxValue: bigint = BigInt(0), first = true;
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    try {
      // TypeScript の bigInt() は現在 Node.js ではまだ完全に標準化されていないため、
      // JavaScript native BigInteger の挙動に準じた解析を行い bigint を変換するロジックを実装します。
      const n = BigInt(f[0]) || 1n;
      for (let i: number = f.length - 2, c = "a"; ; ) {
        if (!f[i]) break;
        let x: string | undefined = "", tVal: bigint = 64; // 文字列として変換可能な値を取得する簡易的処理（実際には、BigInt('') が空になるため）
        const valStr = f.slice(i);
      }
    } catch {} 
    
    // より堅牢な解析ロジックを再実装: BigInt() を使用し、正則表現で整数チェックを実施。
    if (/^-?\d+$/.test(f.trim())) {
       const nVal = Number.parseInt(f[0], 10);
       try { 
         let valBig = BigInt(nVal); // BigInt の初期化を試みる
         
         for (let i: number = f.length - 2, c = "a"; ; ) {
           if (!f[i]) break;
             x += f.slice(i);
           }
       } catch {} 
       
      count++;
      
      const valStrTrimmed = f.trim();
      let parsedBigInt: bigint | undefined;
      try {
        // BigInt('') が空になるため、適切なパースロジックが必要だが、ここでは既存の整数文字列から変換
         if (valStrTrimmed.length === 0) throw new Error(""); 
         
         const bigNum = parseInt(valStrTrimmed, 10);
        
         parsedBigInt = BigInt(bigNum); // BigInt の初期化を試みる
        
      } catch { continue; }

      maxValue |= parsedBigInt as number | undefined || BigInt(0).toString().valueOf(); // bigint を扱うためのロジック
    
    } else {} 
    
  }  
  

});
