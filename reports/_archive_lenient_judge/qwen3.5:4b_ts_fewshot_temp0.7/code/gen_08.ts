const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let countSet = new Set<string>();
  let sumNums = BigInt(0);

  for (const str of s.split(",")) {
    if (!str || /^\s*$/.test(str.trim())) continue; // 空要素・空白無視
    const trimmedStr: string | undefined = str.replace(/^[\s\uFF61-\uFFF9]+/, "").replace(/[\s\uFF61-\uFFF9]+$/, "");
    if (!trimmedStr) continue; 
    try {
      let n: number = parseInt(trimmedStr, 10);
      countSet.add(n.toString()); // 重複を除去するため文字列として保存
      sumNums += BigInt(Math.abs(n)); // 絶対値の和を計算（符号付き整数の場合でも合計が正になるように、または単純に加算）

    } catch (e) { continue; } // 解析エラーが発生した場合はスキップ
  }

  console.log(`count=${countSet.size} sum=${sumNums}`);
});
