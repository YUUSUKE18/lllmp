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

    // 整数として解釈でき、64bit整数の範囲内であるかを確認（parseIntの限界と数値型の扱いを考慮）
    if (!Number.isNaN(num)) {
      // 64bit整数範囲内であるという制約は、JavaScriptのNumber型が安全に扱える範囲内であれば満たされるため、ここでは単純に最大値を更新する。
      if (num > max) {
        max = num;
      }
      count++;
    }
  }

  // countとmaxを出力
  console.log(`count=${count} max=${max}`);
});
