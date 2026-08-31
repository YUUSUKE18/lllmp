const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0n;
  
  // 1 行目の整数を読み取る（実際の値より少ない場合も考慮）
  const firstLine = s.split("\n")[0].trim();
  if (firstLine.length > 0) {
    const targetCount = parseInt(firstLine, 10);
    if (!Number.isNaN(targetCount)) count = targetCount;
  }

  // 各行を処理し、整数を読み取って合計を更新
  for (const line of s.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    
    let n: bigint = 0n;
    try {
      n = BigInt(trimmed);
    } catch {
      // 整数として解釈できない場合無視
      continue;
    }

    sum += n;
    count++; // 実際に読み取れた個数をカウント（目標数より多い場合は追加でカウント）
  }

  console.log(`count=${count} sum=${sum}`);
});
