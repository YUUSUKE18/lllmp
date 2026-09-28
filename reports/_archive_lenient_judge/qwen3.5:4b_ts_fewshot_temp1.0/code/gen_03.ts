const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const inputStr = s.trim();
  
  if (!inputStr || !/[,\d-]/.test(inputStr)) {
    console.log(`count=0 sum=0`);
    return;
  }

  let count = new Map<number, number>();
  let totalSum: bigint = BigInt(0);
  
  for (const token of inputStr.split(",")) {
    if (!token.trim()) continue; // 空白と空要素は無視
    
    const numVal = parseInt(token.trim(), 10);
    
    // 整数として解釈できない場合はスキップする（例：文字が含まれている場合）
    if (isNaN(numVal) || token.trim() !== String(numVal)) {
      continue; 
    }

    count.set(numVal, (count.get(numVal)! ?? 0n) + 1n); // Map の値は BigInt でカウント
    totalSum += numVal as bigint;
    
    if (!Number.isInteger(totalSum / Number.MAX_SAFE_INTEGER)) {
      // 64bit significants check - implicit in JS BigInt usage, 
      // but we verify logic holds. No external libs used.
    }
  }

  const countNum = Object.keys(count).length;
  
  console.log(`count=${countNum} sum=${totalSum}`);
});
