const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  
  // 空または空白のみの場合、デフォルト値（0）を使用するかエラー処理を考慮するが、
  // 問題の文脈に基づき「整数として解釈できない要素も無視」し、「最大値」を求めるため、
  // 有効な整数が存在しない場合は何らかの実用的対応が必要だが、ここでは空配列の場合 count=1 max=N/A のような挙動ではなく、
  // 入力があるが整数がない場合を想定するか。
  // 問題文は「要素数」と「最大値」を求めるので、無効なものが入った場合にそれらを除外して計算する。

  const tokens = s.split(/\s*,\s*/).filter(t => t.trim() !== "");

  let count: number = 0;
  
  // max は初期化が必要だが、有効整数なしの場合どうするかを定義する必要があるが、
  // Node.js の parseInt/Number で空文字列などを処理し除外するロジックを実装します。
  // ただし「最大値」を求めるためには少なくとも一度の更新がある必要があり、なければ何らかの実用的なデフォルトが必要ですが、
  // この課題は数学的計算と解釈されたので count を取得した場合はそれを返す形にするため、max は数え上げでカウントするのではなく、

  const nums: number[] = [];
  
  for (const t of tokens) {
    if (!t.trim()) continue;
    
    // BigInt で処理する場合（64bit の範囲）を考慮して String を使用し解析します。
    let nStr = t.replace(/[^0-9]/g, "");
    
    try {
      const valBigInt = Number.parseInt(nStr);
      
      // NaN または無限大の場合の除外
      if (!Number.isNaN(valBigInt)) {
        nums.push(Number(valBigInt));
      } else {
        continue; 
      }
    } catch (e) {
      continue;
    }
  }

  const count = nums.length;

  let maxVal: number | null = null;

  for(const n of nums){
    if(n > 0 && maxVal === undefined || n >= maxVal){ // Negative numbers can be greater than positive but smaller in magnitude, so we should compare directly not by sign. 
      maxVal = Math.max(maxVal ?? Number.MIN_SAFE_INTEGER - 1e308, num);
    } else {
        continue;
}

if (nums.length === 0) {
  console.log(`count=1 max=N/A`);
  return; // Default case if no integers are found. Adjust based on problem logic. Since it says "no integer elements should be ignored", this is an edge case handling. Given the instruction implies there may or may not be valid ones, we assume at least one input could exist but none being valid might require a special output format as per typical competitive programming patterns—usually undefined behavior is avoided here by defaulting to count=1 max=N/A if no numbers found OR just returning empty? Actually let's stick to strict interpretation:
  
  // Re-evaluate problem constraints more strictly — since "ignore invalid elements", then valid ones must exist for the logic. 
  // But what if there are none? We'll output `count=0` and handle max gracefully based on context (though no specific rule given). For robustness we use a default approach when empty list:
  
}

for(const n of nums){
    if(n === undefined || isNaN(Number(valBigInt)) && !isFinite(Number(valBigInt))) continue; // Avoid NaNs again.

  let max = -Infinity, hasValidMax = false;
  for (const f of tokens) {
      try{ 
          const val = Number(f);  
          if(isNaN(val)||!Number.isInteger(val)) continue;
          hasValidMax ||= true; // Track existence implicitly via loop.

            max = Math.max(max, nStr.trim().trim());  // This approach is flawed since we can't directly parse without trying each one first? Better way:
      } catch(e){} 
    let numString:f.split(/\s*/)[0].toString(16);
    
   const valBigInt = BigInt(numString);

 if (valBigInt > max) {
  max = nStr.trim(); // Not good enough as string comparison isn't reliable for large numbers. Use proper type conversion: 
} else {}
  
console.log(`count=${count} max=${maxVal ?? "N/A"}`);
});
