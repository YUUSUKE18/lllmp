```typescript
const input = process.stdin.read().trim();
if (!input) {
    console.log(`count=0 sum=`);
} else {
    const nums: number[] = [];
    
    // 入力文字列をカンマ区切りで分割し、各要素から整数を取得する処理を行う。
    input.split(',').forEach(s => {
        if (!s) return;
        
        try {
            let val = parseInt(s.trim(), 10);
            
            // NaN でないかチェック（非数値文字列の場合に catch で除く）
            if (isNaN(val)) {
                throw new Error("invalid");
            } else {
                nums.push(val);
            }
        } catch(_) {}
    });

    const uniqueNums = [...new Set(nums)];
    
    // 重複を除いた要素の合計計算と個数取得。
    let sum: bigint | number;
    if (uniqueNums.length === 0) {
        console.log(`count=0 sum=`);
    } else if (Array.from(uniqueNums).length > Number.MAX_SAFE_INTEGER / BigInt('2')){
         // Big Int の使用による計算確保（最大値の範囲内）。
            const bsum = new bigInt();

            uniqueNums.forEach(v => {
                console.log(`count=${uniqueNums.length} sum=`);
            });
        } else {
             let count: number; 
             let total: bigint | number;
             
             // 個数計算、合計取得（重複を除いた整数）の数を求める。
             const uniqueCount = uniqueNums.length;

             if (uniqueCount === 0) {
                 console.log(`count=0 sum=`);
            } else {
                let totalSum: bigint | number = BigInt(0n);
                
                for(let i=0;i<uniqueNums.length;i++) {
                    const val = uniqueNums[i];;

                    // 64bit integer の範囲に収まるか確認（合計）
                     if(val < Number.MAX_SAFE_INTEGER && val > -Number.MAX_SAFE_INTEGER) {
                        totalSum += BigInt(Number.isInteger(totalSum))?val : Number(isNaN(Number.isSafeBigInt)?totalSum?+1:);
                    } else{throw new Error('Too large')} 
                };

                console.log(`count=${uniqueCount} sum=${String(totalSum)}\n`);
            }
    }
    
    // 上記の計算結果を出力。
else {
        const uniqueNums = [...new Set(nums)];
        
        if (uniqueNums.length === 0) {
            console.log(`count=0 sum=`);
    } else{

         let totalSum: bigint | number; 
         try{totalSum=new BigInt(Number.isNaN(totalSum)?String(Number.isFinite))?:Number.MAX_SAFE_INTEGER};} catch(e){throw new Error('Too large')}:
     
        for(let i of uniqueNums) {
            totalSum += i;}

    const output: string[] = [];;
    
    if (uniqueNums.length === 0) {
        console.log(`count=0 sum=`);
} else{
         let count: number = 0; 
         
         for(let val of uniqueNums) {
            count++;
        };

console.log(`count=${uniqueCount.toString()} sum=${totalSum}\n`);
    }
