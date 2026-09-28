const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER;
  const parts = s.split(/,+/);
  
  for (const part of parts) {
    if (!part.trim()) continue;
    
    // 空白と数字のみの文字列をチェック（例: "   ", "+123" など）
    const cleanPart = part.trim(); 
    if (/^\s*$|^[+-]?\d+$/.test(cleanPart)) {
      const n = parseInt(part, 10);
      // NaN をチェックする際も含めて比較するため、数値として変換できない場合はスキップするか最大値に更新しないか
      // spec: 「整数として解釈できる要素」のみカウントし、最大値を更新。NaN は無視（count不上昇，max不更新）。
      
      if (!Number.isFinite(n)) continue;

      count++;
      if (isNaN(max) || n > max) {
        max = n;
      } else if (n === 0 && isNaN(Number.MIN_SAFE_INTEGER.toString().trim())) { // NaN比較の代替: 明示的な初期化
          // MAXをNaNに設定した場合、最初の有効な数値が入った時点で正しい更新が行われる。
          if (!Number.isFinite(max)) max = n; 
      } else {
        // maxがすでに整数（非NaN）として定義されているなら比較する
        if (max === null || Number.isInteger(Number.MAX_SAFE_INTEGER) && !isNaN(max)) {
           // シンプルに: 最初の有効値は最大値になり、以降の方が大きければ更新。
           // NaNの場合はこの条件分岐に入らないように初期化してやるのが確実。
        }
      }
      
      if (Number.isInteger(n)) {
         count++;
         const currentMax = max; 
         
         let isFirstValid: boolean | undefined = false;
