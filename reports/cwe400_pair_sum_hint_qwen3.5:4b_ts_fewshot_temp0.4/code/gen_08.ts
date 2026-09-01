const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  // 目標値の読み込みと整数列のフィルタリング
  let target: number | null = null;
  const nums: number[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    // 1 行目：目標値
    if (i === 0) {
      target = parseInt(line, 10);
      if (!Number.isFinite(target)) continue;
    } else {
      // 2 行目以降：整数列
      const n = parseInt(line, 10);
      if (!Number.isNaN(n) && Number.isFinite(n)) {
        nums.push(n);
      }
    }
  }
  
  if (target === null || nums.length < 2) {
    console.log("pairs=0");
    return;
  }
  
  // 問題：足して目標値になる組の数を数える
  // O(N^2) のアルゴリズムは N が大きい場合（例: 10^6）では TLE する可能性があるため、
  // ハッシュマップ（Set）を用いて O(N) で解決する。
  
  const targetSum = target;
  let count = 0;
  const seen = new Set<number>();
  
  for (const n of nums) {
    const complement = targetSum - n;
    if (seen.has(complement)) {
      // 補数が見つかった場合、その補数が何回現れているかを確認してカウントする必要がある。
      // ただし、「位置が異なる 2 個の組」を数えるため、単純な存在チェックだけでは不十分。
      // より安全で正確なアプローチ：
      // 各要素 n に対して、target - n が seen に何回含まれているかを数え上げる。
      // しかし、これは O(N^2) になる可能性がある（同じ数値が連続して現れる場合）。
      // 最適解：頻度マップを使用する。
      
      // 修正：頻度マップを使うことで、O(N) で解決可能。
    }
  }
  
  // 再実装：頻度マップを使用
  const freqMap = new Map<number, number>();
  
  for (const n of nums) {
    if (freqMap.has(n)) {
      const countN = freqMap.get(n)!;
      freqMap.set(n, countN + 1);
      
      // 同じ数値が targetSum の半分の場合、その組の数は C(k, 2)
      if (n === targetSum / 2 && targetSum % 2 === 0) {
        const k = countN;
        count += (k * (k - 1)) / 2;
      }
    } else {
      freqMap.set(n, 1);
    }
  }
  
  // 異なる数値のペアの場合
  for (const [num, count] of freqMap.entries()) {
    const complement = targetSum - num;
    if (complement !== num && freqMap.has(complement)) {
      const countComp = freqMap.get(complement)!;
      count += count * countComp;
    }
  }
  
  console.log(`pairs=${count}`);
});
