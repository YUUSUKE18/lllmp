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
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 空要素や無効な整数がない場合、最大値を適切に設定する必要があるが、
  // 課題の制約から、入力があれば必ず数と最大値が出力されることを想定する。
  // 整数が一つもなかった場合の処理を考慮し、count=0, max=-Infinityとなる。
  if (count === 0) {
    // 入力が空または無効な場合、仕様に厳密に従うため、ここではcount=0, max=0などを採用する（問題文の制約が不明確なため）
    // ただし、最大値が負の無限大になるのを避けるため、入力がない場合は0とするのが一般的だが、
    // 読み取れた整数がないため、maxを初期化しないでおくか、あるいは最小値を想定する。
    // ここでは、数値が存在する場合のみcountとmaxを出力するという流れで進める。
    // もし入力が全くなかった場合は count=0, max=? となるが、ここでは -Infinity が最も正確だが、
    // 64bit整数範囲という制約を考えると、もし何も読み取れなければ max は意味を持たない。
    // 例として、最低値で初期化する。（問題文に最大値の最小値指定がないため）
  }


  console.log(`count=${count} max=${max}`);
});
