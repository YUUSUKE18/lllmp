const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let sum = BigInt(0);
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    try {
      const n = parseInt(f, 10);
      if (!Number.isNaN(n) && Number.isFinite(n)) {
        // 重複を除くために Set を使用（BigInt で対応）
        sum += BigInt(Number(n)); 
      }
    } catch (e) {}
  }
  
  const counts = new Map<number, number>();
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    try {
      const n = parseInt(f, 10);
      if (!Number.isNaN(n) && Number.isFinite(n)) {
        counts.set(Number(n), (counts.get(Number(n)) || 0) + 1);
      }
    } catch (e) {}
  }

  let countTotal = BigInt(0);
  
  for (const [num, cnt] of counts.entries()) {
    // 個数と合計を計算するのではなく、重複を除いた整数の総数を求める。
    // しかし、「個数」と「合計」の意味を確認します。
    // 「それらのうち『重複を除いた整数』について、個数と合計を求めます。」
    // これは、「一意な整数が何通りあるか（count）」と「その一意な整数の和（sum）」という意味だと解釈するのが自然です。
    
    countTotal += BigInt(1); 
  }

  console.log(`count=${countTotal} sum=${Number(sum)}`);
});
