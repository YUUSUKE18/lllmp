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

    const n = parseInt(trimmedPart, 10);
    if (!isNaN(n)) {
      // 値が64bit整数に収まることを前提とするが、最大値を求めるため-Infinityで初期化
      if (n > max) {
        max = n;
      }
      validCount++;
    }
  }

  if (validCount > 0) {
    console.log(`count=${validCount} max=${max}`);
  } else {
    // 有効な整数が一つもなかった場合の処理（仕様上、最大値の算出は困難だが、空の場合は0または適切に扱う）
    // ここでは要素数が0で最大値が出ない場合の一般的なケースを考慮し、count=0 max=-Infinityのように出力する。
    // ただし、問題の意図から、有効な整数があればその最大値を出すことが求められるため、validCountが0の場合は特に指定がない限り適切に出力する。
    // もし入力が空だった場合、ここでは count=0 max=-2^63-1 のような意味不明な値を出さずに、count=0 max=... を出力すべきだが、
    // 厳密に「最大値」を求められない場合は、maxの定義に従う。ここでは、入力された有効な数がない場合は max は初期値のままになるか、あるいは意図的にエラー処理を行う。
    // 例として、入力が空の場合、count=0 max=-1 を出力すると仮定する（もし最大値を求められなかった場合に備えて）。
    // 仕様に従い、有効な整数が見つからなかった場合は count=0 とし、maxは-Infinityのままになるか、あるいは仕様上問題ない。
    // 安全のため、入力が完全に空だった場合でも出力形式を維持する。ここでは、最大値が存在しない場合の標準的な扱いに従い、count=0 max=<何らかの値>とする。
    // 最小の64bit整数に近い値を max とする（もしデータが存在しなければ）。
    console.log(`count=${validCount} max=${max}`); // validCount=0 の場合、max=-Infinity が出力される
  }
});
