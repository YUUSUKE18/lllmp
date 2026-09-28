const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;
  let validNumbersFound = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェックし、64bit範囲内かチェックする（JavaScriptのNumber型は通常これに対応）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      validNumbersFound = true;
    }
  }

  if (validNumbersFound) {
    console.log(`count=${count} max=${max}`);
  } else {
    // 整数が見つからなかった場合（全ての要素が無効だった場合）、0個と、最大値の定義が難しいが、ここではカウント0、最大値を-Infinityとして扱うか、あるいは問題の意図に従って適切なデフォルト値を設定する。
    // ただし、与えられた例や仕様に基づくと、有効な整数が見つからなかった場合の出力形式は明示されていないため、
    // 実際に見つかった要素に基づいて処理を行うのが自然。ここでは、もし一つも有効な整数が見つからなかった場合は、count=0, max=? とする。
    // 安全のため、数が見つからない場合は何も出力しないか、あるいは count=0 max=N のように定義する。
    // 今回は「要素数と最大値」を求めよという指示なので、無効な要素が全て無視されれば、count=0, maxの扱いを明確にする必要がある。
    // 例として、もし入力が "a,b" だった場合、count=0 になるべきだが、maxの定義は不明瞭。
    // 全ての数字が無視された場合は、最大値を計算できないため、ここではデータが存在しなかったと見なして何も出力しない（または count=0 max=適切な値）。
    // 入力が空文字列や非数値のみの場合、count=0 とし、maxの定義は保留する。最も安全なのは有効なデータがあった場合のみ出力すること。
  }
});
