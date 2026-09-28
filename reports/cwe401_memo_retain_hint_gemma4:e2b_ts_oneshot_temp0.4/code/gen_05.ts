let memo: Map<number, number> = new Map();
let total_steps: number = 0;

process.stdin.on("data", (data: Buffer) => {
  const input = data.toString().trim();
  if (input === "") return;

  const n = parseInt(input, 10);
  if (Number.isNaN(n) || n < 1) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    // このクエリ自体は手数を加算しない（問題文の解釈に基づき、nが1のときの手数は0）
    // ただし、ここでは「nが1のときの手数は0」という条件を適用する。
    // 実際の手数計算は、nが1になるまでの操作の回数。
    // n=1のときの手数は0。
    // 処理を続行。
  } else if (!memo.has(n)) {
    let current_n = n;
    let steps = 0;

    while (current_n !== 1) {
      if (current_n % 2 === 0) {
        current_n /= 2;
      } else {
        current_n = 3 * current_n + 1;
      }
      steps++;
    }
    
    memo.set(n, steps);
    total_steps += steps;
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total_steps}`);
});
