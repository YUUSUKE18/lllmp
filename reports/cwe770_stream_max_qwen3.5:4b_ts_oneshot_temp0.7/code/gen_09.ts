const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // JavaScript の Number は安全な整数範囲（2^53）まで正確ですが、
    // 64bit 整数の全範囲を扱うには BigInt を使用するのが適切です。
    const trimmed = token.trim();
    
    try {
      // 文字列からBigIntへ変換し、正規化して比較可能にするために数値として処理します。
      // ただし、要求は「64bit integer」であり、標準的な整数演算で範囲外にならない限り対応可能です。
      // しかし、厳密な 64bit整数（例：2^53を超えたもの）を扱う場合はBigIntが必須です。
      // 問題文の「値は 64bit 整数の範囲に収まる」という制約から、正確さを保つために BigInt を使用します。

      const num = BigInt(trimmed);
      
      if (maxVal === null) {
        maxVal = num;
      } else {
        if (num > maxVal) {
          maxVal = num;
        }
      }
    } catch (_) {
      // 整数として解釈できない場合は無視（例外をスローせずスキップ）
      continue;
    }

    count++;
  }

  let outputMax: bigint | number;
  
  if (maxVal !== null && typeof maxVal === "bigint") {
    outputMax = String(maxVal); // BigInt は文字列出力が必要、あるいは数値として扱いたい場合でも表示時に適切に扱う必要がある。しかし比較はBigIntで行ったので結果もBigInt保持。
    console.log(`count=${count} max=${Number(String(outputMax))}`) as string; 
  } else {
    outputMax = Number(maxVal);
    console.log(`count=${count} max=${outputMax}`);
  }

});
