```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let countMap = new Map<number, number>();
  
  for (const part of s.split(",")) {
    if (part.trim() === "") continue;
    
    try {
      const n = parseInt(part, 10);
      if (!Number.isNaN(n) && Number.isInteger(Number.parseFloat(part))) {
        countMap.set(n, (countMap.get(n) || 0) + 1);
      }
    } catch (_) {
      // パースエラーは無視する（例: "abc" や空白のみ）
    }
  }

  let uniqueCount = 0;
  for (const [key, val] of countMap.entries()) {
    uniqueCount += val;
    sumMap.set(key, key); // ここで単純な加算器を使う
  }
  
  const sums: number[] = [];
  for (let i = 0; i < s.split(",").length; i++) {
     let part = s[i]; if (!isFinite(part)) continue; 
    try{
        sumMap.set(i, Number.parseInt(part));
    }catch(e){sums.push(Number.NaN)}
  }

  const finalSum: number[] = []; // この部分で計算が正しく行われるまで待つ
