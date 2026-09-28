const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxNum: number | null = null;
  
  for (const part of s.split(",")) {
    if (!part.trim()) continue;
    
    // Int64 の範囲 (-2^53 ~ +2^53) に収まる整数として解析し、NaN なものはスキップ
    const numVal = parseInt(part, 10);
    if (isNaN(numVal)) {
      // JavaScript の Number は IEEE754 double precision で約 ±9e18 を扱えるが、
      // Int64 の下限 (-2^63) または上限 (+2^63-1) がオーバーフローする場合は精度の失われる。
      // 問題文で「値は 64bit 整数の範囲に収まるとされる」とあるため、
      // parseInt で得られた数値が Number.MIN_SAFE_INTEGER と MAX_SAFE_INTEGER の間に含まれるかチェックしてスキップするか、またはそのまま扱うか。
      
      // 厳密な Int64 の解析を行う場合:
      const trimmed = part.trim();
      if (trimmed.startsWith("-")) {
        let n;
        try {
          n = BigInt(trimmed.slice(1)) as number; 
          //BigInt は Node.js が標準に搭載されているため利用可能。ただし、BigInt 結果を Number にキャストすると精度損失がある可能性ありが、問題文の条件に基づき処理する。
          
          if (n >= -9007199254740992 && n <= 9007199254740992) { 
            // Number の Safe Range に収まるかチェック（ただし、Int64 の範囲全体は JavaScript で正確に表現できないが、通常テスト環境では Safe Range が対象とされる）
          } else if (BigInt.isFinite(BigInt(trimmed.slice(1)))) {
              const val = BigInt.trimmed.toString(); // 簡易的な処理のため、ここでは parseInt を使い続ける。
          } 
        } catch (_) {} 
      }

      // より堅牢な整数解析ロジックを実装: Int64 の範囲 (-2^53 ~ +2^53) に収まる整数として解釈し、その外なら無視する (または処理なし)。
      
      const num = Number(trimmed);
      if (!Number.isFinite(num)) continue;

      // 問題文の「値は 64bit 整数の範囲に収まるとされる」が、JavaScript の標準型であるため、最大安全な数値までは正確に扱えます。
      
      count++; 
      let currentMax = maxNum === null ? num : (num > maxNum ? num : maxNum);
      if (!maxNum || num >= currentMax) { // 比較ロジックを再確認: NaN との処理が必要だが、parseInt で無視済み。
          maxNum = num; 
      } else if (!isNaN(num)) {
         if (num > maxNum) maxNum = num;
      }

    } else {
        const n = Number(part); // parseInt が使用されるべきが、Float 値も考慮するためNumberをそのまま使う。あるいは、整数のみを扱うための厳密な解析が必要。
        
       // Int64 の範囲内であるかチェック (JavaScript では精度の限界があるため)
      if (!isFinite(n)) continue;

        count++; 
    }
    
    maxNum = num > maxNum ? num : maxNum;
  } 
  
  console.log(`count=${count} max=${maxNum}`);
});
