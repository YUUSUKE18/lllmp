const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", (() => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | null = null;
  const nums: number[] = [];
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    const trimmed = line.trim();
    
    // 1 行目：目標値
    if (target === null) {
      target = parseInt(trimmed, 10);
      if (Number.isNaN(target)) target = null;
      continue;
    }
    
    // 2 行目以降：整数列
    const n = parseInt(trimmed, 10);
    if (!Number.isNaN(n)) {
      nums.push(n);
    }
  }
  
  if (target === null || nums.length < 2) {
    console.log("pairs=0");
    return;
  }
  
  // 二重連結リストまたはハッシュマップを使うことで O(N) のアルゴリズムで解決する
  // 目標値 T を満たす a + b = T => b = T - a
  // 各数 a に対して、既に出現した数の中に (T - a) が存在するか確認する
  
  const map = new Map<number, number>(); // 値 -> カウント
  let count = 0;
  
  for (const num of nums) {
    const complement = target - num;
    
    if (map.has(complement)) {
      // 補数が存在する場合、その出現回数を加算する
      // ただし、同じ数値が連続して現れる場合でも、位置が異なる 2 つの組としてカウントされる
      // 例: [1, 2, 3], target=4 -> (1,3), (2,?) -> 1個
      // 例: [2, 2], target=4 -> (2,2) が 1 組になる
      count += map.get(complement)!;
    }
    
    map.set(num, (map.get(num) || 0) + 1);
  }
  
  console.log(`pairs=${count}`);
})();
