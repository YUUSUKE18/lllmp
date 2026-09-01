const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | null = null;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const val = parseInt(line, 10);
    if (!Number.isNaN(val)) {
      target = val;
      break;
    }
  }

  if (target === null) {
    console.log("pairs=0");
    return;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const val = parseInt(line, 10);
    if (!Number.isNaN(val)) {
      nums.push(val);
    }
  }

  let count = 0n;
  const n = nums.length;
  
  // 2 点探索またはハッシュマップを使用。
  // 入力サイズが非常に大きい場合（例：10^7 以上）は、O(N) のアルゴリズムが必要。
  // ここでは値の範囲が不明だが、64bit 整数なので、値そのものをキーとするハッシュマップを使うのが一般的。
  // ただし、負の値を含む場合も考慮する必要がある。
  
  const seen = new Map<number, number>(); // 値 -> 出現回数のマッピング
  
  for (const num of nums) {
    const complement = target - num;
    
    if (seen.has(complement)) {
      const freq = seen.get(complement)!;
      count += BigInt(freq);
      // 現在の数と補完値の組み合わせが既に存在する場合、その出現回数を考慮する必要がある。
      // しかし、問題文は「位置が異なる 2 個の組」の個数。
      // つまり、同じ値が複数ある場合でも、位置が異なる限りペアとしてカウントされる。
      // 例：target=4, nums=[2, 2] -> (0,1) のみ 1 組。
      // 例：target=4, nums=[2, 2, 2] -> (0,1), (0,2), (1,2) の 3 組。
      
      // より正確に：seen.get(complement) が k 回出現していた場合、現在の num とそれらの k 個の組み合わせが k 組になる。
      // しかし、上記の計算は「現在の数」を固定した場合のみ。
      // 実際には、seen に追加する前に処理を行う必要がある。
      
      // 修正：seen.get(complement) が存在する場合、その回数を count に加算する。
      // ただし、同じ値が連続して現れる場合でも、位置は異なるので問題ない。
      // 例：target=4, nums=[2, 2]
      // i=0, num=2, complement=2. seen.get(2) is undefined. seen.set(2, 1).
      // i=1, num=2, complement=2. seen.get(2) is 1. count += 1. seen.set(2, 2).
      // 結果 count=1. 正しい。
      
      // 例：target=4, nums=[2, 2, 2]
      // i=0, num=2, complement=2. seen.get(2) is undefined. seen.set(2, 1).
      // i=1, num=2, complement=2. seen.get(2) is 1. count += 1. seen.set(2, 2).
      // i=2, num=2, complement=2. seen.get(2) is 2. count += 2. seen.set(2, 3).
      // 結果 count=3. 正しい。
      
      count += BigInt(seen.get(complement)!);
    }
    
    const currentCount = (seen.get(num) || 0n) + 1n;
    seen.set(num, currentCount);
  }

  console.log(`pairs=${count}`);
});
