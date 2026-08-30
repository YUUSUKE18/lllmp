const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER;
  let first = true;
  
  for (const part of s.split(",")) {
    if (part.trim() === "") continue;
    
    try {
      const n = parseInt(part, 10);
      // 整数として解釈できない場合はスキップ（NaN を返す場合など）
      if (!Number.isFinite(n) || isNaN(parseInt(part))) continue;

      if (first || n > max) {
        count++;
        max = n;
        first = false;
      } else {
        // すでに最初の有効値が存在する場合もカウントする必要があるか？
        // 仕様は「それらの『要素数』と『最大値』」なので、無効なものをスキップし、
        // 有効なものすべてをカウントしてその中で最大値を求める。
        count++; 
      }
    } catch {
      continue;
    }
    
    if (first || n > max) {
       max = n;
    } else {
       // もし最初の要素がセットされるまで、count を増やす処理は上で ors している。
       count++; 
    }
  }

  // より安全かつ簡潔なロジックで再実装:
  let c_count = 0;
  let current_max = Number.MIN_SAFE_INTEGER;
  
  for (const part of s.split(",")) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      
      // 整数として解析し、NaN の場合はスキップする
      const n: number | null = parseInt(trimmed, 10);
      if (isNaN(n)) continue;

      c_count++;
      if (c_count === 1 || n > current_max) {
          current_max = n;
      }
  }

  console.log(`count=${c_count} max=${current_max}`);
});
