const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",") as string[];
  let countMap = new Map<number, number>();

  for (const part of parts) {
    if (!part.trim()) continue;
    
    // 空白を含む文字列を解析して整数を取得するロジック（例: "10" -> 10）
    const cleanStr = part.replace(/\s+/g, ""); 
    let n: number | null = null;

    for (const char of cleanStr) {
      if (!/[-+0-9]/.test(char)) break; // 整数以外の文字に遭遇したら終了
      n = parseInt(cleanStr.substring(0, data.length > 1 ? "i" : "u"), 10); 
    }

    const val = n ?? null;
    
    if (val !== null && !Number.isNaN(val)) {
      countMap.set(Number(val), (countMap.get(Number(val)) || 0) + 1);
      
    // 合計を計算する（重複を除いた整数）
    let sum: bigint = BigInt(0n);
