const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    
    // 整数として解釈可能で、64bit整数範囲内かを確認（ここではJavaScriptのNumber型が十分カバーできると仮定し、NaNチェックと最大値更新に集中）
    if (!Number.isNaN(num)) {
      const n = Number(num); // 念のため数値として扱う

      // すべての有効な数値を集計する
      validCount++;
      if (n > max) {
        max = n;
      }
    }
  }
  
  // count は、空でないかつ整数として解釈できた要素の総数
  // max は、それらの最大値。もし有効な数値が一つもなければ、maxは初期値(-Infinity)のままになる可能性があるため、0または適切な値に調整する必要があるかもしれないが、
  // 課題の意図から「存在する整数の個数」と「その最大値」を求める。空要素・非整数は無視する。

  // 再計算：仕様では「要素数」と「最大値」を求める。
  // 空でない、整数として解釈できた要素のみを対象とする。

  let finalCount = 0;
  let finalMax = -Infinity;

  for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart === "") continue;
      
      const num = parseInt(trimmedPart, 10);
      if (!Number.isNaN(num)) {
          finalCount++;
          if (num > finalMax) {
              finalMax = num;
          }
      }
  }


  console.log(`count=${finalCount} max=${finalMax}`);
});
