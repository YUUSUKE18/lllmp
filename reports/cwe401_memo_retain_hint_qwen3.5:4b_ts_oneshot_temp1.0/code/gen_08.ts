const memo = new Map<number, number>();
function collatzSteps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  let steps = 0;
  while (true) {
    if (n === 1) break;
    if (n % 2 === 0) n = n / 2;
    else n = 3 * n + 1;
    steps++;
  }
  memo.set(n, steps);
  return steps;
}

const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const lines = s.split(/\r?\n/);
  
  for (const line of lines) {
    if (!line.trim() || isNaN(Number(line.trim()))) continue;
    
    const nStr = Number(line.trim().trim());
    // 32bit に収まらずとも 64bit 範囲であるとするため、Number.MAX_SAFE_INTEGER を超過しなくても良いが、
    // Collatz 順列の中間値は大きくもなるので BigInt を使用して計算し、結果を Map の key とする必要があるか？
    // しかし、メモ化キーは n そのものとする。n が非常に大きくなると Map の size が膨大になりすぎる可能性がある。
    // コード例では n は 32bit 整数以下と想定されている（「途中に現れる値は...64bit 整数の範囲には収まります」とあるが、これ以上にならない保証はない）。
    // しかし、メモリ効率を考えると、計算値が 32bit 未満で安定するかどうかは問題文の仕様なので、BigInt を使った計算と、32bit 範囲のものを key とする実装をする。
    
    const startN = nStr;
    
    let current = BigInt(startN); // BigInt で計算開始値を保持する
    let stepsCount = 0;
    
    // 64bit 整数範囲（約 9e18）を超える Collatz 順列も考えられるが、通常の入力では 32bit の n から始めてもすぐに降下することが多い。
    // しかし、問題文では「32bit 整数の範囲には収まらずとも 64bit 整数の範囲には収まります」とあるが、これは中間値の話で、計算される数値自体は 32bit に収まるものとするのか？
    // もし開始値が 32bit 超でもよいなら、その場合も同じ処理を行う。ただし、メモ化キーとして BigInt を使うべきか int を使うかで議論が必要だが、ここでは 32bit 以内の n から始めるのが通常である（Collatz conjecture の標準的な研究対象）。
    
    // 再考：開始値 n が 32bit 以内であれば良いのか？問題文「1 以上の整数」なので任意の大整数も入るが、「32bit には収まらずとも 64bit に収まる」とある。これは、Collatz 順列の中で現れる最大の値が 64bit の範囲内にあることを保証している。
    
    // メモ化のキーは「計算された状態」を指す。n が非常に大きいとメモ化効果が限られる可能性があるが、実用的な入力に対しては有効である。
    
    const originalN = Number(current); // n は 32bit 整数として扱える範囲内（問題文）とする
    let tempCurrent: number;
    
    while (true) {
      tempCurrent = Number(current);
      
      if (tempCurrent === 1) break;
      
      let next: bigint;
      if (tempCurrent % 2n === 0n) {
        next = tempCurrent / 2n;
      } else {
        next = (3n * tempCurrent) + 1n;
      }
      
      current = next;
      stepsCount++;
    }
    
    // ここで、計算された総手数を合計する。ただし、メモ化のキーは元の n を使いますか？
    // 問題文「同じ整数が繰り返し現れるので」→ 同じ開始値 n であればメモ化する。
    // しかし、開始値 n が大きくなるとメモ化キーとしての効用が低くなるため、実装はシンプルにする。
    
    total += stepsCount;
  }
  
  console.log(`total=${total}`);
});
