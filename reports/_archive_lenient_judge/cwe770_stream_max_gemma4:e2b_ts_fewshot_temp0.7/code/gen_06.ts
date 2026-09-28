const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;
  let isValid = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      // 数値が64bit整数の範囲内であるかを確認（標準のJavaScript Number型はIEEE 754倍精度だが、ここでは整数として扱う）
      // 課題の制約に従い、読み込んだ値をそのまま処理する
      count++;
      if (num > max) {
        max = num;
      }
      isValid = true;
    }
  }

  if (count > 0) {
    console.log(`count=${count} max=${max}`);
  } else {
    // 整数が存在しない場合（全て無効な値または空文字列のみの場合）、count=0, max=-Infinity となるが、
    // 厳密には「要素数と最大値を求める」という指示に従い、存在する有効な数がない場合はどうするか。
    // 例1や例2の動作から、数値が存在する場合のみカウントされるべきだが、ここでは実質的な要素数を返す。
    console.log(`count=0 max=-Infinity`);
  }
});
