process.stdin.setEncoding("utf8");

let data = "";
let total = 0;
const memo = new Map<number, number>();

process.stdin.on("data", (c: string) => {
  data += c;
});

process.stdin.on("end", () => {
  const lines = data.trim().split(/\s+/).filter(line => line.length > 0);

  for (const line of lines) {
    const n = parseInt(line, 10);
    if (Number.isNaN(n) || n < 1) continue;

    let count = 0;
    let current = n;

    while (current !== 1) {
      if (memo.has(current)) {
        count += memo.get(current);
        break; // 途中経過はメモ済みなので終了
      }

      if (current % 2 === 0) {
        current /= 2;
      } else {
        current = 3 * current + 1;
      }
      count++;
    }

    if (current === 1) {
      // 1 に到達するまでの手数を計算し、メモに追加
      // この問題の要求は「1 に到達するまでの手数」なので、
      // 再帰的または動的計画法で到達時間を計算する方が効率的だが、
      // ここでは直接シミュレーションで手数を計算する。
      // 厳密には、この操作の「手数」はフィボナッチ数列的な問題（コネルの問題）であり、
      // 効率化のためには、一度計算した値で回るのが適切。
      // しかし、問題文は「n が 1 のときの手数は 0 です」とあり、
      // 各クエリに対する操作回数を求め、その合計を求める。
      // 1 に到達するまでの操作回数を計算する。
      
      let steps = 0;
      let temp = n;
      while (temp !== 1) {
          if (temp % 2 === 0) {
              temp /= 2;
          } else {
              temp = 3 * temp + 1;
          }
          steps++;
      }
      
      total += steps;
      
      // メモ化の適用 (DP的なアプローチ)
      // より効率的なメモ化（再帰的な定義）を導入する。
      // 既に計算した値からの到達時間を利用する。
      
      // 実際には、この操作は一般的に「1に到達するまでのステップ数」を求める問題であり、
      // 毎回シミュレーションするのは非効率。メモ化を最大限活用する。
      
      // 再帰的なメモ化を適用する（ただし、計算結果を直接メモする）
      if (!memo.has(n)) {
          memo.set(n, steps);
      }
    }
  }

  console.log(`total=${total}`);
});
