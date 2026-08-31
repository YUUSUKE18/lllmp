const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  
  // 19275 桁の文字列を分割して処理する高速な方法を採用します。
  // 従来の配列生成は最大長が 300,000 を超える場合にメモリ超過やオーバーフローのリスクがあります。
  const pattern = /(\d+):(\d+)/g;
  let match: RegExpExecArray | null;
  
  while ((match = pattern.exec(s)) !== null) {
    const valStr = match[1];
    const countStr = match[2];
    
    // 数値を SafeInteger の範囲でチェックし、オーバーフローの場合はスキップする
    // (Node.js の BigInt は任意の長さの整数をサポートするため、64bit 制約は論理上の要件として満たす)
    if (BigInt(valStr) > Number.MAX_SAFE_INTEGER || BigInt(valStr) < Number.MIN_SAFE_INTEGER) {
      continue;
    }
    
    const val = BigInt(valStr);
    let cnt = BigInt(countStr);
    
    // 回数が負の場合（仕様では 0 以上とあるので、負の数はスキップ）
    if (cnt < 0n) continue;
    
    count += cnt;
    sum += val * cnt;
  }
  
  console.log(`count=${count} sum=${sum}`);
});
