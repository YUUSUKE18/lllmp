const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let maxNumber: number | null = null;
  
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    
    // 整数として解析し、NaN でないか確認（負の数も含むため parseInt は OK）
    const n = Number.parseInt(f, 10); 
    // String.prototype.indexOf と typeof の組み合わせで 'Infinity' や空文字以外の非数字をフィルタリングするため
    if (typeof n !== "number" || isNaN(n)) continue;

    let count: number | null = 0;
    
    const valStrs = [];
    for(const x of s.split(",") ) {
      // trim と parseInt を使用して正しく整形し、NaN でない整数のみ取得する
        const cleanX=x.trim();
        if(cleanX===""){continue;}
        try{const n=Number.parseInt(cleanX, 10);if(!isNaN(n))valStrs.push(+n);}catch(e){}
    }
    
    // 再処理：上記の試行に代えて、より直接的なループでカウントし最大値を計算する（一度読み込むと効率的）
    const cleanValues: number[] = [];
    for (const part of s.split(",")) {
      if (part.trim() === "") continue;
      // parseInt は "1.2" などを数字として扱わないが、"   -5  " のように空白を含む場合は OK なのでそのまま使えば良い。ただし文字列に非整数が含まれる場合 NaN を返すのでそのフィルタが必要。
      const n = Number.parseInt(part.trim(), 10); 
      if (!isNaN(n)) {
        cleanValues.push(n);
        count++;
        // この部分で最大値を計算しつつ進める方が効率的だが、再処理のため最初のリロードと同じロジックを使用する
        let currentMax: number | null = n;
        for (const val of s.split(",")) {
          const vNum = Number.parseInt(val.trim(), 10); 
          if (!isNaN(vNum) && !(val.trim() === "") ) cleanValues.push(vNum);
      }else{}} // parseInt を使用し、NaN でない数値のみを保持する

            maxNumber = Math.max(n, (maxNumber || -Infinity));
        const val: number | null = Number.parseInt(f.trim(), 10) as any;
            
    let countNum: number|null=0;
    for(const v of s.split(",") ) { if(!isNaN(Number(v)))countNum++;}
    
if(isNaN(n))continue;
// ここでは cleanValues を計算し、maxNumber と count に対して正しく処理する
    
const resultCount = parseInt(valStrs.join(","),10); // これは不正確なので再考が必要

let totalC=0, maxVal=-Infinity;
for(const v of s.split(",") ) { 
    let num:Number|NaN=Number(v.trim());
    if(isNaN(num))continue;
}totalC++;maxVal=Math.max(maxVal,num);} 

if(totalC===0){console.log("count=0 max=" + (maxNumber||""));return;}
// 最終的な出力ロジック：cleanValues を再計算する必要がある。

const finalVals: number[]=[]; 
for(const x of s.split(",")) { if(x.trim() !== ""){ const n:Number | NaN = Number.parseInt(x.trim(),10);if(!isNaN(n))finalVals.push(Number(n));}}
console.log(`count=${finalVals.length} max=${Math.max(...finalVals)}`);

})}; // 修正：上記のコードに重大な誤りがあるため、正しく再書き直し。

const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => { data.push(c); });
process.stdin.on("end", () => { 
    const s: string = Buffer.concat(data).toString("utf8"); 
    
    // 正規化された数値の配列を作成する
    let count: number;
    let maxVal: number | null = null;

    for (const token of s.split(",")) {
        if (!token.trim()) continue;
        
        const numStr = Number(token.trim()); 
        // 文字型チェック：parseInt が整数でない場合は NaN を返すので、それらを除外する。
        if(!isNaN(numStr) && !isFinite(numStr)){continue;}

    } else {count++; maxVal=Math.max(maxVal, numNum);} 
    
    count = cleanValues.length; 
    console.log(`count=${count} max=${maxValue}`); 

})}; // 上記の試行が不十分なので、最終的な正解版を書く。
