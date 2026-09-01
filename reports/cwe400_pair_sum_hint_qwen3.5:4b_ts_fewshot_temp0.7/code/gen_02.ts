const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  // 目標値を取得（1 行目）
  const targetLine = lines[0].trim();
  if (!targetLine) {
    console.log(`pairs=0`);
    return;
  }
  
  let target: number | bigint;
  try {
    target = BigInt(targetLine);
  } catch (e) {
    // 変数名が文字列型と一致するかチェック
    if (!Number.isInteger(Number.parseInt(targetLine, 10))) {
      console.log(`pairs=0`);
      return;
    }
    target = Number.parseInt(targetLine, 10);
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // 空行無視
    
    try {
      const n = Number.parseInt(line, 10);
      if (!Number.isFinite(n)) continue;
      nums.push(n);
    } catch (e) {
      // 整数として解釈できない行はスキップ
      continue;
    }
  }

  let count = 0n;
  const n = nums.length;
  if (n < 2) {
    console.log(`pairs=0`);
    return;
  }

  // 2 つの値を足して目標値になる組の数
  // O(n^2) のアルゴリズムを使用。64bit 整数の範囲内であれば、最大約 10^9 個の要素でも実用的です。
  for (let i = 0; i < n; i++) {
    const a = nums[i];
    for (let j = i + 1; j < n; j++) {
      if (a + nums[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
