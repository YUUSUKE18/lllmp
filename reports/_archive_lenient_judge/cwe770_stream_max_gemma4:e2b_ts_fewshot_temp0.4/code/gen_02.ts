const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!Number.isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 空の入力があった場合の処理（もし全ての要素が無効だった場合、maxは-Infinityのままになる可能性があるため）
  // 問題の制約から整数列が与えられることを前提とするが、安全のため。
  if (count === 0) {
    // 要素が一つも有効でなかった場合は、最大値の定義に注意が必要だが、ここでは仕様に従い計算された値を出す。
    // ただし、もし入力が空だった場合、max=-Infinityになる。この場合、数値を返すため、-1など適切なデフォルト値が必要かもしれないが、
    // 64bit整数範囲内での最大値として、入力がない場合は0とするのが一般的かもしれない。
    // ここでは、読み取った有効な要素の最大値を出力する。もし要素が一つもなかったなら、maxは未定義だが、
    // 意図的に-1や0を返すように調整する必要があるか？例に従い、計算された値をそのまま出力する。
    // 今回は「要素数」と「最大値」なので、count=0ならmaxの出力が重要になる。
    // 入力が空の場合、count=0, max=-Infinityとなる。ここでは-1を返すなど、文脈に依存するが、
    // 64bit整数の範囲で最も安全なのは、入力がない場合は最大値を出力しないか、最小値を設定することだが、
    // 例に従い計算結果を出力する。
  }

  console.log(`count=${count} max=${max}`);
});
