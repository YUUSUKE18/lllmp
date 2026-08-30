const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let max = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 空の入力があった場合（全ての要素が無効だった場合）の処理を考慮する必要があるが、
  // 課題の指示に従い、見つけた有効な要素に基づいて出力する。
  // ただし、もし入力全体が空または無効な値のみで構成されていた場合、maxは-Infinityのままになる可能性があるため、
  // count=0, max=-1 (あるいは適切なデフォルト値)として扱うべきだが、ここでは単に最大値を求めることに注力する。
  // 整数列が与えられている前提なので、もし有効な整数が見つからなかった場合は、count=0, maxの扱いを明確にする必要がある。

  // 有効な要素が存在する場合のみ出力
  if (count > 0) {
    console.log(`count=${count} max=${max}`);
  } else {
    // 有効な整数が一つもなかった場合、count=0, maxの値をどうするか。
    // 最大値は通常、空集合に対する最大値は未定義だが、ここでは-1や0など、文脈に応じたデフォルトが必要。
    // 課題の制約から、もし入力が「空」であれば count=0, max=? となる。
    // 例として、有効な要素がない場合は max を出力しないか、あるいは最小値（例えば -1）を出力する。
    // ここでは、有効な整数が見つからなかった場合は、count=0, max=-1 (または適切な初期値)と仮定して出力する。
    // ただし、例題の形式に厳密に従うため、もしデータが空なら何も出力しないか、あるいは count=0 max=... となるべき。
    // 整数列から最大値を求めるので、有効な要素がない場合は max を定義できないため、ここではcount=0, max=-1と仮定する（-1は最小の64bit整数ではないが、実用上許容範囲）。
    // 課題の指示に従い、見つけた値のみを出力する。もし数値を一つも処理しなかった場合は、何も出力しないのが最も安全かもしれないが、例に倣って常に1行出力する。
    console.log(`count=0 max=-1`); // 有効な要素がない場合のデフォルトとして-1を使用
  }
});
