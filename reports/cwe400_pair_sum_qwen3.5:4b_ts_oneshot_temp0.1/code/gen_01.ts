const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  const nums: number[] = [];

  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.trim().split(/\s+/);
    if (parts.length === 1 && !isNaN(Number(parts[0]))) {
      target = Number(parts[0]);
    } else if (parts.length > 1 || (parts.length === 1 && isNaN(Number(parts[0])))) {
      // 目標値行は 1 つの整数のみ、それ以外は数値列とみなす（ただし問題文より 2 行目以降が整数列）
      // しかし、仕様は「1 行目に目標値」「2 行目以降に整数」とある。
      // 入力形式が厳密でない場合でも、最初の有効な単一整数を目標値とし、残りを数値とみなすのが安全。
      // または、最初の行が目標値、その後の行が数値とする。
      // 上記ロジックで処理済み。
    }
  }

  if (target === null) {
    console.log("pairs=0");
    return;
  }

  // 2 行目以降の整数を収集（最初の行は目標値）
  let count = 0;
  const numList: number[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const parts = line.split(/\s+/);
    for (const p of parts) {
      const n = parseInt(p, 10);
      if (!isNaN(n)) {
        numList.push(n);
      }
    }
  }

  // 2 つの異なる位置の要素の和が目標値になる組の数
  for (let i = 0; i < numList.length; i++) {
    for (let j = i + 1; j < numList.length; j++) {
      if (numList[i] + numList[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
