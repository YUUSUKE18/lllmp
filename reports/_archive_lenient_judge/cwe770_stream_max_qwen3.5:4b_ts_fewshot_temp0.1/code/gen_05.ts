const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白を含む文字列を数値に変換し、エラーが発生するかチェックする
    const trimmedToken = token.trim();
    const parsedValue = parseInt(trimmedToken, 10);

    // NaN の場合は無視（parseInt が失敗した場合のみ）
    if (Number.isNaN(parsedValue)) continue;

    count++;
    
    // maxVal は初期値として null を設定し、最初の有効な数値で更新する。
    // または -Infinity から比較することで常に正しい最大値を保持できるが、
    // 問題文の「64bit 整数」という制約と例1との整合性から、
    // 初期化に null を使い、最初に設定するか、-9223372036854775808 (最小値) から比較する方が安全。
    if (!maxVal || parsedValue > maxVal) {
      maxVal = parsedValue;
    }
  }

  // もし有効な数値が一つも入らなかった場合、count は 0 で maxVal は undefined が保持されるはずだが、
  // 出力形式を維持するため count=0, max=? のような形にするか、または問題文の「整数列」という前提から
  // 少なくとも1つあると想定しているが、安全のために null をチェックする。
  
  if (maxVal === undefined) {
    console.log(`count=${count} max=`);
  } else {
    console.log(`count=${count} max=${maxVal}`);
  }
});
