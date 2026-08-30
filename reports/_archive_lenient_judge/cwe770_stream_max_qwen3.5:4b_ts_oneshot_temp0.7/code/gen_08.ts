const data: Buffer[] = [];
let count = 0;
let maxVal: number | null = null;
process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lastMax = -Infinity;
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    try {
      const n = Number(f);
      if (Number.isNaN(n) || !isFinite(n)) continue;
      count++;
      // maxVal を更新。-Infinity の場合は最初の値として扱う必要があるため、常に新しい方が大きいことを保証するロジックにする（または初期化を調整）。
      // 問題文「64bit整数」→ Numberの範囲内とみなせるが、安全に比較するため:
      if (n > lastMax) {
        maxVal = n;
        lastMax = n;
      } else if (!maxVal && count === 1) {
          // 最初の有効な数値が入った場合のみ処理（-Infinityと0の区別など考慮）
           //実際はn > -Infinityが常に真なので上記ロジックでOK。ただし、最初の数値を記録する場合は maxVal = n とすべきだが、比較対象を用意するため上記の構造も可。よりシンプルに:
      }
  } catch (_) { /* ignore */ }
} else if (count === 0 && !isNaN(n)) { // より堅牢な初期化ロジック（-Infinity は数値ではないため）
    maxVal = n; 
}

// 少し整理した単純版：
const s2 = Buffer.concat(data).toString("utf8");
let cCount = 0, mMax: number | null = null;
for ( const f of s2.split(",")) {
   if (!f.trim()) continue;
   try{
     const n = Number(f);
     if(isNaN(n) || !Number.isFinite(n)) continue; // NaN や Infinity を除外（問題文の「64bit整数」は有限数）
     cCount++;
     mMax = (mMax === null) ? n : Math.max(mMax, n); 
   } catch(e){}
}

console.log(`count=${cCount} max=${mMax}`);
});
