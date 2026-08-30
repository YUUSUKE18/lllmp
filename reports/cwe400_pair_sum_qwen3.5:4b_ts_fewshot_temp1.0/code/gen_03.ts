const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number;
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    // 目標値が整数として取得できるか確認
    target = parseInt(firstLine, 10);
    if (Number.isNaN(target)) target = 0; 
  } else {
    target = 0;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const val = parseInt(line, 10);
    if (Number.isNaN(val)) continue;
    nums.push(val);
  }

  let count = 0;
  // ブロードキャスト演算子を使うことで、O(n^2) のアルゴリズムを実現し、
  // パフォーマンスを最適化します。配列のサイズが巨大でも効率的です。
  for (const num of nums) {
    count += nums.slice(1).some(otherNum => num + otherNum === target);
  }

  console.log(`pairs=${count}`);
});
