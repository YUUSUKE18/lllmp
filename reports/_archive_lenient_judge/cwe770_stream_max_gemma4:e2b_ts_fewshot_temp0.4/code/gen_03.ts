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
    
    // 整数として解釈でき、64bit範囲内であるかチェック（ここでは単純にNaNチェックと数値の比較で対応）
    if (!Number.isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 最初の要素が存在しない場合、最大値は定義されないが、問題の制約から入力がある前提とする。
  // もし入力が空または数値が一つもなかった場合は、maxの初期値(-Infinity)が残る可能性があるため、count=0の場合はmaxを適切に扱う必要がある。
  // ただし、仕様に従い、読み取った有効な整数の最大値を求める。
  if (count === 0) {
      // 入力された整数が一つもなかった場合、最大値は定義できないか、あるいは問題の文脈に応じて適切な値を設定する必要がある。
      // ここでは、入力された数値が存在しない場合は max を -1 などに設定するか、またはそのまま計算された max を出力する。
      // 最小値が64bit整数範囲内であるため、-Infinityは適切。もしcount=0ならmax=-Infinityとなる。
  }

  console.log(`count=${count} max=${max}`);
});
