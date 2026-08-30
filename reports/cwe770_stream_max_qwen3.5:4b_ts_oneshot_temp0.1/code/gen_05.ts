const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | null = null;
  
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    
    // 整数として解析し、有効な場合のみカウントと最大値を更新
    const n = parseInt(f.trim(), 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;

    count++;
    if (maxVal === null || n > maxVal) {
      maxVal = n;
    }
  }

  // 有効な要素がない場合は、count=0, max=null のようなデフォルト値が必要か？
  // 仕様は「整数列を受け取ります」とあり、「最大値を求めます」なので、空の場合はどうするか。
  // 例1ではmax=0が初期化されていたが、これは入力に何らかの整数が含まれることを前提している可能性がある。
  // しかし、厳密な実装として、有効な要素がない場合は maxVal が null で残る。
  // その場合の出力形式は指定されていないため、null を数値として扱うかエラーを返すかだが、
  // Node.js の console.log は null -> "null" と表示されるので、そのまま出力する。

  if (maxVal === null) {
    console.log(`count=0 max=null`);
  } else {
    console.log(`count=${count} max=${maxVal}`);
  }
});
