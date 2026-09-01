const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let target = null;
  let count = 0;
  const n = [];

  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const val: number | string = parseInt(line.trim(), 10);
    if (isNaN(val)) continue;

    if (target === null && !isNaN(parseInt(line, 10))) {
      // 1 行目（目標値）
      target = val as number;
    } else {
      n.push(val as number);
    }
  }

  // ダブルループで組み合わせを確認。O(N^2) だが、実用的な時間とメモリ要件を満たす範囲とする。
  for (let i = 0; i < n.length; i++) {
    for (let j = i + 1; j < n.length; j++) {
      if (n[i] + n[j] === target) count++;
    }
  }

  console.log(`pairs=${count}`);
});
