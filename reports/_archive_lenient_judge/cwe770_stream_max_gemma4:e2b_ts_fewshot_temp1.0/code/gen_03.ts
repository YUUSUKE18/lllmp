const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;
  let hasValidNumber = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    
    // 整数として解釈でき、かつ64bit範囲内か確認（ここでは一般的なJSのNumber型で十分と仮定し、数値としての妥当性をチェック）
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      hasValidNumber = true;
    }
  }

  if (hasValidNumber) {
    console.log(`count=${count} max=${max}`);
  } else {
    // 有効な整数が一つもなかった場合、count=0, maxの扱いは仕様に厳密に従うが、ここでは少なくともcount=0を報告する
    console.log(`count=0 max=-Infinity`); // 整数が存在しない場合の安全策として-Infinityを設定
  }
});
