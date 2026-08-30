let memo: Map<number, number> = new Map();
let total_count = 0;

process.stdin.on("data", (c: Buffer) => {
  const data = c.toString().trim();
  if (data === "") return;

  const n = parseInt(data, 10);
  if (Number.isNaN(n) || n < 1) return;

  let current_n = n;
  let steps = 0;

  // 1に到達するまでの手数を計算
  while (current_n !== 1) {
    if (memo.has(current_n)) {
      // メモ化された値があれば、その結果を再利用する
      const cached_steps = memo.get(current_n)!;
      steps += cached_steps;
      break;
    }
    
    // 再帰的な計算（またはメモ化を利用した反復計算）
    if (current_n % 2 === 0) {
      current_n /= 2;
    } else {
      current_n = 3 * current_n + 1;
    }
    steps++;
  }
  
  // 結果をメモ化（到達した値から1への経路の長さではなく、元のnから1への操作回数として解釈する。
  // ただし、問題文の意図が「操作の回数」を求めることなので、ここで計算したstepsを蓄積する）
  if (current_n === 1) {
      // ここでのmemo化の目的は、同じ数に対して計算を再実行しないようにすること。
      // 実際には、問題は「操作の回数」を求めることなので、単純な経路追跡で十分である。
      // しかし、メモ化の指示があるため、ここでは操作の回数をメモする。
      memo.set(n, steps);
      total_count += steps;
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total_count}`);
});
