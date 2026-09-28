const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | null = null;
  
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    
    // 整数として解析し、NaN の場合はスキップ（例："abc" や "1.5" など）
    const n = parseInt(f, 10);
    if (Number.isFinite(n)) {
      count++;
      if (maxVal == null || n > maxVal) {
        maxVal = n;
      }
    } else {
      // NaN や Infinity の場合はスキップ（仕様で「整数として解釈できない要素も無視」とあるので）
      continue; 
    }
  }

  if (count === 0 && maxVal == null) {
    console.log("count=0 max=");
  } else {
    // count が存在する場合、max のデフォルト値は undefined とみなすか？
    // 問題文「最大値を求めます」→データがない場合の挙動未定。
    // ただし例1では空の場合は処理しないが、「整数列を受け取ります」とあるので、
    // データが存在する場合のみ max を出力するのが自然だが、count=0 の場合はどうするか？
    // 通常は count>0 でないと「最大値」を定義できないため、maxVal は undefined とする。
    
    console.log(`count=${count} max=${maxVal}`); 
  }
});

// 修正：上記のロジックで count=0 の場合も出力しているが、より安全な実装にするなら以下のように再記述:
