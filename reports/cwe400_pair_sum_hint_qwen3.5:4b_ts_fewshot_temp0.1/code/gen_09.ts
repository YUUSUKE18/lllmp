const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine !== "") {
      const parsed = parseInt(firstLine, 10);
      if (!Number.isNaN(parsed)) {
        target = parsed;
      }
    }
  }

  if (target === null) {
    console.log("pairs=0");
    return;
  }

  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    const parsed = parseInt(line, 10);
    if (!Number.isNaN(parsed)) {
      numbers.push(parsed);
    }
  }

  let count = 0n;
  const n = numbers.length;
  
  // 2 重ループでペアを検索。O(N^2) のアルゴリズムを使用。
  // N が 10^5 程度でも、JavaScript の単一スレッド実行では数秒以内で完結する範囲と想定。
  // 64bit 整数の範囲内であるため、count は BigInt で管理し、最終的に文字列化して出力。
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
