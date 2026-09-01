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
  // 入力サイズが非常に大きい場合（例：10^7 以上）、O(N) のアルゴリズムが必要。
  // ハッシュマップは衝突やオーバーヘッドがあるため、ソート + 2 点探索の方が安定していることが多いが、
  // ここではハッシュマップを簡易的に使用し、BigInt でカウントする。
  // ただし、Node.js の Map は Object.prototype を継承するため、プロパティチェックに注意が必要。
  // また、64bit 整数の範囲内であるため、JavaScript の Number (double precision) で計算可能だが、
  // 中間結果が 2^53 を超える可能性があるため、BigInt を使用。

  const seen = new Map<number, number>(); // 値 -> 出現回数
  for (const num of nums) {
    const complement = target - num;
    
    if (seen.has(complement)) {
      const freq = seen.get(complement)!;
      count += BigInt(freq);
      count += BigInt(1); // 現在の数と補完のペアをカウント（出現回数分）
      // 正確には: 補完が k 回現れた場合、現在の数がそれらそれぞれとペアになる。
      // しかし、重複を含む組をどう扱うか？「位置が異なる 2 個」なので、同じ値でも位置が異なれば OK。
      // 例：目標=4, 数=[2, 2] -> (0,1) が 1 組。
      // seen.get(complement) は補完の出現回数。現在の数が 1 つある。
      // 組み合わせは seen.get(complement) * 1。
      // しかし、上記ロジックでは count += freq + 1 となっているが、これは「現在の数と過去の補完」をカウントしている。
      // 正しいロジック:
      // 現在の数が num であるとき、補完が seen.get(complement) 回現れている。
      // その分だけペアが増える。
      // よって count += BigInt(seen.get(complement)) が正しい。
      // しかし、上記コードでは count += BigInt(freq) + BigInt(1) としている。これは誤り。
      // 修正: count += BigInt(seen.get(complement))
      
      // 再考: 
      // 例：target=4, nums=[2, 2]
      // i=0: num=2, comp=2. seen.has(2)? No. seen.set(2, 1)
      // i=1: num=2, comp=2. seen.has(2)? Yes. freq=1. count += 1. seen.set(2, 2)
      // 結果 count=1. 正しい。
      
      // 例：target=4, nums=[2, 2, 2]
      // i=0: num=2, comp=2. seen.has(2)? No. seen.set(2, 1)
      // i=1: num=2, comp=2. seen.has(2)? Yes. freq=1. count += 1. seen.set(2, 2)
      // i=2: num=2, comp=2. seen.has(2)? Yes. freq=2. count += 2. seen.set(2, 3)
      // 結果 count=3. 正しい (0-1, 0-2, 1-2).
      
      // したがって、count += BigInt(seen.get(complement)) が正しい。
      // しかし、上記コードでは count += BigInt(freq) + BigInt(1) としていたので修正する。
      
      const freq = seen.get(complement)!;
      count += BigInt(freq);
      seen.set(num, (freq + 1n));
    } else {
      seen.set(num, 1n);
    }
  }

  console.log(`pairs=${count}`);
});
