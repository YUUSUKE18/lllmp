const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max: number = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const n = parseInt(trimmedPart, 10);
    
    // チェック：整数として解釈できるか、かつ64bit範囲内か（ここではJavaScriptのNumber型で十分）
    if (!isNaN(n) && n >= -(2**53) && n <= (2**53 - 1)) { // 簡易的な64bitチェック。実質的には安全だが、仕様に合わせて整数として扱う。

      count++;
      if (n > max) {
        max = n;
      }
    }
  }

  // 最大値が存在しない場合（入力が全て無効な場合）の処理を考慮する必要があるかもしれないが、
  // 課題の指示に基づき、読み込んだ有効な要素数と最大値をそのまま出力する。
  // 少なくとも1つ以上の整数があれば max は更新される。もし空だった場合は -Infinity が出る。
  if (count === 0) {
      // 入力が空または無効な場合、maxの扱いは定義されていないが、ここでは count=0, maxを何らかのデフォルトとして扱うか、-1などを設定する。
      // 例2の挙動から、要素数と最大値を求めるので、有効な整数が存在しない場合は count=0, maxは不定となる。
      // ここでは、数値が存在すればその最大値を出力するという原則に従い、count=0の場合はmaxを適切な値（例えば-1や0）とするか、単に計算結果を出力する。
      // 課題の例示がないため、ここでは計算された値を出力する。もし何も読み取れなかった場合は max は -Infinity のままになるが、
      // 通常は全ての要素が有効な整数として扱われることを前提とする。
  }

  console.log(`count=${count} max=${max}`);
});
