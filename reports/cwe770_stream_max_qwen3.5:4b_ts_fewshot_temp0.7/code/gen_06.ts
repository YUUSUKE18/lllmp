const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxValue = Number.MIN_SAFE_INTEGER; 
  // 初期値は最小の64bit整数に近いものにするか、あるいは最初の有効要素で更新する。
  // しかし、入力がない場合はどうするか？仕様では「受け取る」とあるので、少なくとも1個あると想定し、
  // または count=0 の場合も output を生成すべきだが max は定義できない。
  // 今回の例題のロジックを踏襲して、最初の有効要素で初期化する（first フラグ不使用）。
  
  let first = true;

  for (const str of s.split(",")) {
    if (!str.trim()) continue;
    
    const n = parseInt(str, 10);
    if (Number.isNaN(n) || isNaN(n.toString())) continue; // 整数として解釈できない場合
    
    count++;
    if (first || n > maxValue) {
      maxValue = n;
      first = false;
    }
  }

  console.log(`count=${count} max=${maxValue}`);
});
