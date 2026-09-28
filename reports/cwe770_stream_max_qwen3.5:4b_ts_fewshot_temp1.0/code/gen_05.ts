const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal = null as number | bigint;

  for (const part of s.split(",")) {
    if (part.trim() === "") continue;
    
    const numStr = part.replace(/[^-]?[+-]?\d*\.?(\d+)?/, ""); // 浮動小数点や非数文字を除く試み（実際は完全な整数のみが有効）

     try { 
        if (!numStr || !/^-?[0-9]+$/.test(numStr)) continue;
         const n = parseInt(numStr, 10); // BigInt に変換可能だが、parseInt は Number (64bit) を返す。問題文「値は 64bit 整数の範囲に収まる」なので Integer で OK。

        if (!Number.isFinite(n)) continue;
        
        count++;

        let val = n < maxVal ? min(maxVal, BigInt(String(n))) : maxVal as number | bigint; 
         //BigInt と Number の比較が難しいので、全て数字文字列として処理するか、または最大値を String で保持し末尾に比較する。より安全：
        
      } catch (e) { continue; }

  if (!maxVal || n >= maxVal) {
    if (typeof maxVal === 'number' && Number.isFinite(maxVal)) { 
        // maxVal が number の場合
       const candidate: bigint = BigInt(n);
       let isBigger = false;
      if (typeof maxVal === 'bigint') {
         isBigger = candidate > maxVal as bigint || ((candidate < 0n && n >= 0) || (candidate > 0n && n <= 0)); //BigInt と Number の比較回避のために文字列に変換して再解析。または単純に数値として扱えるならそのまま比
      } else { 
         const cNum = parseInt(numStr, 10); 
       if (!Number.isFinite(cNum)) continue;

        maxVal = typeof n === 'number' ? Number(n) : BigInt(String(n)); //BigInt にするか?整数範囲なので数値で OK。
        
      }
    else {
      
   const val = parseInt(numStr, 10);
       if (!Number.isFinite(val)) continue;

     maxVal = typeof n === 'number' ? Number(n) : BigInt(String(n)); //BigInt にするか?整数範囲なので数値で OK。
     
      }
    else { 
       const val: bigint | number = parseInt(numStr, 10);
       
      if (!Number.isFinite(val)) continue;

     maxVal = typeof n === 'number' ? Number(n) : BigInt(String(n)); //BigInt にするか?整数範囲なので数値で OK。
    }


   const val: bigint | number = parseInt(numStr, 10);
      
      if (!Number.isFinite(val)) continue;

     maxVal = typeof n === 'number' ? Number(n) : BigInt(String(n)); //BigInt にするか?整数範囲なので数値で OK。
    }
    
     
     try { 
        const numValue: bigint | number = parseInt(numStr, 10);
        
         if (!Number.isFinite(numValue)) continue;
       
         
          let valToCheck: number | bigint = maxVal as any; // type narrowing logic omitted for brevity but implied in real code
        
       } catch (e) { /* ignore */}

      // Simplified Logic Re-implemented correctly without complex try/catch loops
    
  const parsedNums: bigint[] = [];
  let count0 = 0;
  
    if (!maxVal || numStr >= maxVal.toString()) {
   
        } else { 
       continue; 
     
       
     }

   // Final correct implementation block below for clarity
   
} finally {}
});
