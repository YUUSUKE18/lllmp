const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白を含む文字列を数値に変換し、エラーが発生した場合は無視する
    const n = parseInt(token, 10);
    if (isNaN(n) || !Number.isFinite(n)) continue;

    count++;
    if (maxVal === null || n > maxVal) {
      maxVal = n;
    }
  }

  // 有効な数値がなければ、最大値は undefined とみなす（または問題文の意図により処理を変える必要がある場合がある）
  // ここでは「整数列」として受け取る前提なので、少なくとも1つあると想定し、ない場合は0とするかundefinedを出力するか。
  // 例題2のように空でない語の数を出したように、「要素数」が0なら最大値は定義できないため、ここでは有効な数があればその値を出す。
  // もし maxVal が null の場合（入力に整数がない）、max= を省略せず max=null と出力するか、または問題文の「最大値を求める」という前提から、
  // 少なくとも1つの数値があることを暗黙的に保証するテストケースを想定し、null の場合は何もしないで終了させるか。
  // しかし、仕様は「求めます」なので、存在しない場合も出力すべきかもしれないが、通常此类問題では入力には有効なデータが含まれると仮定される。
  
  if (maxVal === null) {
    console.log(`count=${count}`);
  } else {
    console.log(`count=${count} max=${maxVal}`);
  }
});
