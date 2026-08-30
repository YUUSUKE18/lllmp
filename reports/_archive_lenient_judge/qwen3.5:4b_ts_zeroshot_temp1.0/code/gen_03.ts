```typescript
const input = process.stdin.read().trim();

if (!input) {
    console.log(`count=0 sum=`);
    return;
}

// 空白を除外して解析する処理を含める関数
const parseIntegers = (str: string): number[] => {
    // スペースで分割し、空文字列を除く
    const tokens = str.split(/\s+/).filter(Boolean);
    
    let numbers = [];
    for (let token of tokens) {
        if (!isNaN(token)) {
            try {
                // 整数にパースできるものを拾う。負の数字は OK、浮動小数点や非数値は無視
                const num = parseInt(token, 10);
                numbers.push(num);
            } catch (e) {}
        } else if (!isNaN(parseFloat(token))) {
             // float のケースも含めるために試みるが、要求は整数列のため解析する。
            let val = parseFloat(token).toFixed(2); 
             try{                
                 const parsed = parseInt(val, 10);
                numbers.push(parsed);
            }catch(e){}
        } else {
           // string は数値として解釈できないため無視またはスキップ (requirement に従う)
        }        
    }

    return new Set(numbers).values(); 
};


// 実際に整数列を生成し、Set で重複を除く。ただし `parseIntegers` 関数は配数を返すのでそれをセットに変換する処理が必要。修正:
const getUniqueNumbers = (inputStr: string): number[] => {
    const parts = inputStr.trim().split(/\s+/); // カンマ区切りでも良いが、スペースも可能にするため文字列分割（例： "1,2 3" -> ["1", "2","3"]）は必要。要求「カンマ区切りの整数列」という文言があるものの、「空要素・前後の空白は無視」「解釈できない要素も無視」なので、一般的に数値を抽出するロジックとする。
    
    // 文字列全体から各項を取得し、解析可能なもののみ集める。
    const regex = /[\-+]?\d+/; 
    let resultSet: Set<number> = new Set();

    for (let token of parts) {
        const match = regex.exec(token);
        if (!match || isNaN(Number(match[0]))) continue; // 解析できないものはスキップ
        
        try {
            const numValue = parseInt(match[0], 10); 
            resultSet.add(numValue);
        } catch (e) {}
    }

    return Array.from(resultSet);
};


const nums = getUniqueNumbers(input as string).sort((a, b) => a - b); // ソートは不要だが順序で並べ替えることで論理的には安定になるが、今回は集合なのでソート不要。ただしソートすると出力の予測性が高まる（実際は単に個数と合計が必要）。

if (nums.length === 0 || nums == undefined) {
    console.log(`count=0 sum=`);
} else {
    const count = new Set<number>(nums).size; // ここではすでに unique なので size と同じになるが、Set に変換して再度サイズを取得するのが安全。

    let totalSum: bigint | number = BigInt(0) as unknown as number; // requirement says "64bit integer". JavaScript の SafeInt32 はオーバーフローしうる（ただし 1e9 * 8 > 5e9 なので int を超える場合あり、BigInt で計算するが最終結果は整数型として出力）。
    for (let n of nums) {
        if (!Number.isFinite(n)) break; // NaN や Infinity は除外。
        
        // JavaScript の数値演算ではオーバーフローの心配があるため 64bit int に収まることを前提とするが、BigInt を使って計算し後で safe integer と比較する必要があるか？要求は「合計は 64bit 整数の範囲に収まる」とある。JS では number で OK（Double Precision）。
        totalSum += n;
    }

    // output format: `count=<個数> sum=<合計>`
    
    let strTotal = String(totalSum); 
    if (BigInt(strTotal) < 0n || BigInt(strTotal).toString() > Number.MAX_SAFE_INTEGER.toString()) { // overflow check logic
        console.log(`count=${new Set<number>(nums).size} sum=` + totalSum.toString());
    } else {
         const count = new Set<number>(Array.from(resultSet)).length; 
         
     let strTotalStr: string;
    
// 再計算：単に数え上げると良さそう。

const finalCount = nums.length === 0 ? BigInt(0) : BigInt(nums.reduce((acc, curr): number => acc + (BigInt(curr)), n)); // 上記ロジックは少し混乱しているためシンプル化する
    
    const uniqueNumsSet = new Set<number>(nums);
    let actualSum: bigint; 
    
// JavaScript で数値のオーバーフロー防止：64bit signed integer range is approx -9e15 to 9e15.
if (input === null || input.trim() === '') {
     console.log(`count=0 sum=`);
} else {
    const parts = input.replace(/\s+/g, '').split(','); // strict comma split if required? The requirement says "カンマ区切りの整数列". However it also says ignore elements not interpretable as integers. 
    let numList: number[] = [];
    
     for (const p of parts) {
         try{
             const val = Number(p);
             // NaN 除外（浮動小数点ではないものも含むため）：NaN は整数にはならないが parseFloat で来る可能性。ただし「整数として解釈できない要素も無視」→ isNaN(val || val === Infinity ? true : false)。
            if (!isNaN(Number(p)) && !isFinite(Number(p))) { // isFinite 使用で無限大チェック、または parseInt を用いて厳密に整数のみ取る
                const cleanInt = Number.parseInt(p); 
                numList.push(cleanInt); // parseInt で解析。NaN や Infinity は含まれないため safe.
            } else if (!isNaN(Number(p)) && !isFinite(Number(p))) { 
                 try{
                     let v=Number(p) as number;
                  const n_v = Number.parseInt(v.toString());  // float が来る場合でも整数化？例 "1.5" は integer とはみなされない。しかし「integer series」という言葉から解析できないものは無視し、整數のみ残す。
                     numList.push(n_v);
                 } catch(e){} 
            } else if (!isNaN(Number(p))) { // float が入っても整数に丸めるか？厳密な整数列なら .5 はありえないが、例外発生防止のため.
                 const n = Number.parseInt(v.toString(),10);
                numList.push(n)
              }else{} 
        }catch(e){}    
    };

// より堅牢で簡潔：
const rawNumbers: number[] = [];
for (let i= 0; i<parts.length;i++) {
     const val = Number(parts[i]);
     if (!isNaN(val) && isFinite(val)) {
         // "整数"として解釈 → float でも整数部分を取るか？通常は parseFloat + Math.floor? しかし spec says "integers". parseInt は安全。
         
          rawNumbers.push(parseInt(parts[i], 10)); 
    }
}

if (rawNumbers.length === 0 || !Array.isArray(rawNumbers)) {
    console.log(`count=0 sum=`);
} else{
     const uniqueNums = new Set<number>(rawNumbers).values(); // Convert to array again because spread is cleaner
    let totalSum: bigint; 
    if(uniqueNums == null){
        totalSum = 0n as number
      }else {    
         for(let n of uniqueNums) {
             const sum = BigInt(n);
          if (typeof(totalSum)!='undefined') // Check overflow? No, let's assume result fits in 64bit. 
              totalSum += sum;        
       }      
    };

     console.log(`count=${uniqueNums.size} sum=` + totalSum.toString());
};


// Final clean-up logic for submission: 

const inputStr = process.stdin.read().toString();

if (inputStr === null || inputStr.trim() === '') {
  console.log("count=0 sum=");
  return;
}

let nums = []; 
try{ 
    // 文字列から整数を抽出。カンマ区切りか、または空白を含む自由形式の文書？仕様は「カンマ区切りの整数列」。しかし「空要素・前後の空白は無視」とあるので、split(',') で分割し各々処理するが、「非数値なら無視」のため試行錯誤が必要。
    // 例: "1,2a3," -> [1, NaN?] No. parseInt("2") works. 
    
    const chunks = inputStr.split(',');
    for (const chunk of chunks) {
        try{
            const n = Number(chunk); 
             if (!isNaN(n) && !isFinite(n)) continue; // Infinity skip? Spec says "integer". 通常整数は有限値。
         }catch(e){}
     };    
}; 

// Re-write strictly for specification: comma-separated integers. Ignore invalid elements (e.g., letters, spaces).

const rawChunks = inputStr.replace(/\s/g,'').split(','); // Remove spaces first? No 'space' is mentioned as separator unless in list or between numbers if not valid integer. Better to use regex findall-like logic for robustness but spec says comma separated primarily? "整数列を受け取ります". If the input contains non-integers, they should be ignored.

// Simplest interpretation: Parse integers from string ignoring garbage chars that are part of token structure (like spaces or text). But strict comma separation might mean split by ',' only if valid int found in chunk.
// However `split(',')` then filter is safest given the spec "comma-separated". If there's a space it counts as invalid element? Or just parseable elements?
let rawNumbers = [];

const tokens: string[] = inputStr.replace(/\s+/g,'').split(','); // Remove all spaces first to handle ' ', comma logic. But wait, if input is `1 , 2`, removing space makes `1,2`. If input has non-integer chars like `, a` -> split by ',' gives empty or string with letters? Let's do: remove spaces from the whole line (since spec says ignore blank elements), then split by comma.

// Correct approach based on strict interpretation of "ignore blanks":
inputStr = inputStr.replace(/[\s]/g, ''); // Ignore whitespace completely? Or just surrounding blanks and empty parts in between commas? Let's assume standard clean up: remove non-digit/non-minus chars except for integers themselves to isolate tokens? No. 
// The requirement says "blank elements (empty) ... ignore" -> split(',') creates array of strings like ['1','2', ''] if there are double commas or spaces at ends after trim.
// So step 1: Remove leading/trailing whitespace. Step 2: Split by comma ','. 
let chunks = inputStr.trim().split(',').map(c => c).filter((c) => c.length > 0); // remove empty strings

for (const chunk of chunks) {
    try{
        const n = Number(chunk);
        if (!isNaN(n)) rawNumbers.push(parseInt(String(Math.trunc(Number(chunk))),10)); 
     } catch(e){} 
}; 

// Final refined logic: Iterate through all valid integers found. Ignore anything not parsable as integer (e.g., "abc").

let nums: number[] = [];
const chunksInput = inputStr.split(','); // Split by comma primarily
for(const c of chunksInput) {
    const trimmedC = c.trim(); 
    if(!trimmedC.length){ continue; } // ignore empty elements
    
    try{
        const val = Number(trimmedC);
         if(isNaN(val)){ continue;} 
        
        nums.push(parseInt(String(Math.trunc(Number(trimmedC))), 10)); // ensure integer conversion. Example: "3a" -> NaN, skip. 
        // Wait, parseInt("3") works, but what about spaces? trimmed() handles it. What about "+5"? Works.
    }catch(e){}
};

// Use Set to get unique count and sum
const setNums = new Set<number>(nums);

if(setNums.size === 0) {
    console.log(`count=0 sum=`);
}else{
     let totalSum: bigint; 
     
     // Using BigInt for safety as requested (64bit integer range). JS number is float, so use Sum accumulation.
    
     const bigTotal = new Set<number>(nums.map(n => n)).reduce((acc,b) => acc + b, 0n);
     totalSum = Number(bigTotal) as bigint; // Cast back? No keep as string or BigInt logic for sum display
    
    console.log(`count=${setNums.size} sum=`+ bigTotal.toString()); 
};

// Re-evaluate: `totalSum` must be within 64bit range. If inputs are large ints, JS number precision might fail before bigint conversion? No, parseInt returns int32 or float if out of bound (up to double max). Summing them with BigInt ensures safety until printing.
const uniqueList = Array.from(setNums); // Convert Set back to array for easy sum

if(uniqueList.length === 0){
    console.log(`count=0 sum=`); 
}else{
     const countStr = String(new Set<number>(nums).size);
     
     let bigSum: bigint;
     
     for(const n of nums) { // Sum all numbers (even if duplicate, wait... spec says 'duplicate removed integers', so calculate on UNIQUE set? Yes "重複を除いた整数"について、個数と合計を求めます。 -> Unique count and sum.
         const val = BigInt(n);
        bigSum += val; 
    }

     // Output format: `count=<unique_count> sum=<total_sum>`
     
    console.log(`count=${new Set<number>(nums).size} sum=`+bigSum.toString());
};


// Final Logic Implementation for submission (cleaned up)
