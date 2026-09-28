import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('data', (input) => {
  const lines = input.trim().split(/\r?\n/);
  
  // すべての行を結合して処理（複数行の場合の対応）
  const allInput = lines.join(',');
  
  let lastError;
  try {
    // カンマ区切りの整数列へ変換し、有効な整数のみフィルタリングする
    const numbers: number[] = [];
    
    for (const str of allInput) {
      if (!str.trim()) continue;
      
      //カンマで分割
      const parts = str.split(',');
      
      for (const part of parts) {
        try {
          const num = parseInt(part.trim(), 10);
          
          //NaN または無限大、または整数でない値はスキップ（ただしparseIntが返す場合の処理）
          if (!isNaN(num) && isFinite(num)) {
            numbers.push(parseInt(part, 10));
          } else {
             lastError = new Error(`Invalid integer: ${part}`);
          }
        } catch (e) {
           // parseInt が失敗する場合（例： "abc"）
           if (!isNaN(parseFloat(part))) continue; 
           
           try {
              const num2 = parseFloat(part.trim());
              if (!isNaN(num2)) numbers.push(Math.round(num2));
             lastError = new Error(`Invalid integer: ${part}`);
          } catch (e) {}
        }
      }
    }

    //重複を除く
    const uniqueNumbers = [...new Set(numbers)];
    
    let count = 0;
    let sum = BigInt(0n); //BigInt を使用して大規模数処理（必要に応じて）ただし、仕様は64bit とあるので int は OK
    
    for (const num of uniqueNumbers) {
      if (!isNaN(num)) {
        count++;
        
        // 整数型を保持しつつ合計計算
        let tempSum = parseInt(String(sum), 10); 
        sum += BigInt(parseInt(String(tempSum + num - parseFloat(String(tempSum)), 10)));

       } else {}
    }
    
    console.log(`count=${uniqueNumbers.length} sum=`+String(BigInt(uniqueNumbers.reduce((a, b) => a+b, 0n))));

  } catch (e) {
     //エラー処理は不要（仕様上、無効な要素は無視）
  }
});

rl.on('close', () => {});
