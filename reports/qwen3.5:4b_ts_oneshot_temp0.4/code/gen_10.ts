const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const counts: Record<number, number> = {};
  let sum = 0n;

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    
    // 重複を除くために、整数として変換した値をキーとするオブジェクトを使う
    const key = String(n);
    counts[key] = (counts[key] || 0) + 1;
    sum += BigInt(n);
  }

  let output = "";
  for (const [key, count] of Object.entries(counts)) {
    if (output !== "") output += " ";
    output += `${count}=${BigInt(key)} `;
  }
  
  // 出力形式: count=<個数> sum=<合計> を各整数について出力する必要があるか？
  // 問題文: 'それらのうち『重複を除いた整数』について、個数と合計を求めます。'
  // 例として解釈: 各整数に対して "count=X sum=Y" と出力するのではなく、
  // 全体としての統計ではなく、各一意の整数に対してその count とその値の総和（= count * 値）を求めるか？
  // しかし、通常「個数と合計」という表現は、その数値そのものの出現回数和（count）とその数値の和（sum of values）を指す。
  // また、「重複を除いた整数」についてという条件があるため、一意の数値ごとに出力する必要がある。
  // 出力形式が明示されていないので、各一意の整数に対して "count=<個数> sum=<その数値の合計>" と出力するのが自然。
  // ただし、問題文の「合計は 64bit 整数の範囲に収まります」という制約から、
  // 各数値の出現回数を count、その数値を n とすると、sum = count * n となる。
  // または、すべての一意な数値の sum を求めるのか？
  // 「それらのうち『重複を除いた整数』について」という文脈から、
  // 各一意の数値に対して "count=<出現回数> sum=<その数値 * 出現回数>" と出力するのが妥当。
  // しかし、よくあるパターンとして「個数と合計」は、そのグループ全体の count とそのグループの sum を指す。
  // ここでは、一意の数値ごとに出力する形式を採用。
  // 例: input "1,2,1" -> output "count=2 sum=2 count=1 sum=3" (または順序付け)
  
  // よりシンプルに解釈：各一意の整数について、その出現回数（count）とその値の和（sum）を出力。
  // 出力形式: "count=<個数> sum=<合計>" を各一意の整数について出力する。
  // 順序は昇順または出現順。ここでは昇順とする。
  
  const uniqueValues = Object.keys(counts).map(Number).sort((a, b) => a - b);
  
  for (const val of uniqueValues) {
    if (output !== "") output += " ";
    output += `count=${counts[String(val)]} sum=${sum * BigInt(1)} `; // ここは誤り、各数値の合計は count * val
  }
  
  // 修正: 各数値の合計は count * val
  const result = [];
  for (const val of uniqueValues) {
    result.push(`count=${counts[String(val)]} sum=${BigInt(counts[String(val)]) * BigInt(val)}`);
  }
  
  console.log(result.join(" "));
});
