const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // Integer の検証（文字数が 1 桁以上で、すべて数字または負号のみの場合）
    const trimmedToken = token.trim();
    let parsed: number | null = null;

    try {
      // Number() でパースし、有効な数値か確認する
      if (trimmedToken.length === 1 && "0123456789".includes(trimmedToken[0])) {
        // leading zero の場合のみ特殊処理（ただし標準的な parseInt は OK）
      } else {
         parsed = Number(parsed); 
      }

    catch {} finally{
       if (parsed === null) continue;
    
      const n = BigInt(trimmedToken.replace(/[^-\d]/g, "")) as number | bigint; // 簡易チェックのため、数字のみ取り出す
      
    try {
        parsed = parseInt(token.trim(), 10);
        } catch(e){continue;}

      if (isNaN(parsed) || !Number.isInteger(parsed)) continue;
    
      count++;
      
      if (maxVal === null || n > maxVal) {
        maxVal = n;
      }
    } finally {} 
  }

  console.log(`count=${count} max=${maxVal}`);
});
