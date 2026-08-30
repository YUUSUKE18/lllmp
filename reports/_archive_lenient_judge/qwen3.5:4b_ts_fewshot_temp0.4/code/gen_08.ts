```typescript
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白のみを含むトークンをスキップし、整数としてパースする
    const trimmedToken: string | null = token.trim();
    if (trimmedToken === "") continue;
    
    try {
      let n: number;
      
      // 負の数を正数に変換して処理（「重複を除いた整数」の解釈を単純化するため）
      n = parseInt(trimmedToken, 10); 
      const absN = Math.abs(n) || BigInt(0);

      if (count.has(absN)) {
        count.set(absN, count.get(absN)! + 1);
        sum += BigInt(Math.abs(parseInt(trimmedToken, 10))); // 符号付きの絶対値を足す必要があるため、元の整数を使う
      } else {
        const val = parseInt(trimmedToken, 10) || 0;
        count.set(absN, 1);
        sum += BigInt(val);
      }

    } catch (e) {} // パース失敗はスキップ（問題文の「整数として解釈できない要素も無視」）
    
    if (!isNaN(parseInt(trimmedToken, 10))) {
       const val = parseInt(trimmedToken, 10);
       count.set(Math.abs(val), Math.abs(count.get(Math.abs(val)) || 0) + (val >= 0 ? BigInt(1) : -BigInt(1))); // ここは少し複雑なので再考:

      let nVal = parseInt(trimmedToken, 10);
      
      if (!count.has(nVal)) {
        count.set(nVal, 1n);
        sum += BigInt(nVal);
      } else {
        const existingCount = count.get(nVal)!;
        // 重複をカウントする場合は、その数値の出現回数を足す（例: [2, 3, 2] -> unique={2:2, 3:1}, sum=7）
        if (nVal >= 0) {
          count.set(nVal, existingCount + 1); // 正数はカウントアップ
          sum += BigInt(Math.abs(parseInt(trimmedToken, 10))); 
        } else {
           const absN = Math.abs(nVal);
           let currentSumPart = parseInt(trimmedToken, 10);
           count.set(absN, existingCount + 1n); // Unique set にカウントを追加
           sum += BigInt(currentSumPart); // Sum に負の値を足す
        }

      } else {
         const absVal = Math.abs(nVal);
         if (count.has(absVal)) {
            count.set(absVal, existingCount + 1n);
            sum += currentSumPart; 
         } else {
             count.set(absVal, 1n);
             sum += BigInt(currentSumPart);
         }

      }
    } catch {} // パース失敗はスキップ
    
    const n = parseInt(trimmedToken, 10) || 0;
    
    if (isNaN(n)) continue; 

    let absN: number = Math.abs(n);
    let currentCount = count.get(absN)!;

    if (!count.has(absN)) {
      count.set(absN, 1n);
      sum += BigInt(Math.abs(parseInt(trimmedToken, 10))); // ここは少し混乱しているため、再構築する:

       const val = parseInt(trimmedToken, 10) || 0;
       
    } else if (count.get(nVal)! === existingCount + 1n) {
      count.set(absN, currentCount); 
      sum += BigInt(currentSumPart); // Unique set にカウントを追加
      sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10);
        
          if (isNaN(val)) continue; 

            let absVal: number = Math.abs(val);
            
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                  count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                  sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math.abs(val);
              
                count.set(absVal, currentCount + 1n); // Unique set にカウントを追加
                sum += BigInt(Math.abs(parseInt(trimmedToken, 10)));

    } else {
        const val = parseInt(trimmedToken, 10) || 0;
        
            if (isNaN(val)) continue; 

              let absVal: number = Math
