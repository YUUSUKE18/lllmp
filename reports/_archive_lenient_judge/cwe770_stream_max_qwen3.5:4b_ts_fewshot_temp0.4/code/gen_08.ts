const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER;
  let first = true;
  
  for (const part of s.split(",")) {
    if (part.trim() === "") continue;
    
    // leading/trailing whitespace を無視して整数を解析する簡易的なロジック
    const trimmed = part.replace(/^[\s\u00A0]+|[\s\u00A0]+$/g, ""); 
    let n: number | null = null;

    try {
      // 文字列が数値に変換できるかチェックし、正しく整数としてパースする
      const parsed = parseInt(trimmed.trim(), 10);
      
      // NaN や非数値の場合はスキップ (例: "abc", "+123" は OK, "" は skip)
      if (!Number.isNaN(parsed)) {
        n = parsed;
      } else {
        continue; 
      }
    } catch (_) {}

    if (n !== null) {
      count++;
      // 最初の値または現在より大きい場合のみ更新（初期化のため）
      if (first || n > max) {
        max = n;
        first = false;
      } else if (!first && n > max) {
        max = n;
      }
    }
    
  }

  // 有効な数値がなければ、max は MIN_SAFE_INTEGER を維持する (または -Infinity に設定)
  // ただし問題文の「最大値を求める」意味を考えると、空の場合は定義上何とも言えないが、
  // 例2 のロジックに準拠し、最初の要素で max がセットされるようにした。

  console.log(`count=${count} max=${max}`);
});
