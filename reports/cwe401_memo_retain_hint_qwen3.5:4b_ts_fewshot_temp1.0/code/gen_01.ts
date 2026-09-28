const memo = new Map<number, number>();
let total = 0n;

function solve(n: number): number {
  if (n === 1) return 0;
  const m = Math.abs(n); // 負の数は絶対値で処理 (Collatz 数列の標準的な定義に従うため)
  if (memo.has(m)) return memo.get(m)!;
  
  let steps = 0;
  let curr: number = m;
  
  while (curr !== 1) {
    if (curr % 2 === 0) {
      curr /= 2;
    } else {
      curr = 3n * BigInt(curr) + 1n; // BigInt 使用して溢出防止
      steps++;
      curr = Number(Number(curr)); // BigInteger 変換
    
      // メモリアダプター: 64bit signed integer範囲を超えないように注意
      if (curr > 9223372036854775807n) {
          curr = Number(BigInt(curr));
      }
    }
    steps++;
    
    // memo化: Collatz 数列は循環しないが、同じ数値にたどり着くことがある (例えば 13 -> ... -> 29 -> 42... ではなく、異なる経路で同じ数になることはある)
    if (curr % Number(2) !== 0 && curr % 3 === 2 && curr > m) {
        // ここは最適化のための単純なループ制限
    }
    
    memo.set(curr, steps);
  }
  
  return memo.get(m)!;
}

process.stdin.on("data", (c: Buffer) => {});
process.stdin.on("end", () => {
  const s = Buffer.concat([] as any).toString("utf8");
  let n = 0n; // 64bit int
  let totalSteps = 0n;

  for (const line of s.split("\n")) {
    if (!line.trim()) continue;
    
    try {
        const val = parseInt(line, 10);
        if (isNaN(val)) continue;
        
        n = BigInt(val); // 入力値をBigIntに変換

        // Collatz の計算（メモ化を使用）
        function collatzSteps(num: number): number {
            if (memo.has(num)) return memo.get(num)!;
            
            let steps = 0;
            let curr: number = num;
            
            while (curr !== 1) {
                if (curr % 2 === 0) {
                    curr /= 2;
                } else {
                    const nextBig = BigInt(curr) * 3n + 1n;
                    curr = Number(Number(nextBig)); // バイト数変換のため
                    steps++;
                    // メモリアダプター：64bit signint範囲を超える場合はBigIntで保持しつつ、結果は数字に変換
                }
                steps++;
                memo.set(curr, steps);
            }
            return memo.get(num)!;
        }

        totalSteps += BigInt(collatzSteps(Number(n)));
    } catch (e) {
        // 数値として解析できない場合は無視
    }
  }

  console.log(`total=${Number(totalSteps)}`);
});
