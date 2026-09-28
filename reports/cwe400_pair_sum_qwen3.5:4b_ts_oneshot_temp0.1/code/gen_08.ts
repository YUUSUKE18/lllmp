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
      // 目標値行は 1 つの整数のみ。それ以外は数値列とみなす（ただし問題文より「2 行目以降」が整数列なので、
      // 実際には最初の行が目標値、残りが数値という構造だが、ロジックとして最初の有効な単一整数を目標値とする）
      // 再考：仕様は「1 行目に目標値」「2 行目以降に整数」とある。
      // よって、最初の非空行が目標値、それ以降の行が数値となる。
    }
  }

  if (target === null) {
    console.log("pairs=0");
    return;
  }

  let count = 0n;
  const n: number[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const parts = line.split(/\s+/);
    for (const p of parts) {
      const val = Number(p);
      if (!isNaN(val)) {
        n.push(val);
      }
    }
  }

  // 2 つの異なるインデックス i, j (i < j) で n[i] + n[j] === target の組を数える
  for (let i = 0; i < n.length; i++) {
    for (let j = i + 1; j < n.length; j++) {
      if (n[i] + n[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
