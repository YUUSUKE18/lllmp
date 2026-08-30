const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const numsSet = new Set<number>();
  let totalSum: number | bigint = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    try {
      // parseInt は文字列を整数に変換する。失敗する場合、例外が発生するかまたは非数値の場合があるが、ここでは直接試す。
      const n = parseInt(token, 10);
      
      // NaN のチェック（parseInt が部分一致すると数字だけを返すが、要求は「整数として解釈できない要素も無視」なので、完全な数を確保）
      if (isNaN(n)) continue;

      // 単一の数値をセットと合計に追加
      numsSet.add(parseInt(token, 10));
      
      const bigSum: bigint = totalSum as number; // TS の type guard を使って BigInt の扱いを意識するため、必要に応じて明示的な変換。ただし parseInt は int に戻ってくるため、BigInt の演算が自然には発生しないので注意。
      totalSum += n * 1n;

    } catch (e) {
      // もし例外が発生する処理などがある場合はここに記述が必要だが、ここでは試行錯誤で OK。
      if (!isNaN(parseInt(token, 10))) continue; 
    }
    
    const num = parseInt(token.trim(), 10);
    numsSet.add(num);

    const sumBigInt: bigint | undefined = totalSum as BigInt; // ここでの型推論と演算を明示的に制御する必要があるが、TypeScript の型システムを利用しつつも正確に処理するため。ここでは直接の計算を行う。
    
    let currentTotal = 0n; 
    for (const v of numsSet) {
      const bigVal: number | null = parseInt(v.toString(), 10); // セット内から数値を取得し、BigInt で合計する必要があるが、上記ロジックは重複を除いた数の集まりを計算している。より正確なアプローチとして Set を直接使用する方法をとる。

    }
    
    let sum: bigint | undefined = totalSum as number; 
  };
  
};
